import { SolrQueryParams } from '../search-service/solr-query-params.interface';
import { IFacetParam } from '../search-service/facet-param.interface';
import { calcHash } from '../search-service/utils';
import { IResult } from '../result/result.model';

export class CollectionSearchMetadata<T> {
  public _hash: string;
  public params: SolrQueryParams;
  public facets: { [facet: string]: IFacetParam };
  public inputAdapter: (item: Partial<T>) => IResult;
  public fieldToFilter: { [field: string]: string };
  public filterToField: { [filter: string]: string };
  public type: string;

  // search results
  public hasNext = true;
  public maxResults = 0;
  public currentPage = 0;
  public maxPage = 0;

  constructor(
    params: SolrQueryParams,
    facets: { [facet: string]: IFacetParam },
    inputAdapter: (item: Partial<T>) => IResult,
    fieldToFilter: { [field: string]: string },
    filterToField: { [field: string]: string },
    type: string
  ) {
    this.params = params;
    this.facets = facets;
    this.inputAdapter = inputAdapter;
    this.fieldToFilter = fieldToFilter;
    this.filterToField = filterToField;
    this.type = type;
    this._hash = calcHash(params, facets);
  }

  set q(q: string) {
    this.params.q = q === '*' ? '*' : q + '*';
  }
}
