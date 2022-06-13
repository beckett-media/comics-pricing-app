const Pool = require("pg").Pool;

const sql = new Pool({
  user: "postgres",
  host: "prod-beckett-comic-db.cgq6lc7ttzjk.us-west-1.rds.amazonaws.com",
  database: "comics",
  password: "comicsDB",
  port: 5432,
});

// const sql = new Pool({
//   user: "postgres",
//   host: "prod-beckett-comic-db.cgq6lc7ttzjk.us-west-1.rds.amazonaws.com",
//   database: "comics",
//   password: "comicsDB",
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// })

sql.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err, client);
  process.exit(-1);
});

const connect = () => {
  sql.connect();
};

module.exports = {
  sql,
  connect
};
