import { sql } from "../loader"
import type { IssueMinimal, IssueFull, Title, Price, IssuesTrends } from "types/api"

export const getDetails = async (id: string): Promise<IssueFull> => {
  const issues = await sql<IssueFull[]>`
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
      prices.price current_price
    FROM issues
      JOIN titles ON issues.title_id = titles.id
      JOIN publishers ON publishers.id = titles.publisher_id
      JOIN prices ON prices.issue_id = issues.id
    WHERE issues.id = ${id}
    LIMIT 1
  `

  return issues[0]
}

export const getRelatedIssues = (id: string): Promise<IssueMinimal[]> => {
  return sql<IssueMinimal[]>`
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
  `
}

export const getRelatedTitles = async (id: string): Promise<Title[]> => {
  const title = (
    await sql<Title[]>`
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
  `
  )[0]

  return sql<Title[]>`
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
  `
}

export const getPopularIssues = (): Promise<IssueMinimal[]> => {
  return sql<IssueMinimal[]>`
    SELECT
      issues.id,
      issues.name AS issue,
      titles.name AS title,
      publishers.name AS publisher
    FROM popular_issues
    JOIN issues ON issues.id = popular_issues.issue_id
    JOIN titles ON titles.id = issues.title_id
    JOIN publishers ON publishers.id = titles.publisher_id
    ORDER BY popular_issues.sales_count DESC
  `
}

export const getIssuePrices = (id: string): Promise<Price[]> => {
  return sql<Price[]>`
    SELECT
      grade,
      price,
      date
    FROM sales
    WHERE issue_id = ${id}
    ORDER BY date DESC
  `
}

export const getTrendingIssues = async (): Promise<IssueMinimal[]> => {
  return sql<IssueMinimal[]>`
    SELECT
      issues.id,
      issues.name issue,
      titles.name title
    FROM issues
    JOIN titles ON titles.id = issues.title_id
    JOIN publishers ON publishers.id = titles.publisher_id
    JOIN sales_count ON sales_count.issue_id = issues.id
    LIMIT 3
  `
}

export const getRecentPriceDrops = async (): Promise<IssuesTrends[]> => {
  return await sql<IssuesTrends[]>`
    SELECT
      issues.id,
      issues.name issue,
      titles.name title,
      recent_sales.price_change as price
    FROM issues
    JOIN titles ON titles.id = issues.title_id
    JOIN recent_sales ON recent_sales.issue_id = issues.id
    LIMIT 3
  `
}

export const getNewComics = async (): Promise<IssuesTrends[]> => {
  return await sql<IssuesTrends[]>`
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
  `
}