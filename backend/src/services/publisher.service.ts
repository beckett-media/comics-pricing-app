import { sql } from "../loader"

type Publisher = {
  id: string
  name: string
}

export const getPopularPublishers = async () => {
  return await sql<Publisher[]>`
    SELECT
      publishers.id,
      publishers.name
    FROM titles
    JOIN publishers ON publishers.id = titles.publisher_id
    GROUP BY publishers.id
    ORDER BY COUNT(titles.name) DESC
    LIMIT 10`
}
