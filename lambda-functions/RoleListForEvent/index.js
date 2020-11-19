const { Pool } = require("pg");
const pool = new Pool();
pool.connect();

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const eventId = event["pathParameters"]["eventId"];

  pool.query(
    'SELECT "roleName", "description", "minVolunteers", "maxVolunteers" from public."Role" r LEFT OUTER JOIN public."EventRoleUserLinking" erul ON r."roleId" = erul."roleId" where erul."eventId" = $1;',
    [eventId],
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
