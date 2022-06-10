import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type WatchListMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class WatchList {
  readonly id: string;
  readonly imageId?: string | null;
  readonly publisher?: string | null;
  readonly name?: string | null;
  readonly issue?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<WatchList, WatchListMetaData>);
  static copyOf(source: WatchList, mutator: (draft: MutableModel<WatchList, WatchListMetaData>) => MutableModel<WatchList, WatchListMetaData> | void): WatchList;
}