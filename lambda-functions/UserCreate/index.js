const { Pool } = require("pg");
const bcrypt = require("bcrypt")
const pool = new Pool();
pool.connect();
const saltRounds = 10;

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var body = JSON.parse(event.body);
  var username = body["username"];
  var password = body["password"];
  var email = body["email"];

  pool.query(
    'INSERT INTO public."UserPrivate"("username", "password", "email") VALUES ($1, $2, $3);',
    [username, password, email],
    (err, res) => {
      if (err !== undefined) {
        var response409 = {
          statusCode: 409,
          isBase64Encoded: false,
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
        };
        callback(null, response409);
      }


      pool.query(
        'INSERT INTO public."User"("username") VALUES ($1);',
        [username],
        (err, res) => {
          if (err !== undefined) {
            var response4092 = {
              statusCode: 409,
              isBase64Encoded: false,
              headers: {
                "Access-Control-Allow-Origin": "*"
              },
              body: "Failed to create User: " + username
            };
            callback(null, response4092);
          }
          var response = {
            statusCode: 200,
            isBase64Encoded: false,
            headers: {
              "Access-Control-Allow-Origin": "*"
            }
          };
          callback(null, response);
        }
      );
    }
  );
};
