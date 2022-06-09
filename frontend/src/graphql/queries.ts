/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getWatchList = /* GraphQL */ `
  query GetWatchList($id: ID!) {
    getWatchList(id: $id) {
      id
      imageId
      publisher
      name
      issue
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const listWatchLists = /* GraphQL */ `
  query ListWatchLists(
    $filter: ModelWatchListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWatchLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        imageId
        publisher
        name
        issue
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncWatchLists = /* GraphQL */ `
  query SyncWatchLists(
    $filter: ModelWatchListFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWatchLists(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        imageId
        publisher
        name
        issue
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
