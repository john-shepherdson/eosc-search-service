# pylint: disable=line-too-long, wildcard-import, invalid-name, unused-wildcard-import
"""Transform bundles"""
from pyspark.sql.functions import split
from pyspark.sql import SparkSession
from pyspark.sql.types import StringType, ArrayType, IntegerType
from pyspark.sql.functions import udf
from transform.transformations.common import *
from transform.transformers.base.base import BaseTransformer
from transform.schemas.properties_name import *
from transform.transformers.offer import OFFER_IDS_INCREMENTOR


class BundleTransformer(BaseTransformer):
    """Transformer used to transform bundles"""

    def __init__(self, spark: SparkSession):
        self.type = "bundle"
        self.id_increment = 1_000_000

        super().__init__(
            self.type, self.cols_to_add, self.cols_to_drop, self.cols_to_rename, spark
        )

    def apply_simple_trans(self, df: DataFrame) -> DataFrame:
        """Apply simple transformations.
        Simple in a way that there is a possibility to manipulate the main dataframe
        without a need to create another dataframe and merging"""
        df = df.withColumn(TYPE, lit(self.type))
        df = self.rename_cols(df)
        # Increase bundles IDs to avoid confilicts
        df = self.convert_int_ids(df, columns=(ID,), increment=self.id_increment)
        # Increase offers IDs to match their increased IDs
        df = self.convert_int_ids(
            df, columns=("main_offer_id",), increment=OFFER_IDS_INCREMENTOR
        )
        df = self.convert_arr_ids(
            df, columns=("offer_ids",), increment=OFFER_IDS_INCREMENTOR
        )

        return df

    def apply_complex_trans(self, df: DataFrame) -> DataFrame:
        """Harvest oag properties that requires more complex transformations
        Basically from those harvested properties there will be created another dataframe
        which will be later on merged with the main dataframe"""
        return df

    @staticmethod
    def cast_columns(df: DataFrame) -> DataFrame:
        """Cast columns"""
        df = df.withColumn("description", split(col("description"), ","))
        return df

    @property
    def harvested_schema(self) -> None:
        """Schema of harvested properties"""
        return None

    @property
    def cols_to_add(self) -> None:
        """Add those columns to the dataframe"""
        return None

    @property
    def cols_to_drop(self) -> None:
        """Drop those columns from the dataframe"""
        return None

    @property
    def cols_to_rename(self) -> dict[str, str]:
        """Columns to rename. Keys are mapped to the values"""
        return {
            "name": "title",
            "research_steps": "unified_categories",
            "target_users": "dedicated_for",
        }

    @staticmethod
    def convert_int_ids(
        df: DataFrame, columns: tuple[str, ...], increment: int
    ) -> DataFrame:
        """Convert dataframes IDs that are integers"""
        for column in columns:
            df = df.withColumn(column, (col(column) + increment).cast(StringType()))

        return df

    @staticmethod
    def convert_arr_ids(
        df: DataFrame, columns: tuple[str, ...], increment: int
    ) -> DataFrame:
        """Convert IDs that are array<int>"""
        inc_ids = udf(lambda x: [i + increment for i in x], ArrayType(IntegerType()))

        for column in columns:
            df = df.withColumn(column, inc_ids(column))

        return df
