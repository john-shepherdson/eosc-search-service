import { IFilterConfig } from '@collections/repositories/types';
import { IActiveFilter } from './type';
import { toArray } from '@collections/filters-serializers/utils';
import { truncate } from 'lodash-es';
import { IFqMap } from '@collections/services/custom-route.type';
import { TREE_SPLIT_CHAR } from '@components/filters/utils';

export const toActiveFilters = (
  fqsMap: IFqMap,
  filtersConfigs: IFilterConfig[]
): IActiveFilter[] => {
  const activeFilters: IActiveFilter[] = [];
  for (const [filter, filterValues] of Object.entries(fqsMap)) {
    const filterConfig = filtersConfigs.find(
      ({ filter: configFilter }) => configFilter === filter
    ) as IFilterConfig;
    for (const value of toArray(filterValues)) {
      activeFilters.push({
        filter,
        value,
        uiValue: truncate((value + '').split(TREE_SPLIT_CHAR).pop() ?? '', {
          length: 50,
        }),
        label: filterConfig.label,
      });
    }
  }
  return activeFilters;
};
