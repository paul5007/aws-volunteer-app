const { Pool } = require("pg");
const pool = new Pool();
pool.connect();

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const username = event["pathParameters"]["username"];

    pool.query(
        'SELECT  e."eventName", e."description", e."startTime", e."endTime", e."eventId", r."roleName" from public."EventRoleUserLinking" erul RIGHT OUTER JOIN public."Role" r ON r."roleId" = erul."roleId" RIGHT OUTER JOIN public."Event" e ON e."eventId" = erul."eventId" where erul."username" = $1;',
        [username],
        (err, res) => {
            var response = {
                statusCode: 200,
                isBase64Encoded: false,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify(res.rows)
            };
            callback(err, response);
        }
    );
};
