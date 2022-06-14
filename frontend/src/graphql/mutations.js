/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createWaitingListComics = /* GraphQL */ `
  mutation CreateWaitingListComics(
    $input: CreateWaitingListComicsInput!
    $condition: ModelWaitingListComicsConditionInput
  ) {
    createWaitingListComics(input: $input, condition: $condition) {
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
export const updateWaitingListComics = /* GraphQL */ `
  mutation UpdateWaitingListComics(
    $input: UpdateWaitingListComicsInput!
    $condition: ModelWaitingListComicsConditionInput
  ) {
    updateWaitingListComics(input: $input, condition: $condition) {
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
export const deleteWaitingListComics = /* GraphQL */ `
  mutation DeleteWaitingListComics(
    $input: DeleteWaitingListComicsInput!
    $condition: ModelWaitingListComicsConditionInput
  ) {
    deleteWaitingListComics(input: $input, condition: $condition) {
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
export const createWatchList = /* GraphQL */ `
  mutation CreateWatchList(
    $input: CreateWatchListInput!
    $condition: ModelWatchListConditionInput
  ) {
    createWatchList(input: $input, condition: $condition) {
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
export const updateWatchList = /* GraphQL */ `
  mutation UpdateWatchList(
    $input: UpdateWatchListInput!
    $condition: ModelWatchListConditionInput
  ) {
    updateWatchList(input: $input, condition: $condition) {
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
export const deleteWatchList = /* GraphQL */ `
  mutation DeleteWatchList(
    $input: DeleteWatchListInput!
    $condition: ModelWatchListConditionInput
  ) {
    deleteWatchList(input: $input, condition: $condition) {
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
export const createRecentlyView = /* GraphQL */ `
  mutation CreateRecentlyView(
    $input: CreateRecentlyViewInput!
    $condition: ModelRecentlyViewConditionInput
  ) {
    createRecentlyView(input: $input, condition: $condition) {
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
export const updateRecentlyView = /* GraphQL */ `
  mutation UpdateRecentlyView(
    $input: UpdateRecentlyViewInput!
    $condition: ModelRecentlyViewConditionInput
  ) {
    updateRecentlyView(input: $input, condition: $condition) {
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
export const deleteRecentlyView = /* GraphQL */ `
  mutation DeleteRecentlyView(
    $input: DeleteRecentlyViewInput!
    $condition: ModelRecentlyViewConditionInput
  ) {
    deleteRecentlyView(input: $input, condition: $condition) {
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
