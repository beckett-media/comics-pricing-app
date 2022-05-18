import { sql } from "../loader"

type Title = {
  id: string
  name: string
  publisher: string
}

// TODO(enricozb): remove this and computer popular titles periodically
// These are the top ten titles with the most issues, computed by:
//   SELECT
//     title_id,
//     COUNT(*)
//   FROM issues
//   GROUP BY title_id
//   ORDER BY COUNT(*) DESC
//   LIMIT 10
const POPULAR_TITLES = [
  "a63085fd-4c47-4461-9d8e-264d87aad4e5",
  "b025e390-e9ee-4455-817d-e4dacb200d82",
  "df501060-f4cf-4fb0-baaf-906c7477f738",
  "3d72b59e-f908-4bd7-a206-7f3374178574",
  "0ee9f3d8-146a-4060-b957-8b0ba62d1b50",
  "1284876f-96bc-4e29-a7c9-b76cdd4707b7",
  "be1fb7dd-2633-4686-83b9-df8ebf03ee9e",
  "cfee15ae-08c2-47a6-b41a-e77a800021a7",
  "3b922712-fe50-4fba-a84c-06ca20a94213",
  "64426884-e908-406f-a5de-69684266f928",
]

export const getPopularTitles = async (): Promise<Title[]> => {
  return await sql<Title[]>`
    SELECT
      titles.id,
      titles.name,
      publishers.name AS publisher
    FROM titles
    JOIN publishers ON publishers.id = titles.publisher_id
    WHERE titles.id IN ${sql(POPULAR_TITLES)}
  `
}
