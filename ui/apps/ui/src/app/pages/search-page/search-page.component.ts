import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter, forkJoin, map, switchMap, tap } from 'rxjs';
import { FetchDataService } from '@collections/services/fetch-data.service';
import { CustomRoute } from '@collections/services/custom-route.service';
import { SearchMetadataRepository } from '@collections/repositories/search-metadata.repository';
import { AdaptersRepository } from '@collections/repositories/adapters.repository';
import {
  ICollectionSearchMetadata,
  IResult,
  ISearchResults,
  adapterType,
} from '@collections/repositories/types';
import { MAX_COLLECTION_RESULTS } from '@components/results-with-pagination/pagination.repository';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import {
  queryChanger,
  queryChangerAdv,
} from '@collections/filters-serializers/utils';
import { ICustomRouteProps } from '@collections/services/custom-route.type';

@UntilDestroy()
@Component({
  selector: 'ess-search-service-page',
  templateUrl: './search-page.component.html',
  styles: [
    `
      #dashboard__main {
        /*min-height: 900px;*/
      }

      .ant-empty {
        margin-top: 50px;
        margin-bottom: 100px;
      }

      .loading-block {
        width: 100%;
        min-height: 300px;
        text-align: center;
        padding: 100px 50px;
      }

      .results:last-child {
        margin-bottom: 100px;
      }

      .filters {
        padding: 0 15px 15px 15px;
      }
      .filter {
        margin-bottom: 10px;
      }
      .filter-title {
        padding-bottom: 6px;
        display: block;
      }
      .ant-tree {
        background: none !important;
      }
      .search-page-container {
        position: relative;
      }

      .feedback-panel {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
      }
    `,
  ],
})
export class SearchPageComponent implements OnInit {
  public showFilters = false;
  public showCollections = false;
  response: ISearchResults<IResult> | null = null;
  public clearAll = false;
  isProviderCollection = false;

  constructor(
    private _customRoute: CustomRoute,
    private _router: Router,
    private _route: ActivatedRoute,
    private _fetchDataService: FetchDataService,
    private _searchMetadataRepository: SearchMetadataRepository,
    private _adaptersRepository: AdaptersRepository
  ) {}

  generatePermutations(words: string[]): string[] {
    const permutations: string[] = [];
    function backtrack(startIndex: number) {
      if (startIndex === words.length - 1) {
        permutations.push(words.join(' '));
        return;
      }

      for (let i = startIndex; i < words.length; i++) {
        [words[startIndex], words[i]] = [words[i], words[startIndex]]; // Swap words
        backtrack(startIndex + 1);
        [words[startIndex], words[i]] = [words[i], words[startIndex]]; // Restore original order
      }
    }

    backtrack(0);
    return permutations;
  }

