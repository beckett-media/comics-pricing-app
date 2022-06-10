// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { WatchList } = initSchema(schema);

export {
  WatchList
};