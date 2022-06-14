const { sql } = require('../connection');

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
      issues.cpg_id
      --prices.price current_price
  FROM issues
    JOIN titles ON issues.title_id = titles.id
    JOIN publishers ON publishers.id = titles.publisher_id
    --JOIN prices ON prices.issue_id = issues.id
  WHERE issues.id = $1
  LIMIT 1
  `, [id])

  return issues.rows[0]
}

// const getRelatedIssues = async (id) => {
//   return sql.query(`
//     SELECT
//       related.id,
//       related.name issue,
//       titles.name title,
//       publishers.name publisher
//     FROM issues related
//       JOIN issues ON issues.title_id = related.title_id
//       JOIN titles ON titles.id = related.title_id
//       JOIN publishers ON publishers.id = titles.publisher_id
//     WHERE
//       related.id != $1 AND
//       issues.id = $1
//     LIMIT 5
//   `, [id])
// }

const getRelatedIssues = async (id) => {
  return sql.query(`
  SELECT
    related.id,
    related.name issue,
    titles.name title,
    publishers.name publisher,
    related.cpg_id img_id
  FROM issues related
    JOIN issues ON issues.title_id = related.title_id
    JOIN titles ON titles.id = related.title_id
    JOIN publishers ON publishers.id = titles.publisher_id
  WHERE
    related.id != $1 AND
    issues.id = $1
  LIMIT 5
  `, [id])
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
    WHERE issues.id = $1
    LIMIT 1
  `, [id])
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

// const getPopularIssues = async () => {
//   const res = await sql.query(
//     `
//     SELECT
//     issues.id,
//     issues.name AS issue,
//     titles.name AS title,
//     publishers.name AS publisher,
//     issues.cpg_id as img_id
//   FROM issues
//   JOIN titles ON titles.id = issues.title_id
//   JOIN publishers ON publishers.id = titles.publisher_id
//   limit 50
//   `
//   )
//   try {
//     return res.rows
//   } catch (err) {
//     console.log(err)
//     return []
//   }
// }


const getPopularIssues = async () => {
  try {
    const res = await sql.query(
      `SELECT
        issues.id,
        issues.name AS issue,
        titles.name AS title,
        publishers.name AS publisher,
        issues.cpg_id as img_id
      FROM popular_issues
      JOIN issues ON issues.id = popular_issues.issue_id
      JOIN titles ON titles.id = issues.title_id
      JOIN publishers ON publishers.id = titles.publisher_id
      ORDER BY popular_issues.sales_count DESC
      `
    )
    return res.rows
  } catch (err) {
    console.log(err)
    return []
  }
}

// const getPopularIssues = async () => {
//   //sql.connect();
//   return await  sql.query(`
//     SELECT
//       issues.id,
//       issues.name AS issue,
//       titles.name AS title,
//       publishers.name AS publisher,
//       issues.cpg_id as img_id
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
    FROM sales s
    join issues i on i.cpg_id = s.cpg_id 
    WHERE i.cpg_id = $1
    ORDER BY date DESC
  `, [id])
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
    LIMIT 10
  `)
}

const getRecentPriceDrops = () => {
  return sql.query(`
    SELECT
      issues.id,
      issues.name issue,
      titles.name title,
      recent_sales.price_change as price
    FROM issues
    JOIN titles ON titles.id = issues.title_id
    JOIN recent_sales ON recent_sales.issue_id = issues.id
    LIMIT 10
  `)
}

const getNewComics = () => {
  return sql.query(`
  SELECT 
    issues.id,
    issues.name issue, 
    titles.name title,
    sales.price as price
  FROM issues 
  JOIN titles ON issues.title_id = titles.id 
  JOIN sales ON issues.cpg_id = sales.cpg_id
  ORDER BY sales.date DESC 
  LIMIT 10
  `)
}

const getIssueSalesHistory = () => {
  return sql.query(`
  SELECT
      issues.name issue,
      titles.name title,
      sales_history.*
    FROM issues
    JOIN titles ON titles.id = issues.title_id
    JOIN sales_history ON sales_history.issue_id = issues.id
  `)
}

const getIssuePriceAnalytics = async (data) => {
  return sql.query(`
  SELECT
    max(price), 
    min(price), 
    avg(price)
    FROM sales s
    join issues i on i.cpg_id=s.cpg_id 
  where 
    i.id = $1
    and date > CURRENT_DATE - INTERVAL '$2 months'
  `, [data.id, data.num_months])
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
  getIssueSalesHistory,
  getIssuePriceAnalytics
}
