const { Pool } = require("pg");
const pool = new Pool();
pool.connect();

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  pool.query('SELECT * FROM public."Event";', (err, res) => {
    var response = {
      statusCode: 200,
      isBase64Encoded: false,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(res.rows)
    };
    callback(err, response);
  });
};
