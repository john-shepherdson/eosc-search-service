/* eslint-disable @typescript-eslint/no-explicit-any  */
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFacetResponse, ISearchResults } from './search-results.interface';
import {
  BehaviorSubject,
  catchError,
  forkJoin,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';
import { CollectionSearchMetadata } from '../../collections/collection.model';
import { IResult } from '../../result.model';
import { shuffleArray } from './utils';
import { CommonSettings, ESS_SETTINGS } from '@eosc-search-service/common';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  hasNextPage$ = new BehaviorSubject(true);
  maxResultsNumber$ = new BehaviorSubject(0);
  filters$ = new BehaviorSubject<
    [CollectionSearchMetadata<any>, { [facetName: string]: IFacetResponse }][]
  >([]);

  protected _collections$ = new BehaviorSubject<
    CollectionSearchMetadata<any>[]
  >([]);
  protected _URL: string;
  constructor(
    private _http: HttpClient,
    @Inject(ESS_SETTINGS) private settings: CommonSettings
  ) {
    this._URL = `/${this.settings.backendApiPath}/${this.settings.search.apiPath}`;
  }

  get$<T>(
    ...collectionsMetadata: CollectionSearchMetadata<any>[]
  ): Observable<IResult[]> {
    if (collectionsMetadata.length === 0) {
      return of([])
    }

    return forkJoin(
      collectionsMetadata.map((metadata) => {
        metadata.params.cursor = '*';
        return this._get$<T>(metadata);
      })
    ).pipe(
      // update max results
      tap((allResults: ISearchResults<T>[]) =>
        this.maxResultsNumber$.next(
          allResults
            .map(({ numFound }) => numFound)
            .reduce((acc, size) => acc + size, 0)
        )
      ),
      // update search information
      tap((allResults) => {
        allResults.forEach((result, index) => {
          const collection = collectionsMetadata[index];
          collection.params.cursor = result.nextCursorMark;
          collection.maxResults = result.numFound;
          collection.maxPage = Math.ceil(
            result.numFound / collection.params.rows
          );
          collection.hasNext = collection.currentPage < collection.maxPage;
        });
        this.hasNextPage$.next(
          collectionsMetadata.some((collection) => collection.hasNext)
        );
        this._collections$.next(collectionsMetadata);
      }),
      tap((allResults) => {
        this.filters$.next(
          allResults.map((result, index) => [
            collectionsMetadata[index],
            result.facets,
          ])
        );
      }),
      // return merged data
      map((allResults: ISearchResults<T>[]) =>
        allResults
          .map((results, index) =>
            results.results.map(collectionsMetadata[index].inputAdapter)
          )
          .reduce((acc, results) => [...acc, ...results], [])
      ),
      map((results) =>
        collectionsMetadata.length > 1 ? shuffleArray(results) : results
      )
    );
  }
  async nextPage$<T>(): Promise<IResult[]> {
    const collectionsWithNextPage = this._collections$
      .getValue()
      .filter((collection) => collection.hasNext);
    return (
      (await forkJoin(
        collectionsWithNextPage.map((collection) => this._get$<T>(collection))
      )
        .pipe(
          // update search information
          tap((allResults: ISearchResults<T>[]) => {
            allResults.forEach((result, index) => {
              const collection = collectionsWithNextPage[index];
              collection.params.cursor = result.nextCursorMark;
              collection.maxResults = result.numFound;
              collection.maxPage = Math.ceil(
                result.numFound / collection.params.rows
              );
              collection.hasNext = collection.currentPage < collection.maxPage;
            });
            this.hasNextPage$.next(
              collectionsWithNextPage.some((collection) => collection.hasNext)
            );
          }),
          // return merged data
          map((allResults: ISearchResults<T>[]) =>
            allResults
              .map((results, index) =>
                results.results.map(collectionsWithNextPage[index].inputAdapter)
              )
              .reduce((acc, results) => [...acc, ...results], [])
          ),
          map((results) =>
            collectionsWithNextPage.length > 1 ? shuffleArray(results) : results
          )
        )
        .toPromise()) || []
    );
  }

  _get$<T>(collectionSearchMetadata: CollectionSearchMetadata<any>) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { facets, params, ...rest } = collectionSearchMetadata;
    return this._http
      .post<ISearchResults<T>>(
        this._URL,
        { facets },
        { params: params.toJson() }
      )
      .pipe(
        catchError(() =>
          of({
            results: [],
            numFound: 0,
            nextCursorMark: '',
            facets: {},
          } as ISearchResults<T>)
        )
      );
  }
}
