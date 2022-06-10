const { Pool, Client } = require("pg")

const sql = new Pool({
  user: "postgres",
  host: "prod-beckett-comic-db.cgq6lc7ttzjk.us-west-1.rds.amazonaws.com",
  database: "comics",
  password: "comicsDB",
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

const getDetails = async (id) => {
  const issues = await sql.query(`
    SELECT
      issues.id id,
      issues.name issue,
      titles.name title,
      publishers.name publisher,
      issues.title_id,
      titles.publisher_id,
      issues.age,
      issues.cover_price,
      titles.volume,
      issues.comment,
      month publication_month,
      year publication_year, 
      issues.cpg_id as img_id
      --prices.price current_price
  FROM issues
    JOIN titles ON issues.title_id = titles.id
    JOIN publishers ON publishers.id = titles.publisher_id
    --JOIN prices ON prices.issue_id = issues.id
  WHERE issues.id = ${id}
  LIMIT 1
  `)

  return issues.rows[0]
}

const getRelatedIssues = async (id) => {
  return sql.query(`
    SELECT
      related.id,
      related.name issue,
      titles.name title,
      publishers.name publisher
    FROM issues related
      JOIN issues ON issues.title_id = related.title_id
      JOIN titles ON titles.id = related.title_id
      JOIN publishers ON publishers.id = titles.publisher_id
    WHERE
      related.id != ${id} AND
      issues.id = ${id}
    LIMIT 5
  `)
}

const getRelatedTitles = async (id) => {
  const title = (
    await sql.query(`
    SELECT
      titles.id,
      titles.name,
      publishers.name publisher,
      publishers.id publisher_id
    FROM issues
      JOIN titles ON titles.id = issues.title_id
      JOIN publishers ON publishers.id = titles.publisher_id
    WHERE issues.id = ${id}
    LIMIT 1
  `)
  )[0]

  return sql.query(`
    SELECT
      titles.id,
      titles.name,
      publishers.name publisher,
      publishers.id publisher_id
    FROM titles
      JOIN publishers ON publishers.id = titles.publisher_id
    WHERE
      titles.name = ${title.name} AND
      publishers.id = ${title.publisher_id} AND
      titles.id != ${title.id}
    LIMIT 3
  `)
}

const getPopularIssues = async () => {
  const res = await sql.query(
    `
    SELECT
    issues.id,
    issues.name AS issue,
    titles.name AS title,
    publishers.name AS publisher,
    issues.cpg_id as img_id
  FROM issues
  JOIN titles ON titles.id = issues.title_id
  JOIN publishers ON publishers.id = titles.publisher_id
  limit 50
  `
  )
  try {
    return res.rows
  } catch (err) {
    console.log(err)
    return []
  } finally {
    sql.end()
  }
}

// const getPopularIssues = () => {
//   sql.connect();
//   return sql.query(`
//     SELECT
//       issues.id,
//       issues.name AS issue,
//       titles.name AS title,
//       publishers.name AS publisher
//     FROM popular_issues
//     JOIN issues ON issues.id = popular_issues.issue_id
//     JOIN titles ON titles.id = issues.title_id
//     JOIN publishers ON publishers.id = titles.publisher_id
//     ORDER BY popular_issues.sales_count DESC
//   `);
// };

const getIssuePrices = async (id) => {
  return sql.query(`
    SELECT
      grade,
      price,
      date
    FROM sales
    WHERE issue_id = ${id}
    ORDER BY date DESC
  `)
}

const getTrendingIssues = async () => {
  return sql.query(`
    SELECT
      issues.id,
      issues.name issue,
      titles.name title
    FROM issues
    JOIN titles ON titles.id = issues.title_id
    JOIN publishers ON publishers.id = titles.publisher_id
    JOIN sales_count ON sales_count.issue_id = issues.id
    LIMIT 3
  `)
}

const getRecentPriceDrops = async () => {
  return await sql.query(`
    SELECT
      issues.id,
      issues.name issue,
      titles.name title,
      recent_sales.price_change as price
    FROM issues
    JOIN titles ON titles.id = issues.title_id
    JOIN recent_sales ON recent_sales.issue_id = issues.id
    LIMIT 3
  `)
}

const getNewComics = async () => {
  return await sql.query(`
    SELECT 
      issues.id,
      issues.name issue, 
      titles.name title,
      sales.price as price
    FROM issues 
    JOIN titles ON issues.title_id = titles.id 
    JOIN sales ON issues.id = sales.issue_id 
    ORDER BY sales.date DESC 
    LIMIT 3
  `)
}

module.exports = {
  getDetails,
  getRelatedIssues,
  getRelatedTitles,
  getPopularIssues,
  getIssuePrices,
  getTrendingIssues,
  getRecentPriceDrops,
  getNewComics,
}
