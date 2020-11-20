const { Pool } = require("pg");
const pool = new Pool();
pool.connect();

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  var body = JSON.parse(event.body)
  const username = body['username'];
  const password = body['password'];

  pool.query(
    'SELECT "username", "password" FROM public."UserPrivate" where "username" = $1;',
    [username],
    (err, res) => {
      if (err !== undefined) {
        var response = {
          statusCode: 400,
          isBase64Encoded: false,
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          body: "Failed to Login: " + username
        };
        callback(null, response);
      }

      if (res.rows[0]['password'] !== password) {
        var response = {
          statusCode: 400,
          isBase64Encoded: false,
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          body: "Invalid password"
        };
        callback(null, response);
      } else {
        var token = { "token": username }
        var response = {
          statusCode: 200,
          isBase64Encoded: false,
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify(token)
        };
        callback(null, response);
      }
    }
  );
};
