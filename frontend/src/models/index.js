// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ComicWaitingListStatus = {
  "PENDING": "PENDING",
  "APPROVED": "APPROVED",
  "REJECTED": "REJECTED"
};

const { WatchList, ComicWaitingList } = initSchema(schema);

export {
  WatchList,
  ComicWaitingList,
  ComicWaitingListStatus
};