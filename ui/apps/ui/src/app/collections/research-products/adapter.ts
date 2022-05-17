import { IArticle } from './research-products.model';
import { IResult } from '../../result/result.model';

export const researchProductToResult = (
  publication: Partial<IArticle>,
  typeUrlPath: string,
  collection: string
): IResult => ({
  title: publication?.title?.join(' ') || '',
  description: publication?.description?.join(' ') || '',
  'Published (date)': publication?.published?.pop() || '',
  'Author names': publication.author_names || [],
  'Access right': publication?.bestaccessright?.pop() || '',
  type: 'Research products',
  typeUrlPath,
  collection,
  url: '',
  fieldToFilter: fieldToResearchProductFilter,
  fieldsToTags: ['Author names', 'Published (date)', 'Access right'],
});

export const fieldToResearchProductFilter = {
  'Author names': 'author_names',
  'Published (date)': 'published',
  'Access right': 'bestaccessright',
  Provider: 'publisher',
};

export const researchProductFilterToField = {
  publisher: 'Provider',
  subject: 'Scientific domain',
  author_names: 'Author names',
  bestaccessright: 'Access right',
  published: 'Published (date)',
};
