import { IAdapter, IResult } from '../../repositories/types';
import { URL_PARAM_NAME } from './nav-config.data';
import { IOpenAIREResult } from '../openair.model';
import { COLLECTION } from './search-metadata.data';
import {
  toArray,
  toValueWithLabel,
} from '@collections/filters-serializers/utils';
import { transformLanguages } from '@collections/data/shared-tags';
import {
  constructDoiTag,
  parseStatistics,
  toKeywordsSecondaryTag,
} from '@collections/data/utils';
import { ConfigService } from '../../../services/config.service';
import { formatPublicationDate } from '@collections/data/utils';

export const datasetsAdapter: IAdapter = {
  id: URL_PARAM_NAME,
  adapter: (
    openAIREResult: Partial<IOpenAIREResult> & { id: string }
  ): IResult => ({
    isSortCollectionScopeOff: true,
    isSortByRelevanceCollectionScopeOff: false,
    id: openAIREResult.id,
    title: openAIREResult?.title?.join(' ') || '',
    description: openAIREResult?.description?.join(' ') || '',
    languages: transformLanguages(openAIREResult?.language),
    date: formatPublicationDate(openAIREResult['publication_date']),
    license: openAIREResult?.license,
    documentType: openAIREResult?.document_type,
    url: `${
      ConfigService.config?.eosc_explore_url
    }/search/result?id=${openAIREResult?.id?.split('|')?.pop()}`,
    coloredTags: [],
    tags: [
      {
        label: 'Author name',
        values: toValueWithLabel(toArray(openAIREResult?.author_names)),
        filter: 'author_names',
      },
      {
        label: 'Publisher',
        values: toValueWithLabel(toArray(openAIREResult?.publisher)),
        filter: 'publisher',
      },
      {
        label: 'Scientific domain',
        values: toValueWithLabel(toArray(openAIREResult?.scientific_domains)),
        filter: 'scientific_domains',
      },
      {
        label: 'Identifier',
        values: constructDoiTag(openAIREResult?.doi),
        filter: 'doi',
      },
    ],
    type: {
      label: openAIREResult?.type || '',
      value: openAIREResult?.type || '',
    },
    collection: COLLECTION,
    secondaryTags: [
      // toDownloadsStatisticsSecondaryTag(openAIREResult.usage_counts_downloads),
      // toViewsStatisticsSecondaryTag(openAIREResult.usage_counts_views),
      toKeywordsSecondaryTag(openAIREResult.keywords ?? [], 'keywords'),
    ],
    ...parseStatistics(openAIREResult),
  }),
};
