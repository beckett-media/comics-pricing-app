export type IssueMinimal = {
  id: string
  issue: string
  title: string
  publisher: string
}

export type IssuesTrends = {
  id: string
  issue: string
  title: string
  price: string
}

export type IssueFull = IssueMinimal & {
  title_id: string
  publisher_id: string
  volume: string | null
  comment: string | null
  publication_month: number | null
  publication_year: number | null
}

export type Title = {
  id: string
  name: string
  publisher: string
  publisher_id: string
}

export type Publisher = {
  id: string
  name: string
}

export type Price = {
  date: string
  price: string
  grade: string
}
