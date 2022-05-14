import { sql } from "../loader"

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

type TitleDetails = any

export const getDetails = async (id: string): Promise<IssueDetails> => {
  const issue = await sql<
    IssueDetails[]
  >`SELECT issues.id as id, titles.id as title_id, titles.publisher_id,
               issues.name as issue_name, titles.name as title_name, publishers.name as publisher_name,
               raw_values, graded_values, updated_at
        FROM issues
        LEFT JOIN issue_conditions ON issues.id = issue_conditions.issue_id 
        JOIN titles ON issues.title_id = titles.id
        JOIN publishers ON publishers.id = titles.publisher_id
        WHERE issues.id = ${id}
    `
  return issue[0]
}

export const getRelatedIssues = async (id: string): Promise<IssueDetails[]> => {
  return sql`
        SELECT B.id id, B.name name, B.title_id, titles.name title_name
        FROM issues A, issues B
        JOIN titles on B.title_id = titles.id
        WHERE A.title_id = B.title_id AND A.id = ${id} and A.id != B.id
        LIMIT 5
    `
}

export const getRelatedTitles = async (id: string): Promise<TitleDetails[]> => {
  return sql`
        SELECT titles_B.id id, titles_B.name
        FROM issues 
        JOIN titles as titles_A on issues.title_id = titles_A.id
        JOIN titles as titles_B on titles_B.publisher_id = titles_A.publisher_id
        WHERE issues.id = ${id} AND titles_A.id != titles_B.id 
        LIMIT 3
    `
}
