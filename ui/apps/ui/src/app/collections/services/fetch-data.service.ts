import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  IFacetParam,
  IFacetResponse,
  IResult,
  ISearchResults,
  ISolrCollectionParams,
  ISolrQueryParams,
  adapterType,
} from '../repositories/types';
import { environment } from '@environment/environment';
import { _EMPTY_RESPONSE } from '../repositories/initial-states';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  _url = `/${environment.backendApiPath}/${environment.search.apiPath}`;

  constructor(private _http: HttpClient) {}

  fetchResults$<T extends { id: string }>(
    params: ISolrCollectionParams & ISolrQueryParams,
    facets: { [field: string]: IFacetParam },
    adapter: adapterType
  ): Observable<ISearchResults<IResult>> {
    return this._http
      .post<ISearchResults<T>>(
        this._url,
        { facets },
        { params: params as never }
      )
      .pipe(
        catchError(() => of(_EMPTY_RESPONSE)),
        map((response: ISearchResults<T>) => ({
          results: response.results.map((result) => adapter(result)),
          numFound: response.numFound,
          nextCursorMark: response.nextCursorMark,
          facets: response.facets,
          highlighting: response.highlighting,
        }))
      );
  }

  fetchFacets$<T extends { id: string }>(
    params: ISolrCollectionParams & ISolrQueryParams,
    facets: { [field: string]: IFacetParam }
  ): Observable<{ [field: string]: IFacetResponse }> {
    return this._http
      .post<ISearchResults<T>>(
        this._url,
        { facets },
        { params: params as never }
      )
      .pipe(
        catchError(() => of(_EMPTY_RESPONSE)),
        map((results: ISearchResults<T>) => results.facets)
      );
  }
}
