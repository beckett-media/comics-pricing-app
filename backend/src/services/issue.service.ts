import { sql } from "../loader"

type Issue = {
  id: string
  issue: string
  title: string
  publisher: string
}

type IssueDetails = {
  id: string
  title_id: string
  publisher_id: string
  issue_name: string
  title_name: string
  publisher_name: string
  volume: string | null
  comment: string | null
  publication_month: number | null
  publication_year: number | null
}

type TitleDetails = {
  id: string
  name: string
}

type Price = {
  date: string
  price: string
  grade: string
}

export const getDetails = async (id: string): Promise<IssueDetails> => {
  const issues = await sql<IssueDetails[]>`
    SELECT
      issues.id id,
      titles.id title_id,
      titles.publisher_id,
      issues.name issue_name,
      titles.name title_name,
      publishers.name publisher_name,
      titles.volume,
      issues.comment,
      month publication_month,
      year publication_year
    FROM issues
      JOIN titles ON issues.title_id = titles.id
      JOIN publishers ON publishers.id = titles.publisher_id
    WHERE issues.id = ${id}
  `

  return issues[0]
}

export const getRelatedIssues = async (id: string): Promise<IssueDetails[]> => {
  return await sql<IssueDetails[]>`
    SELECT
      B.id id,
      B.name name,
      B.title_id,
      titles.name title_name
    FROM issues A, issues B
      JOIN titles on B.title_id = titles.id
    WHERE A.title_id = B.title_id AND A.id = ${id} and A.id != B.id
    LIMIT 5
  `
}

export const getRelatedTitles = async (id: string): Promise<TitleDetails[]> => {
  return await sql`
    SELECT
      titles_B.id id,
      titles_B.name
    FROM issues
      JOIN titles as titles_A on issues.title_id = titles_A.id
      JOIN titles as titles_B on titles_B.publisher_id = titles_A.publisher_id
    WHERE issues.id = ${id} AND titles_A.id != titles_B.id
    LIMIT 3
  `
}

export const getPopularIssues = async (): Promise<Issue[]> => {
  return await sql<Issue[]>`
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

export const getIssuePrices = async (id: string): Promise<Price[]> => {
  return await sql<Price[]>`
    SELECT
      grade,
      price,
      date
    FROM sales
    WHERE issue_id = ${id}
  `
}
