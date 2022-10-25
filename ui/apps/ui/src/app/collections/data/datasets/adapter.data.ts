import { IAdapter, IResult } from '../../repositories/types';
import { URL_PARAM_NAME } from './nav-config.data';
import { IOpenAIREResult } from '../openair.model';
import { COLLECTION } from './search-metadata.data';
import moment from 'moment';

export const datasetsAdapter: IAdapter = {
  id: URL_PARAM_NAME,
  adapter: (
    openAIREResult: Partial<IOpenAIREResult> & { id: string }
  ): IResult => ({
    id: openAIREResult.id,
    title: openAIREResult?.title?.join(' ') || '',
    description: openAIREResult?.description?.join(' ') || '',
    date: openAIREResult['publication_date']
      ? moment(openAIREResult['publication_date']).format('DD MMMM YYYY')
      : '',
    url: `https://explore.eosc-portal.eu/search/result?id=${openAIREResult?.id
      ?.split('|')
      ?.pop()}`,
    coloredTag: [
      {
        value: openAIREResult?.best_access_right || '',
        filter: 'best_access_right',
        colorClassName: (openAIREResult?.best_access_right || '').match(
          /open(.access)?/gi
        )
          ? 'tag-light-green'
          : 'tag-light-coral',
      },
      {
        colorClassName: 'tag-almond',
        value: openAIREResult['license'] || [],
        filter: 'license',
      },
      {
        colorClassName: 'tag-peach',
        filter: 'language',
        value: openAIREResult?.language || [],
      },
    ],
    tags: [
      {
        label: 'Author names',
        value: openAIREResult?.author_names || [],
        filter: 'author_names',
      },
      {
        label: 'Field of science',
        value: openAIREResult?.fos || [],
        filter: 'fos',
      },
      {
        label: 'DOI',
        value: openAIREResult?.doi || [],
        filter: 'doi',
      },
    ],
    type: openAIREResult?.type || '',
    collection: COLLECTION,
  }),
};
