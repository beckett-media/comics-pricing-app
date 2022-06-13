/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateWaitingListComics = /* GraphQL */ `
  subscription OnCreateWaitingListComics {
    onCreateWaitingListComics {
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
export const onUpdateWaitingListComics = /* GraphQL */ `
  subscription OnUpdateWaitingListComics {
    onUpdateWaitingListComics {
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
export const onDeleteWaitingListComics = /* GraphQL */ `
  subscription OnDeleteWaitingListComics {
    onDeleteWaitingListComics {
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
export const onCreateWatchList = /* GraphQL */ `
  subscription OnCreateWatchList($owner: String) {
    onCreateWatchList(owner: $owner) {
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
export const onUpdateWatchList = /* GraphQL */ `
  subscription OnUpdateWatchList($owner: String) {
    onUpdateWatchList(owner: $owner) {
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
export const onDeleteWatchList = /* GraphQL */ `
  subscription OnDeleteWatchList($owner: String) {
    onDeleteWatchList(owner: $owner) {
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
