"""Environment variables and constants"""

SERVICE = "service"
DATASOURCE = "data source"
PROVIDER = "provider"
OFFER = "offer"
BUNDLE = "bundle"
GUIDELINE = "interoperability guideline"
TRAINING = "training"
OTHER_RP = "other"
SOFTWARE = "software"
DATASET = "dataset"
PUBLICATION = "publication"
ORGANISATION = "organisation"
PROJECT = "project"

DATASET_PATH = "DATASET_PATH"
PUBLICATION_PATH = "PUBLICATION_PATH"
SOFTWARE_PATH = "SOFTWARE_PATH"
OTHER_RP_PATH = "OTHER_RP_PATH"
ORGANISATION_PATH = "ORGANISATION_PATH"
PROJECT_PATH = "PROJECT_PATH"

MP_API_ADDRESS = "MP_API_ADDRESS"
MP_API_TOKEN = "MP_API_TOKEN"
GUIDELINE_ADDRESS = "GUIDELINE_ADDRESS"
TRAINING_ADDRESS = "TRAINING_ADDRESS"

INPUT_FORMAT = "INPUT_FORMAT"
OUTPUT_FORMAT = "OUTPUT_FORMAT"
OUTPUT_PATH = "OUTPUT_PATH"
OUTPUT_SCHEMA = "OUTPUT_SCHEMA"
INPUT_SCHEMA = "INPUT_SCHEMA"

SEND_TO_SOLR = "SEND_TO_SOLR"
SOLR_ADDRESS = "SOLR_ADDRESS"
SOLR_PORT = "SOLR_PORT"
SOLR_DATASET_COLS = "SOLR_DATASET_COLS"
SOLR_PUBLICATION_COLS = "SOLR_PUBLICATION_COLS"
SOLR_SOFTWARE_COLS = "SOLR_SOFTWARE_COLS"
SOLR_OTHER_RP_COLS = "SOLR_OTHER_RP_COLS"
SOLR_TRAINING_COLS = "SOLR_TRAINING_COLS"
SOLR_SERVICE_COLS = "SOLR_SERVICE_COLS"
SOLR_DATASOURCE_COLS = "SOLR_DATASOURCE_COLS"
SOLR_PROVIDER_COLS = "SOLR_PROVIDER_COLS"
SOLR_GUIDELINE_COLS = "SOLR_GUIDELINE_COLS"
SOLR_OFFER_COLS = "SOLR_OFFER_COLS"
SOLR_BUNDLE_COLS = "SOLR_BUNDLE_COLS"
SOLR_ORGANISATION_COLS = "SOLR_ORGANISATION_COLS"
SOLR_PROJECT_COLS = "SOLR_PROJECT_COLS"

SOLR_COLLECTION_NAMES = [
    "all_collection",
    "dataset",
    "publication",
    "software",
    "other_rp",
    "training",
    "service",
    "data_source",
    "guideline",
    "offer",
    "bundle",
    "provider",
]

SEND_TO_S3 = "SEND_TO_S3"
S3_ACCESS_KEY = "S3_ACCESS_KEY"
S3_SECRET_KEY = "S3_SECRET_KEY"
S3_ENDPOINT = "S3_ENDPOINT"
S3_BUCKET = "S3_BUCKET"
S3_CLIENT = "S3_CLIENT"
S3_DUMP_NAME = "S3_DUMP_NAME"

CREATE_LOCAL_DUMP = "CREATE_LOCAL_DUMP"
LOCAL_DUMP_PATH = "LOCAL_DUMP_PATH"

ALL_COLLECTION = "ALL_COLLECTION"
SOLR_COL_NAMES = "SOLR_COL_NAMES"
PATH = "PATH"
ADDRESS = "ADDRESS"
