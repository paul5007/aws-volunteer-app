const { Pool } = require("pg");
const pool = new Pool();
pool.connect();

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  pool.query(
    'SELECT now();',
    (err, res) => {
      if (err !== undefined) {
        var response = {
          statusCode: 400,
          isBase64Encoded: false,
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
          body: "Failed to create UserEventRoleLookup: " + username
        };
        callback(null, response);
      }

      // Call back from original
      callback(err, responseOK);
    }
  );
};
