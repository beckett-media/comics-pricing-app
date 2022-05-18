import { sql } from "../loader"

type Title = {
  id: string
  name: string
  publisher: string
}

export const getPopularTitles = async (): Promise<Title[]> => {
  return await sql<Title[]>`
    SELECT
      titles.id,
      titles.name,
      publishers.name AS publisher
    FROM popular_titles
    JOIN titles ON titles.id = popular_titles.title_id
    JOIN publishers ON publishers.id = titles.publisher_id
    ORDER BY popular_titles.issues_count DESC
  `
}
