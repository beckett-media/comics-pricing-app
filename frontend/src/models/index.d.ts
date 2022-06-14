import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum ComicWaitingListStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}



type WaitingListComicsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type WatchListMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type RecentlyViewMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class WaitingListComics {
  readonly id: string;
  readonly username?: string | null;
  readonly email?: string | null;
  readonly status?: ComicWaitingListStatus | keyof typeof ComicWaitingListStatus | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<WaitingListComics, WaitingListComicsMetaData>);
  static copyOf(source: WaitingListComics, mutator: (draft: MutableModel<WaitingListComics, WaitingListComicsMetaData>) => MutableModel<WaitingListComics, WaitingListComicsMetaData> | void): WaitingListComics;
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

export declare class RecentlyView {
  readonly id: string;
  readonly imageId?: string | null;
  readonly issueId?: string | null;
  readonly publisher?: string | null;
  readonly name?: string | null;
  readonly issue?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<RecentlyView, RecentlyViewMetaData>);
  static copyOf(source: RecentlyView, mutator: (draft: MutableModel<RecentlyView, RecentlyViewMetaData>) => MutableModel<RecentlyView, RecentlyViewMetaData> | void): RecentlyView;
}