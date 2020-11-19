const { Pool } = require("pg");
const pool = new Pool();
pool.connect();

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var body = JSON.parse(event.body);
  var eventName = body["eventName"];
  var description = body["description"];
  var startTime = body["startTime"];
  var endTime = body["endTime"];
  var username = body["username"];

  pool.query(
    'INSERT INTO public."Event"("eventName", "description", "startTime", "endTime") VALUES ($1, $2, $3, $4) RETURNING "eventId";',
    [eventName, description, startTime, endTime],
    (err, res) => {
      if (err !== undefined) {
        var response = {
          statusCode: 400,
          isBase64Encoded: false,
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          body: "Failed to created Event: " + eventName
        };
        callback(null, response);
      }

      var eventId = {
        "ID": res.rows[0]["eventId"]
      };
      var responseOK = {
        statusCode: 200,
        isBase64Encoded: false,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(eventId)
      };
      pool.query(
        'INSERT INTO public."Role"("roleName", "description", "minVolunteers", "maxVolunteers") VALUES ($1, $2, $3, $4) RETURNING "roleId";',
        ['Organizer', 'In charge of organizing event', 1, 1],
        (err, res) => {
          if (err !== undefined) {
            var response = {
              statusCode: 400,
              isBase64Encoded: false,
              headers: {
                "Access-Control-Allow-Origin": "*"
              },
              body: "Failed to create Role: " + username
            };
            callback(null, response);
          }

          var roleId = {
            "ID": res.rows[0]["roleId"]
          };
          pool.query(
            'INSERT INTO public."EventRoleUserLinking"("eventId", "roleId", "username") VALUES ($1, $2, $3);',
            [eventId.ID, roleId.ID, username],
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

              // Call back from original
              callback(err, responseOK);
            }
          );
        }
      );
    }
  );
};
