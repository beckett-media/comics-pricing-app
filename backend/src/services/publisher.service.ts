import { sql } from "../loader"

import type { Publisher } from "types/api"

// TODO(enricozb): make a materialized view for this
export const getPopularPublishers = async (): Promise<Publisher[]> => {
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
