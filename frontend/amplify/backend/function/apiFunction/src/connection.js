const Pool = require("pg").Pool;

// Read from .env
// https://github.com/brianc/node-postgres/tree/master/packages/pg-pool#note
const sql = new Pool({
  user: "postgres",
  host: "prod-beckett-comic-db.cgq6lc7ttzjk.us-west-1.rds.amazonaws.com",
  database: "comics",
  password: "comicsDB",
  port: 5432,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

sql.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err, client);
  process.exit(-1);
});

module.exports = {
  sql,
  // query: (text, params, callback) => {
  //   const start = Date.now()
  //   return sql.query(text, params, (err, res) => {
  //     const duration = Date.now() - start
  //     console.log('executed query', { text, duration, rows: res.rowCount })
  //     if (callback) {
  //       callback(err, res)
  //     }
  //   })
  // },
};
