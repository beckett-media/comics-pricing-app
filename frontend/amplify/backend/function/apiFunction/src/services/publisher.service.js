const { Pool, Client } = require("pg");

const sql = new Pool({
  user: "postgres",
  host: "prod-beckett-comic-db.cgq6lc7ttzjk.us-west-1.rds.amazonaws.com",
  database: "comics",
  password: "comicsDB",
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

//  make a materialized view for this
const getPopularPublishers = async () => {
  return await sql.query(`
    SELECT
      publishers.id,
      publishers.name
    FROM titles
      JOIN publishers ON publishers.id = titles.publisher_id
    GROUP BY publishers.id
    ORDER BY COUNT(titles.name) DESC
    LIMIT 10`);
};

module.exports = {
  getPopularPublishers,
};