  ngOnInit() {
    this._customRoute.collection$.subscribe((val) => {
      this.isProviderCollection = val === 'provider';
    });

    combineLatest([
      this._route.paramMap.pipe(map((paramMap) => paramMap.get('collection'))),
      this._route.queryParamMap,
    ])
      .pipe(
        map((params) => params[0]),
        map((collection) =>
          this._customRoute._updateParamsBy(
            collection as string,
            this._router.url
          )
        ),
        filter(({ collection }) => !!collection),
        switchMap((routerParams) => {
          const { collection, q, fq } = routerParams;
          const metadata = this._searchMetadataRepository.get(
            collection
          ) as ICollectionSearchMetadata;
          const adapter = this._adaptersRepository.get(collection)
            ?.adapter as adapterType;
          this.response = null;
          const resultsRequest$ =
            routerParams.standard.toString() === 'true'
              ? this._fetchStandardResults$(routerParams, metadata, adapter)
              : this._fetchAdvancedResults$(routerParams, metadata, adapter);

          return forkJoin({
            response: resultsRequest$,
            filters: this._customRoute.fetchFilters$(
              q,
              fq,
              collection as string
            ),
          });
        }),
        tap(({ response }) => (this.response = response)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private _fetchStandardResults$(
    routerParams: ICustomRouteProps,
    metadata: ICollectionSearchMetadata,
    adapter: adapterType
  ) {
    const searchMetadata = {
      rows: MAX_COLLECTION_RESULTS,
      ...routerParams,
      ...metadata.params,
      exact: routerParams.exact.toString() === 'true' ? 'true' : 'false',
      q: queryChanger(routerParams.q, routerParams.exact.toString() === 'true'),
    };

    return this._fetchDataService.fetchResults$(
      searchMetadata,
      metadata.facets,
      adapter
    );
  }

  private _fetchAdvancedResults$(
    routerParams: ICustomRouteProps,
    metadata: ICollectionSearchMetadata,
    adapter: adapterType
  ) {
    let filters: string[] = [];

    const authors: number[] = [];
    const exacts: number[] = [];
    const titles: number[] = [];
    const keywords: number[] = [];
    const allIndexes: number[] = [];

    const fq_o: string[] = routerParams.fq;
    const radioValueAuthor: string = routerParams.radioValueAuthor;
    const radioValueExact: string = routerParams.radioValueExact;
    const radioValueTitle: string = routerParams.radioValueTitle;
    const radioValueKeyword: string = routerParams.radioValueKeyword;

    if (Array.isArray(routerParams.tags)) {
      for (const tag of routerParams.tags) {
        if (tag.startsWith('author:')) {
          const aut = tag.split(':', 2)[1].trim();
          const splitted = aut.split(' ');
          const query_param: string[] = [];
          splitted.forEach((el: string) => {
            if (el.trim() !== '') {
              query_param.push(el.trim());
            }
          });
          const res_permuted = this.generatePermutations(query_param);
          if (res_permuted.length === 1) {
            filters.push('author_names_tg:"' + res_permuted[0].trim() + '"');
            authors.push(filters.length - 1);
          } else {
            // We need OR case
            let fin = '';
            res_permuted.forEach((el: string) => {
              fin += 'author_names_tg:"' + el.trim() + '"' + ' OR ';
            });
            filters.push(fin.slice(0, fin.length - 4));
            authors.push(filters.length - 1);
          }
        }
        if (tag.startsWith('exact:')) {
          filters.push(
            'title:"' +
              tag.split(':', 2)[1].trim() +
              '" OR author_names_tg:"' +
              tag.split(':', 2)[1].trim() +
              '" OR description:"' +
              tag.split(':', 2)[1].trim() +
              '" OR keywords_tg:"' +
              tag.split(':', 2)[1].trim() +
              '" OR tag_list_tg:"' +
              tag.split(':', 2)[1].trim() +
              '"'
          );
          exacts.push(filters.length - 1);
        }
        if (tag.startsWith('none of:')) {
          filters.push('!title:"' + tag.split(':', 2)[1].trim() + '"');
          filters.push(
            '!author_names_tg:"' + tag.split(':', 2)[1].trim() + '"'
          );
          filters.push('!description:"' + tag.split(':', 2)[1].trim() + '"');
          filters.push('!keywords_tg:"' + tag.split(':', 2)[1].trim() + '"');
          filters.push('!tag_list_tg:"' + tag.split(':', 2)[1].trim() + '"');
        }
        if (tag.startsWith('in title:')) {
          filters.push('title:"' + tag.split(':', 2)[1].trim() + '"');
          titles.push(filters.length - 1);
        }
        if (tag.startsWith('keyword:')) {
          filters.push('keywords_tg:"' + tag.split(':', 2)[1].trim() + '"');
          keywords.push(filters.length - 1);
        }
        if (tag.startsWith('tagged:')) {
          filters.push('tag_list_tg:"' + tag.split(':', 2)[1].trim() + '"');
          keywords.push(filters.length - 1);
        }
      }
    } else {
      const tag: string = routerParams.tags;
      if (tag.startsWith('author:')) {
        const aut = tag.split(':', 2)[1].trim();
        const splitted = aut.split(' ');
        const query_param: string[] = [];
        splitted.forEach((el: string) => {
          if (el.trim() !== '') {
            query_param.push(el.trim());
          }
        });
        const res_permuted = this.generatePermutations(query_param);
        if (res_permuted.length === 1) {
          filters.push('author_names_tg:"' + res_permuted[0].trim() + '"');
          authors.push(filters.length - 1);
        } else {
          // We need OR case
          let fin = '';
          res_permuted.forEach((el: string) => {
            fin += 'author_names_tg:"' + el.trim() + '"' + ' OR ';
          });
          filters.push(fin.slice(0, fin.length - 4));
          authors.push(filters.length - 1);
        }
      }
      if (tag.startsWith('exact:')) {
        filters.push(
          'title:"' +
            tag.split(':', 2)[1].trim() +
            '" OR author_names_tg:"' +
            tag.split(':', 2)[1].trim() +
            '" OR description:"' +
            tag.split(':', 2)[1].trim() +
            '" OR keywords_tg:"' +
            tag.split(':', 2)[1].trim() +
            '" OR tag_list_tg:"' +
            tag.split(':', 2)[1].trim() +
            '"'
        );
        exacts.push(filters.length - 1);
      }
      if (tag.startsWith('none of:')) {
        filters.push('!title:"' + tag.split(':', 2)[1].trim() + '"');
        filters.push('!author_names_tg:"' + tag.split(':', 2)[1].trim() + '"');
        filters.push('!description:"' + tag.split(':', 2)[1].trim() + '"');
        filters.push('!keywords_tg:"' + tag.split(':', 2)[1].trim() + '"');
        filters.push('!tag_list_tg:"' + tag.split(':', 2)[1].trim() + '"');
      }
      if (tag.startsWith('in title:')) {
        filters.push('title:"' + tag.split(':', 2)[1].trim() + '"');
        titles.push(filters.length - 1);
      }
      if (tag.startsWith('keyword:')) {
        filters.push('keywords_tg:"' + tag.split(':', 2)[1].trim() + '"');
        keywords.push(filters.length - 1);
      }
      if (tag.startsWith('tagged:')) {
        filters.push('tag_list_tg:"' + tag.split(':', 2)[1].trim() + '"');
        keywords.push(filters.length - 1);
      }
    }

    if (radioValueAuthor === 'B') {
      let new_aut = '';
      for (const author of authors) {
        new_aut += filters[author] + ' OR ';
        allIndexes.push(author);
      }
      new_aut = new_aut.slice(0, new_aut.length - 4);
      filters.push(new_aut);
    }
    if (radioValueExact === 'B') {
      let new_exc = '';
      for (const exactel of exacts) {
        new_exc += filters[exactel] + ' OR ';
        allIndexes.push(exactel);
      }
      new_exc = new_exc.slice(0, new_exc.length - 4);
      filters.push(new_exc);
    }
    if (radioValueTitle === 'B') {
      let new_title = '';
      for (const exactit of titles) {
        new_title += filters[exactit] + ' OR ';
        allIndexes.push(exactit);
      }
      new_title = new_title.slice(0, new_title.length - 4);
      filters.push(new_title);
    }
    if (radioValueKeyword === 'B') {
      let new_keyword = '';
      for (const keywordel of keywords) {
        new_keyword += filters[keywordel] + ' OR ';
        allIndexes.push(keywordel);
      }
      new_keyword = new_keyword.slice(0, new_keyword.length - 4);
      filters.push(new_keyword);
    }

    filters = filters.filter((value, index) => !allIndexes.includes(index));

    const fq_m = filters.concat(fq_o);

    const searchMetadata = {
      rows: MAX_COLLECTION_RESULTS,
      ...routerParams,
      ...metadata.params,
      exact: routerParams.exact.toString() === 'true' ? 'true' : 'false',
      q: queryChangerAdv(
        routerParams.q,
        routerParams.exact.toString() === 'true'
      ),
      fq: fq_m,
    };
    return this._fetchDataService.fetchResultsAdv$(
      searchMetadata,
      metadata.facets,
      adapter
    );
  }
}
