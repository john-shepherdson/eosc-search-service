"""Define unique columns name"""

UNIQUE_SERVICE_COLUMNS = (
    "abbreviation",
    "access_modes",
    "access_policies_url",
    "access_types",
    "activate_message",
    "categories",
    "certifications",
    "changelog",
    "dedicated_for",
    "funding_bodies",
    "funding_programs",
    "grant_project_names",
    "helpdesk_email",
    "helpdesk_url",
    "last_update",
    "life_cycle_status",
    "maintenance_url",
    "manual_url",
    "multimedia_urls",
    "offers_count",
    "open_source_technologies",
    "order_url",
    "payment_model_url",
    "phase",
    "platforms",
    "pricing_url",
    "privacy_policy_url",
    "project_items_count",
    "providers",
    "rating",
    "related_platforms",
    "resource_geographic_locations",
    "resource_organisation",
    "restrictions",
    "security_contact_email",
    "service_opinion_count",
    "sla_url",
    "slug",
    "standards",
    "status",
    "status_monitoring_url",
    "synchronized_at",
    "tag_list",
    "tagline",
    "terms_of_use_url",
    "training_information_url",
    "trl",
    "updated_at",
    "upstream_id",
    "use_cases_urls",
    "webpage_url",
)
UNIQUE_OAG_AND_TRAINING_COLS = (
    "author_names",
    "author_pids",
    "contactgroup",
    "contactperson",
    "content_type",
    "country",
    "document_type",
    "documentation_url",
    "doi",
    "duration",
    "eosc_provider",
    "fos",
    "funder",
    "keywords",
    "learning_outcomes",
    "level_of_expertise",
    "license",
    "programming_language",
    "publisher",
    "qualification",
    "related_services",
    "relations",
    "relations_long",
    "research_community",
    "resource_type",
    "sdg",
    "size",
    "source",
    "subtitle",
    "target_group",
    "tool",
    "url",
    "usage_counts_downloads",
    "usage_counts_views",
)
UNIQUE_SERVICE_COLS_FOR_DATA_SOURCE = (
    "access_policies_url",
    "activate_message",
    "offers_count",
    "phase",
    "project_items_count",
    "rating",
    "related_platforms",
    "restrictions",
    "service_opinion_count",
    "sla_url",
    "slug",
)
UNIQUE_DATA_SOURCE_COLS_FOR_SERVICE = (
    "datasource_classification",
    "jurisdiction",
    "link_research_product_metadata_license_urls",
    "persistent_identity_systems_entity_type",
    "persistent_identity_systems_entity_type_schemes",
    "preservation_policy_url",
    "research_entity_types",
    "research_product_access_policies",
    "research_product_licensing_urls",
    "research_product_metadata_access_policies",
    "resource_level_url",
    "submission_policy_url",
    "thematic",
    "version_control",
)
UNIQUE_GUIDELINES_COLS = (
    "author_types",
    "domain",
    "eosc_guideline_type",
    "eosc_integration_options",
    "eosc_related_standards",
    "publication_year",
    "right_id",
    "right_title",
    "right_uri",
    "type_info",
)
