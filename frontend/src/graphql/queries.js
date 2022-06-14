/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getWaitingListComics = /* GraphQL */ `
  query GetWaitingListComics($id: ID!) {
    getWaitingListComics(id: $id) {
      id
      username
      email
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listWaitingListComics = /* GraphQL */ `
  query ListWaitingListComics(
    $filter: ModelWaitingListComicsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWaitingListComics(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        email
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncWaitingListComics = /* GraphQL */ `
  query SyncWaitingListComics(
    $filter: ModelWaitingListComicsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWaitingListComics(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        username
        email
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getWatchList = /* GraphQL */ `
  query GetWatchList($id: ID!) {
    getWatchList(id: $id) {
      id
      imageId
      issueId
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
        issueId
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
        issueId
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
export const getRecentlyView = /* GraphQL */ `
  query GetRecentlyView($id: ID!) {
    getRecentlyView(id: $id) {
      id
      imageId
      issueId
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
export const listRecentlyViews = /* GraphQL */ `
  query ListRecentlyViews(
    $filter: ModelRecentlyViewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecentlyViews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        imageId
        issueId
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
export const syncRecentlyViews = /* GraphQL */ `
  query SyncRecentlyViews(
    $filter: ModelRecentlyViewFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRecentlyViews(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        imageId
        issueId
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
