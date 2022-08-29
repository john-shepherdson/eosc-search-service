import {
  IAdapter,
  ICollectionNavConfig,
  ICollectionSearchMetadata,
  IFiltersConfig,
} from '@collections/repositories/types';
import { differenceWith, isEqual, pull } from 'lodash-es';

export const validateCollections = (
  adapters: IAdapter[],
  filters: IFiltersConfig[],
  navConfigs: ICollectionNavConfig[],
  searchMetadata: ICollectionSearchMetadata[]
): void => {
  _validateComponentsIntegrity(adapters, filters, navConfigs, searchMetadata);
  _validateFiltersConsistency(searchMetadata, filters, adapters);
  _validateCollectionsConsistency(searchMetadata, adapters);
  _validateLabelsConsistency(adapters, navConfigs);
};

// PRIVATE
export const _validateComponentsIntegrity = (
  adapters: IAdapter[],
  filters: IFiltersConfig[],
  navConfigs: ICollectionNavConfig[],
  searchMetadata: ICollectionSearchMetadata[]
): void => {
  const adaptersUniqueIds = [...new Set(adapters.map(({ id }) => id))];
  const filtersUniqueIds = [...new Set(filters.map(({ id }) => id))];
  const navConfigsUniqueIds = [...new Set(navConfigs.map(({ id }) => id))];
  const searchMetadataUniqueIds = [
    ...new Set(searchMetadata.map(({ id }) => id)),
  ];

  const allUniqueIds = [
    ...new Set([
      ...adaptersUniqueIds,
      ...filtersUniqueIds,
      ...navConfigsUniqueIds,
      ...searchMetadataUniqueIds,
    ]),
  ];

  const urlPaths = navConfigs.map(({ urlParam }) => urlParam);
  if (!isEqual(urlPaths, allUniqueIds)) {
    const missingUrlPaths = differenceWith(
      allUniqueIds,
      adaptersUniqueIds,
      isEqual
    );
    throw Error(
      `[COLLECTIONS VALIDATION]: Collections components ids needs to be application url param, for: ${missingUrlPaths}`
    );
  }

  if (!isEqual(adaptersUniqueIds, allUniqueIds)) {
    const missingAdapters = differenceWith(
      allUniqueIds,
      adaptersUniqueIds,
      isEqual
    );
    throw Error(
      `[COLLECTIONS VALIDATION]: There are missing adapters, for: ${missingAdapters}`
    );
  }
  if (!isEqual(filtersUniqueIds, allUniqueIds)) {
    const missingFilters = differenceWith(
      allUniqueIds,
      filtersUniqueIds,
      isEqual
    );
    throw Error(
      `[COLLECTIONS VALIDATION]: There are missing filters, for: ${missingFilters}`
    );
  }
  if (!isEqual(navConfigsUniqueIds, allUniqueIds)) {
    const missingNavConfigs = differenceWith(
      allUniqueIds,
      navConfigsUniqueIds,
      isEqual
    );
    throw Error(
      `[COLLECTIONS VALIDATION]: There are missing navConfigs, for: ${missingNavConfigs}`
    );
  }
  if (!isEqual(searchMetadataUniqueIds, allUniqueIds)) {
    const missingSearchMetadata = differenceWith(
      allUniqueIds,
      searchMetadataUniqueIds,
      isEqual
    );
    throw Error(
      `[COLLECTIONS VALIDATION]: There are missing adapters, for: ${missingSearchMetadata}`
    );
  }

  // eslint-disable-next-line no-restricted-syntax
  console.info(
    '[COLLECTIONS VALIDATION]: All collections components are full-filled.'
  );
};

export const _validateFiltersConsistency = (
  searchMetadata: ICollectionSearchMetadata[],
  filters: IFiltersConfig[],
  adapters: IAdapter[]
): void => {
  searchMetadata.forEach(({ id: metadataId, facets }) => {
    const collectionFilters = filters.find(
      ({ id: filterId }) => filterId === metadataId
    ) as IFiltersConfig;
    const filtersNames = collectionFilters.filters.map(({ filter }) => filter);
    const facetsNames = Object.keys(facets);

    const adapter = adapters.find(
      ({ id: adapterId }) => metadataId === adapterId
    ) as IAdapter;
    const adapterFilters = adapter
      .adapter({ id: '' })
      .tags.map(({ filter: tagFilter }) => tagFilter);

    const missingFilters = differenceWith(
      adapterFilters,
      filtersNames,
      isEqual
    );
    if (missingFilters.length > 0) {
      throw Error(
        `[COLLECTIONS VALIDATION]: Missing filters configurations: ${missingFilters}, for: ${metadataId}`
      );
    }

    const missingFacets = differenceWith(
      pull(filtersNames, ...adapterFilters),
      facetsNames,
      isEqual
    );
    if (missingFacets.length > 0) {
      throw Error(
        `[COLLECTIONS VALIDATION]: Missing facets: ${missingFacets}, for: ${metadataId} search metadata`
      );
    }
  });

  // eslint-disable-next-line no-restricted-syntax
  console.info(
    '[COLLECTIONS VALIDATION]: Facets and filters have the same fields.'
  );
};

export const _validateCollectionsConsistency = (
  searchMetadata: ICollectionSearchMetadata[],
  adapters: IAdapter[]
) => {
  searchMetadata.forEach(({ id, params: { collection } }) => {
    const adapter = adapters.find(
      ({ id: adapterId }) => adapterId === id
    ) as IAdapter;
    const adapterCollection = adapter.adapter({ id: '' }).collection;
    if (adapterCollection !== collection) {
      throw Error(
        `[COLLECTIONS VALIDATION]: Adapter and search metadata have different collections: ${adapterCollection} !== ${collection}, for: ${id}`
      );
    }
  });

  // eslint-disable-next-line no-restricted-syntax
  console.info(
    '[COLLECTIONS VALIDATION]: Search metadata and adapters have the same collection.'
  );
};

export const _validateLabelsConsistency = (
  adapters: IAdapter[],
  navConfigs: ICollectionNavConfig[]
) => {
  navConfigs.forEach(({ id, title, breadcrumbs }) => {
    const lastBreadcrumb = breadcrumbs.slice(-1)[0];
    if (title !== lastBreadcrumb.label) {
      throw Error(
        `[COLLECTIONS VALIDATION]: Nav config (${id}) have different labels for title (${title}) and last breadcrumb (${lastBreadcrumb.label}).`
      );
    }

    const adapter = adapters.find(
      ({ id: adapterId }) => adapterId === id
    ) as IAdapter;
    const adapterType = adapter.adapter({ id: '' }).type;
    if (title !== adapterType) {
      throw Error(
        `[COLLECTIONS VALIDATION]: Nav config (${id}) have different label for title (${title}) and adapter type (${adapterType}).`
      );
    }
  });
};
