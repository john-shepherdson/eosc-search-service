import { IAdapter, IResult } from '../../repositories/types';
import { IOpenAIREResult } from '../openair.model';
import { COLLECTION } from './search-metadata.data';
import { URL_PARAM_NAME } from './nav-config.data';
import {
  toArray,
  toValueWithLabel,
} from '@collections/filters-serializers/utils';
import {
  toAccessRightColoredTag,
  transformLanguages,
} from '@collections/data/shared-tags';
import {
  constructDoiTag,
  parseStatistics,
  toKeywordsSecondaryTag,
} from '@collections/data/utils';
import { ConfigService } from '../../../services/config.service';
import { formatPublicationDate } from '@collections/data/utils';

export const softwareAdapter: IAdapter = {
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
    license: openAIREResult?.license,
    date: formatPublicationDate(openAIREResult['publication_date']),
    url: `${
      ConfigService.config?.eosc_explore_url
    }/search/result?id=${openAIREResult?.id?.split('|')?.pop()}`,
    coloredTags: [toAccessRightColoredTag(openAIREResult?.best_access_right)],
    tags: [
      {
        label: 'Author name',
        values: toValueWithLabel(toArray(openAIREResult?.author_names)),
        filter: 'author_names',
      },
      {
        label: 'Identifier',
        values: constructDoiTag(openAIREResult?.doi),
        filter: 'doi',
      },
      {
        label: 'Field of Science',
        values: toValueWithLabel(toArray(openAIREResult?.fos)),
        filter: 'fos',
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
