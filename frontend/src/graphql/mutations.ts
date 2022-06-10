/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createWatchList = /* GraphQL */ `
  mutation CreateWatchList(
    $input: CreateWatchListInput!
    $condition: ModelWatchListConditionInput
  ) {
    createWatchList(input: $input, condition: $condition) {
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
export const updateWatchList = /* GraphQL */ `
  mutation UpdateWatchList(
    $input: UpdateWatchListInput!
    $condition: ModelWatchListConditionInput
  ) {
    updateWatchList(input: $input, condition: $condition) {
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
export const deleteWatchList = /* GraphQL */ `
  mutation DeleteWatchList(
    $input: DeleteWatchListInput!
    $condition: ModelWatchListConditionInput
  ) {
    deleteWatchList(input: $input, condition: $condition) {
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
