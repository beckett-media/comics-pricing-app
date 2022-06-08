const { Pool, Client } = require("pg");

const sql = new Pool({
  user: "postgres",
  host: "prod-beckett-comic-db.cgq6lc7ttzjk.us-west-1.rds.amazonaws.com",
  database: "comics",
  password: "comicsDB",
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});


const getPopularTitles = async () => {
  return await sql.query(`
    SELECT
      titles.id,
      titles.name,
      publishers.name AS publisher
    FROM popular_titles
    JOIN titles ON titles.id = popular_titles.title_id
    JOIN publishers ON publishers.id = titles.publisher_id
    ORDER BY popular_titles.issues_count DESC
  `);
}

module.exports = {
  getPopularTitles
}