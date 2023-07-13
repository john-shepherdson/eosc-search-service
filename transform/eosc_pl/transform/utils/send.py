"""Send data"""
import requests
from requests.exceptions import ConnectionError as ReqConnectionError
from logging import getLogger
from eosc_pl.transform.utils.config import SOLR_ADDRESS, SOLR_COL_NAME

logger = getLogger(__name__)


def send_json_string_to_solr(
    data: str,
    conf: dict,
) -> None:
    """Send data as a json string to solr"""
    url = f"{conf[SOLR_ADDRESS]}/solr/{conf[SOLR_COL_NAME]}/update?commitWithin=100"
    req_headers = {"Accept": "application/json", "Content-Type": "application/json"}

    try:
        req = requests.post(url, data=data, headers=req_headers, timeout=180)
        if req.status_code == 200:
            logger.info(
                f"Solr update was successful. Collection name={conf[SOLR_COL_NAME]}, status={req.status_code}"
            )
        else:
            logger.error(
                f"Solr update has failed. Collection name={conf[SOLR_COL_NAME]}, status={req.status_code}"
            )
    except ReqConnectionError as e:
        logger.error(
            f"Solr update has failed. Collection name={conf[SOLR_COL_NAME]}, error={e}"
        )
