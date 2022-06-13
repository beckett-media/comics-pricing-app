/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateWaitingListComicsInput = {
  id?: string | null,
  username?: string | null,
  email?: string | null,
  status?: ComicWaitingListStatus | null,
  _version?: number | null,
};

export enum ComicWaitingListStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}


export type ModelWaitingListComicsConditionInput = {
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  status?: ModelComicWaitingListStatusInput | null,
  and?: Array< ModelWaitingListComicsConditionInput | null > | null,
  or?: Array< ModelWaitingListComicsConditionInput | null > | null,
  not?: ModelWaitingListComicsConditionInput | null,
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

export type ModelComicWaitingListStatusInput = {
  eq?: ComicWaitingListStatus | null,
  ne?: ComicWaitingListStatus | null,
};

export type WaitingListComics = {
  __typename: "WaitingListComics",
  id: string,
  username?: string | null,
  email?: string | null,
  status?: ComicWaitingListStatus | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateWaitingListComicsInput = {
  id: string,
  username?: string | null,
  email?: string | null,
  status?: ComicWaitingListStatus | null,
  _version?: number | null,
};

export type DeleteWaitingListComicsInput = {
  id: string,
  _version?: number | null,
};

export type CreateWatchListInput = {
  id?: string | null,
  imageId?: string | null,
  issueId?: string | null,
  publisher?: string | null,
  name?: string | null,
  issue?: string | null,
  _version?: number | null,
};

export type ModelWatchListConditionInput = {
  imageId?: ModelStringInput | null,
  issueId?: ModelStringInput | null,
  publisher?: ModelStringInput | null,
  name?: ModelStringInput | null,
  issue?: ModelStringInput | null,
  and?: Array< ModelWatchListConditionInput | null > | null,
  or?: Array< ModelWatchListConditionInput | null > | null,
  not?: ModelWatchListConditionInput | null,
};

export type WatchList = {
  __typename: "WatchList",
  id: string,
  imageId?: string | null,
  issueId?: string | null,
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
  issueId?: string | null,
  publisher?: string | null,
  name?: string | null,
  issue?: string | null,
  _version?: number | null,
};

export type DeleteWatchListInput = {
  id: string,
  _version?: number | null,
};

export type ModelWaitingListComicsFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  status?: ModelComicWaitingListStatusInput | null,
  and?: Array< ModelWaitingListComicsFilterInput | null > | null,
  or?: Array< ModelWaitingListComicsFilterInput | null > | null,
  not?: ModelWaitingListComicsFilterInput | null,
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

export type ModelWaitingListComicsConnection = {
  __typename: "ModelWaitingListComicsConnection",
  items:  Array<WaitingListComics | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelWatchListFilterInput = {
  id?: ModelIDInput | null,
  imageId?: ModelStringInput | null,
  issueId?: ModelStringInput | null,
  publisher?: ModelStringInput | null,
  name?: ModelStringInput | null,
  issue?: ModelStringInput | null,
  and?: Array< ModelWatchListFilterInput | null > | null,
  or?: Array< ModelWatchListFilterInput | null > | null,
  not?: ModelWatchListFilterInput | null,
};

export type ModelWatchListConnection = {
  __typename: "ModelWatchListConnection",
  items:  Array<WatchList | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type CreateWaitingListComicsMutationVariables = {
  input: CreateWaitingListComicsInput,
  condition?: ModelWaitingListComicsConditionInput | null,
};

export type CreateWaitingListComicsMutation = {
  createWaitingListComics?:  {
    __typename: "WaitingListComics",
    id: string,
    username?: string | null,
    email?: string | null,
    status?: ComicWaitingListStatus | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateWaitingListComicsMutationVariables = {
  input: UpdateWaitingListComicsInput,
  condition?: ModelWaitingListComicsConditionInput | null,
};

export type UpdateWaitingListComicsMutation = {
  updateWaitingListComics?:  {
    __typename: "WaitingListComics",
    id: string,
    username?: string | null,
    email?: string | null,
    status?: ComicWaitingListStatus | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteWaitingListComicsMutationVariables = {
  input: DeleteWaitingListComicsInput,
  condition?: ModelWaitingListComicsConditionInput | null,
};

export type DeleteWaitingListComicsMutation = {
  deleteWaitingListComics?:  {
    __typename: "WaitingListComics",
    id: string,
    username?: string | null,
    email?: string | null,
    status?: ComicWaitingListStatus | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
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
    issueId?: string | null,
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
    issueId?: string | null,
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
    issueId?: string | null,
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

export type GetWaitingListComicsQueryVariables = {
  id: string,
};

export type GetWaitingListComicsQuery = {
  getWaitingListComics?:  {
    __typename: "WaitingListComics",
    id: string,
    username?: string | null,
    email?: string | null,
    status?: ComicWaitingListStatus | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListWaitingListComicsQueryVariables = {
  filter?: ModelWaitingListComicsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListWaitingListComicsQuery = {
  listWaitingListComics?:  {
    __typename: "ModelWaitingListComicsConnection",
    items:  Array< {
      __typename: "WaitingListComics",
      id: string,
      username?: string | null,
      email?: string | null,
      status?: ComicWaitingListStatus | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncWaitingListComicsQueryVariables = {
  filter?: ModelWaitingListComicsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncWaitingListComicsQuery = {
  syncWaitingListComics?:  {
    __typename: "ModelWaitingListComicsConnection",
    items:  Array< {
      __typename: "WaitingListComics",
      id: string,
      username?: string | null,
      email?: string | null,
      status?: ComicWaitingListStatus | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
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
    issueId?: string | null,
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
      issueId?: string | null,
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
      issueId?: string | null,
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

export type OnCreateWaitingListComicsSubscription = {
  onCreateWaitingListComics?:  {
    __typename: "WaitingListComics",
    id: string,
    username?: string | null,
    email?: string | null,
    status?: ComicWaitingListStatus | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateWaitingListComicsSubscription = {
  onUpdateWaitingListComics?:  {
    __typename: "WaitingListComics",
    id: string,
    username?: string | null,
    email?: string | null,
    status?: ComicWaitingListStatus | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteWaitingListComicsSubscription = {
  onDeleteWaitingListComics?:  {
    __typename: "WaitingListComics",
    id: string,
    username?: string | null,
    email?: string | null,
    status?: ComicWaitingListStatus | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
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
    issueId?: string | null,
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
    issueId?: string | null,
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
    issueId?: string | null,
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
