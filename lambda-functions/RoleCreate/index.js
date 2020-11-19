const { Pool } = require("pg");
const pool = new Pool();
pool.connect();

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var body = JSON.parse(event.body);
  var eventId = body["eventId"];
  var roleName = body["roleName"];
  var description = body["description"];
  var minVolunteers = body["minVolunteers"];
  var maxVolunteers = body["maxVolunteers"];
  var username = body["username"];

  pool.query(
    'INSERT INTO public."Role" ("roleName", "description", "minVolunteers", "maxVolunteers") VALUES ($1, $2, $3, $4) RETURNING "roleId";',
    [roleName, description, minVolunteers, maxVolunteers],
    (err, res) => {
      if (err !== undefined) {
        var response = {
          statusCode: 400,
          isBase64Encoded: false,
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          body: "Failed to create Role: " + roleName
        };
        callback(null, response);
      }

      var roleId = {
        "ID": res.rows[0]["roleId"]
      };

      pool.query(
        'INSERT INTO public."EventRoleUserLinking"("eventId", "roleId", "username") VALUES ($1, $2, $3);',
        [eventId, roleId.ID, username],
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
            body: "Successfully created Role: " + roleName
          };

          // Call back from original
          callback(err, responseOK);
        }
      );
    }
  );
};
