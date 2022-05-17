import { SolrQueryParams } from '../../search-service/solr-query-params.interface';
import { CollectionSearchMetadata } from '../collection.model';
import { PUBLICATIONS_FACETS } from '../../search-service/facet-param.interface';
import {
  fieldToResearchProductFilter,
  researchProductFilterToField,
  researchProductToResult,
} from './adapter';
import { IArticle } from './research-products.model';

export const researchProductsCollection = new CollectionSearchMetadata(
  new SolrQueryParams({
    qf: ['title', 'author_names', 'publisher', 'bestaccessright', 'published'],
    collection: 'oag_researchoutcomes_prod_20211208_v2',
  }),
  PUBLICATIONS_FACETS,
  (item: Partial<IArticle>) =>
    researchProductToResult(
      item,
      'research-products',
      'oag_researchoutcomes_prod_20211208_v2'
    ),
  fieldToResearchProductFilter,
  researchProductFilterToField,
  'Research Product'
);
