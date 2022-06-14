// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ComicWaitingListStatus = {
  "PENDING": "PENDING",
  "APPROVED": "APPROVED",
  "REJECTED": "REJECTED"
};

const { WaitingListComics, WatchList, RecentlyView } = initSchema(schema);

export {
  WaitingListComics,
  WatchList,
  RecentlyView,
  ComicWaitingListStatus
};