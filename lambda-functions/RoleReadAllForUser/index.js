const { Pool } = require("pg");
const pool = new Pool();
pool.connect();

exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const username = event["pathParameters"]["username"];

    pool.query(
        'SELECT "roleName", "description", "minVolunteers", "maxVolunteers" from public."Role" r LEFT OUTER JOIN public."EventRoleUserLinking" erul ON r."roleId" = erul."roleId" where erul."username" = $1;',
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
