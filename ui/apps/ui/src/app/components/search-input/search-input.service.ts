import { Injectable } from '@angular/core';
import { AdaptersRepository } from '@collections/repositories/adapters.repository';
import { SearchMetadataRepository } from '@collections/repositories/search-metadata.repository';
import { FetchDataService } from '@collections/services/fetch-data.service';
import { combineLatest, map, of } from 'rxjs';
import {
  ICollectionSearchMetadata,
  adapterType,
} from '@collections/repositories/types';
import { toSuggestedResults } from './utils';

const MAX_COLLECTION_RESULTS = 3; // TODO: Move to env file

@Injectable({
  providedIn: 'root',
})
export class SearchInputService {
  constructor(
    private _adaptersRepository: AdaptersRepository,
    private _searchMetadataRepository: SearchMetadataRepository,
    private _fetchDataService: FetchDataService
  ) {}

  currentSuggestions(q: string, collectionName: string) {
    if (q === '*' || q === '') {
      return of([]);
    }

    const collections: ICollectionSearchMetadata[] =
      collectionName === 'all'
        ? this._searchMetadataRepository.getAll()
        : [this._searchMetadataRepository.get(collectionName)];

    return combineLatest(this._suggestedResultsBy$(q, collections)).pipe(
      map((responses) => responses.filter(({ results }) => results.length > 0)),
      map((responses) => responses.map(toSuggestedResults))
    );
  }

  _suggestedResultsBy$(q: string, collections: ICollectionSearchMetadata[]) {
    return collections.map((metadata) => {
      const searchMetadata = {
        q,
        fq: [],
        rows: MAX_COLLECTION_RESULTS,
        cursor: '*',
        sort: [],
        ...metadata.params,
      };
      const adapter = this._adaptersRepository.get(metadata.id)
        ?.adapter as adapterType;
      return this._fetchDataService
        .fetchResults$(searchMetadata, metadata.facets, adapter)
        .pipe(map((results) => ({ ...results, link: metadata.id })));
    });
  }
}
