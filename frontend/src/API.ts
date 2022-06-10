/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateWatchListInput = {
  id?: string | null,
  imageId?: string | null,
  publisher?: string | null,
  name?: string | null,
  issue?: string | null,
  _version?: number | null,
};

export type ModelWatchListConditionInput = {
  imageId?: ModelStringInput | null,
  publisher?: ModelStringInput | null,
  name?: ModelStringInput | null,
  issue?: ModelStringInput | null,
  and?: Array< ModelWatchListConditionInput | null > | null,
  or?: Array< ModelWatchListConditionInput | null > | null,
  not?: ModelWatchListConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type WatchList = {
  __typename: "WatchList",
  id: string,
  imageId?: string | null,
  publisher?: string | null,
  name?: string | null,
  issue?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type UpdateWatchListInput = {
  id: string,
  imageId?: string | null,
  publisher?: string | null,
  name?: string | null,
  issue?: string | null,
  _version?: number | null,
};

export type DeleteWatchListInput = {
  id: string,
  _version?: number | null,
};

export type ModelWatchListFilterInput = {
  id?: ModelIDInput | null,
  imageId?: ModelStringInput | null,
  publisher?: ModelStringInput | null,
  name?: ModelStringInput | null,
  issue?: ModelStringInput | null,
  and?: Array< ModelWatchListFilterInput | null > | null,
  or?: Array< ModelWatchListFilterInput | null > | null,
  not?: ModelWatchListFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelWatchListConnection = {
  __typename: "ModelWatchListConnection",
  items:  Array<WatchList | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type CreateWatchListMutationVariables = {
  input: CreateWatchListInput,
  condition?: ModelWatchListConditionInput | null,
};

export type CreateWatchListMutation = {
  createWatchList?:  {
    __typename: "WatchList",
    id: string,
    imageId?: string | null,
    publisher?: string | null,
    name?: string | null,
    issue?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateWatchListMutationVariables = {
  input: UpdateWatchListInput,
  condition?: ModelWatchListConditionInput | null,
};

export type UpdateWatchListMutation = {
  updateWatchList?:  {
    __typename: "WatchList",
    id: string,
    imageId?: string | null,
    publisher?: string | null,
    name?: string | null,
    issue?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteWatchListMutationVariables = {
  input: DeleteWatchListInput,
  condition?: ModelWatchListConditionInput | null,
};

export type DeleteWatchListMutation = {
  deleteWatchList?:  {
    __typename: "WatchList",
    id: string,
    imageId?: string | null,
    publisher?: string | null,
    name?: string | null,
    issue?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type GetWatchListQueryVariables = {
  id: string,
};

export type GetWatchListQuery = {
  getWatchList?:  {
    __typename: "WatchList",
    id: string,
    imageId?: string | null,
    publisher?: string | null,
    name?: string | null,
    issue?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListWatchListsQueryVariables = {
  filter?: ModelWatchListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListWatchListsQuery = {
  listWatchLists?:  {
    __typename: "ModelWatchListConnection",
    items:  Array< {
      __typename: "WatchList",
      id: string,
      imageId?: string | null,
      publisher?: string | null,
      name?: string | null,
      issue?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncWatchListsQueryVariables = {
  filter?: ModelWatchListFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncWatchListsQuery = {
  syncWatchLists?:  {
    __typename: "ModelWatchListConnection",
    items:  Array< {
      __typename: "WatchList",
      id: string,
      imageId?: string | null,
      publisher?: string | null,
      name?: string | null,
      issue?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateWatchListSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateWatchListSubscription = {
  onCreateWatchList?:  {
    __typename: "WatchList",
    id: string,
    imageId?: string | null,
    publisher?: string | null,
    name?: string | null,
    issue?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateWatchListSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateWatchListSubscription = {
  onUpdateWatchList?:  {
    __typename: "WatchList",
    id: string,
    imageId?: string | null,
    publisher?: string | null,
    name?: string | null,
    issue?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteWatchListSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteWatchListSubscription = {
  onDeleteWatchList?:  {
    __typename: "WatchList",
    id: string,
    imageId?: string | null,
    publisher?: string | null,
    name?: string | null,
    issue?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};
