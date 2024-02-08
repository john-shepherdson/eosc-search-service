import { IFiltersConfig } from '../../repositories/types';
import { URL_PARAM_NAME } from './nav-config.data';
import { transformCatalogueNames } from '@collections/data/utils';
import { INTEROPERABILITY_PATTERNS_TOOLTIP_TEXT } from '@collections/data/config';

export const bundlesFilters: IFiltersConfig = {
  id: URL_PARAM_NAME,
  filters: [
    {
      id: 'unified_categories',
      filter: 'unified_categories',
      label: 'Research steps',
      type: 'multiselect',
      defaultCollapsed: false,
      tooltipText: '',
      expandArrow: true,
    },
    {
      id: 'best_access_right',
      filter: 'best_access_right',
      label: 'Access right',
      type: 'multiselect',
      defaultCollapsed: false,
      tooltipText: '',
      expandArrow: true,
    },
    {
      id: 'scientific_domains',
      filter: 'scientific_domains',
      label: 'Scientific domain',
      type: 'multiselect',
      defaultCollapsed: false,
      tooltipText: '',
      expandArrow: true,
    },
    {
      id: 'scientific_domains',
      filter: 'scientific_domains',
      label: 'Scientific domain',
      type: 'multiselect',
      defaultCollapsed: false,
      tooltipText: '',
    },
    {
      id: 'dedicated_for',
      filter: 'dedicated_for',
      label: 'Dedicated for',
      type: 'multiselect',
      defaultCollapsed: false,
      tooltipText: '',
      expandArrow: true,
    },
    {
      id: 'providers',
      filter: 'providers',
      label: 'Provider',
      type: 'multiselect',
      defaultCollapsed: false,
      tooltipText: '',
      expandArrow: true,
    },
    {
      id: 'resource_organisation',
      filter: 'resource_organisation',
      label: 'Resource Organisation',
      type: 'multiselect',
      defaultCollapsed: false,
      tooltipText: '',
      expandArrow: true,
    },
    {
      id: 'eosc_if',
      filter: 'eosc_if',
      label: 'Interoperability pattern',
      type: 'multiselect',
      defaultCollapsed: false,
      tooltipText: INTEROPERABILITY_PATTERNS_TOOLTIP_TEXT,
      expandArrow: true,
    },
    {
      id: 'language',
      filter: 'language',
      label: 'Language',
      type: 'multiselect',
      defaultCollapsed: false,
      tooltipText: '',
      expandArrow: true,
    },
    {
      id: 'bundle_goals',
      filter: 'bundle_goals',
      label: 'Bundle goal',
      type: 'multiselect',
      defaultCollapsed: false,
      tooltipText: '',
      expandArrow: true,
    },
    {
      id: 'capabilities_of_goals',
      filter: 'capabilities_of_goals',
      label: 'Capabilities of goal',
      type: 'multiselect',
      defaultCollapsed: false,
      tooltipText: '',
      expandArrow: true,
    },
    {
      id: 'catalogue',
      filter: 'catalogue',
      label: 'Community Catalog',
      type: 'dropdown',
      defaultCollapsed: false,
      tooltipText: '',
      global: true,
      transformNodes: transformCatalogueNames,
    },
    {
      id: 'eosc_if',
      filter: 'eosc_if',
      label: 'Interoperability pattern',
      type: 'tag',
      defaultCollapsed: false,
      tooltipText: '',
    },
  ],
};
