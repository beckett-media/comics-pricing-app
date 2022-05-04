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
export const getDetails = async (id: string) => {
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
  return {
    ...issue[0],
    imgUrl:
      "https://static.wikia.nocookie.net/yugioh/images/2/23/SetoKaiba-DL.png/revision/latest/scale-to-width-down/562?cb=20190614200609",
  }
}
