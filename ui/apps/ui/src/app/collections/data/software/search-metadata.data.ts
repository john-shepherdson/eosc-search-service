import { ICollectionSearchMetadata } from '../../repositories/types';
import { URL_PARAM_NAME } from './nav-config.data';

export const COLLECTION = 'software';
export const softwareSearchMetadata: ICollectionSearchMetadata = {
  id: URL_PARAM_NAME,
  facets: {
    document_type: { field: 'document_type', type: 'terms', limit: 0 },
    best_access_right: { field: 'best_access_right', type: 'terms', limit: 0 },
    language: { field: 'language', type: 'terms', limit: 0 },
    fos: { field: 'fos', type: 'terms', limit: 0 },
    publisher: { field: 'publisher', type: 'terms', limit: 0 },
    funder: { field: 'funder', type: 'terms', limit: 0 },
    sdg: { field: 'sdg', type: 'terms', limit: 0 },
    country: { field: 'country', type: 'terms', limit: 0 },
    source: { field: 'source', type: 'terms', limit: 0 },
    research_community: {
      field: 'research_community',
      type: 'terms',
      limit: 0,
    },
  },
  queryMutator: (q: string) => q,
  params: {
    qf: ['title^50', 'author_names^30', 'description^10'],
    collection: COLLECTION,
  },
};
