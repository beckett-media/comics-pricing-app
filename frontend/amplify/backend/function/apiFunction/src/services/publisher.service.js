const { sql } = require('../connection');

//  make a materialized view for this
const getPopularPublishers = async () => {
  return await sql.query(`
  SELECT
    publishers.id,
    publishers.name
  FROM publishers
  LIMIT 10`)
}
// const getPopularPublishers = async () => {
//   return await sql.query(`
//     SELECT
//       publishers.id,
//       publishers.name
//     FROM titles
//       JOIN publishers ON publishers.id = titles.publisher_id
//     GROUP BY publishers.id
//     ORDER BY COUNT(titles.name) DESC
//     LIMIT 10`);
// };

module.exports = {
  getPopularPublishers,
}
