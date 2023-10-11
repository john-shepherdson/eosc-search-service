import { ICollectionSearchMetadata } from '../../repositories/types';
import { URL_PARAM_NAME } from './nav-config.data';
import { DEFAULT_FACET, DEFAULT_QF } from '@collections/data/config';

export const COLLECTION = 'all_collection';
export const allCollectionsSearchMetadata: ICollectionSearchMetadata = {
  id: URL_PARAM_NAME,
  facets: DEFAULT_FACET,
  params: {
    qf: DEFAULT_QF,
    collection: COLLECTION,
  },
};
