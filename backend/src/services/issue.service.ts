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
  raw_values: number[]
  grader_values: number[]
  update_at: Date
}

type TitleDetails = {
  id: string
  name: string
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
      raw_values,
      graded_values,
      updated_at
    FROM issues
      LEFT JOIN issue_conditions ON issues.id = issue_conditions.issue_id
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

// TODO(enricozb): remove this and computer popular titles periodically
// These are the top ten titles with the most issues, computed by:
//   SELECT
//     issue_id,
//     COUNT(*)
//   FROM sales
//   GROUP BY issue_id
//   ORDER BY COUNT(*) DESC
//   LIMIT 10
// and by removing issues without images
const POPULAR_ISSUES = [
  "0f28e0e5-e557-4261-8f0b-8dfbfed59642",
  "8f2b8443-2d00-4b52-88e2-94c04b6a5193",
  "583c4f29-bcf3-46fa-b26e-07ff6e7bd0ff",
  "aced7f57-13ce-4940-ae5a-921b85a083bb",
  "f28ce0c0-e157-48c3-a861-68f7b6535dc8",
  "c178295d-a1bf-439a-9524-22209f606f98",
  "b83bef9b-a7f2-49ea-acc3-85a300a397e2",
]

export const getPopularIssues = async (): Promise<Issue[]> => {
  return await sql<Issue[]>`
    SELECT
      issues.id,
      issues.name AS issue,
      titles.name AS title,
      publishers.name AS publisher
    FROM issues
    JOIN titles ON titles.id = issues.title_id
    JOIN publishers ON publishers.id = titles.publisher_id
    WHERE issues.id IN ${sql(POPULAR_ISSUES)}
  `
}
