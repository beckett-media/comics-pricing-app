export function getPublisherImage(id: string) {
  return `https://comics-scans.s3.amazonaws.com/publishers/${id}`
}

export function getTitleImage(id: string) {
  return `https://comics-scans.s3.amazonaws.com/titles/${id}`
}

export function getIssueImage(id: string) {
  return `https://comics-scans.s3.amazonaws.com/issues/${id}`
}
