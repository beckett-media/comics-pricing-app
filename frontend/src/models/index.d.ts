import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum ComicWaitingListStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}



type WatchListMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ComicWaitingListMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class WatchList {
  readonly id: string;
  readonly imageId?: string | null;
  readonly issueId?: string | null;
  readonly publisher?: string | null;
  readonly name?: string | null;
  readonly issue?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<WatchList, WatchListMetaData>);
  static copyOf(source: WatchList, mutator: (draft: MutableModel<WatchList, WatchListMetaData>) => MutableModel<WatchList, WatchListMetaData> | void): WatchList;
}

export declare class ComicWaitingList {
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly status?: ComicWaitingListStatus | keyof typeof ComicWaitingListStatus | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ComicWaitingList, ComicWaitingListMetaData>);
  static copyOf(source: ComicWaitingList, mutator: (draft: MutableModel<ComicWaitingList, ComicWaitingListMetaData>) => MutableModel<ComicWaitingList, ComicWaitingListMetaData> | void): ComicWaitingList;
}