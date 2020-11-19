const { Pool } = require("pg");
const pool = new Pool();
pool.connect();

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const id = event["pathParameters"]["id"];

  pool.query(
    'SELECT * FROM public."Event" WHERE "eventId" = $1;',
    [id],
    (err, res) => {
      var response = {
        statusCode: 200,
        isBase64Encoded: false,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(res.rows[0])
      };
      callback(err, response);
    }
  );
};
