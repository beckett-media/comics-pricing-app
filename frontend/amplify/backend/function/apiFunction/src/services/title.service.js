const { sql } = require('../connection');

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