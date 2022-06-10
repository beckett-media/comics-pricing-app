export function getPublisherImage(id: string) {
  return `https://comicss3bucket100929-dev.s3.us-west-1.amazonaws.com/publishers/${id}`
}

export function getTitleImage(id: string) {
  return `https://comicss3bucket100929-dev.s3.us-west-1.amazonaws.com/titles/${id}`
}

export function getIssueImage(id: string) {
  return `https://comicss3bucket100929-dev.s3.us-west-1.amazonaws.com/issues/${id}`
}
