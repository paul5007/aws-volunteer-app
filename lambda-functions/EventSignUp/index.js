const { Pool } = require("pg");
const pool = new Pool();
pool.connect();

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var body = JSON.parse(event.body);
  var eventId = body["eventId"];
  var roleId = body["roleId"];
  var username = body["username"];

  pool.query(
    'INSERT INTO public."EventRoleUserLinking"("eventId", "roleId", "username") VALUES ($1, $2, $3);',
    [eventId, roleId, username],
    (err, res) => {
      if (err !== undefined) {
        var response = {
          statusCode: 400,
          isBase64Encoded: false,
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          body: "Failed to create EventRoleUserLookup: " + username
        };
        callback(null, response);
      }

      var responseOK = {
        statusCode: 200,
        isBase64Encoded: false,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: "Successfully signed up: " + username + " for role: " + roleId
      };

      // Call back from original
      callback(err, responseOK);
    }
  );
};
