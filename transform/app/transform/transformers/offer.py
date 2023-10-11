# pylint: disable=line-too-long, wildcard-import, invalid-name, unused-wildcard-import
"""Transform offers"""
from pyspark.sql.functions import split, col, lit
from pyspark.sql import SparkSession, DataFrame
from pyspark.sql.types import (
    StructType,
    StructField,
    StringType,
    BooleanType,
)
from app.transform.transformers.base.base import BaseTransformer
from app.transform.utils.common import map_best_access_right, create_open_access
from app.transform.utils.utils import sort_schema
from app.transform.schemas.properties_name import *

OFFER_IDS_INCREMENTOR = 10_000


class OfferTransformer(BaseTransformer):
    """Transformer used to transform bundles"""

    def __init__(self, spark: SparkSession):
        self.type = "offer"
        self.id_increment = OFFER_IDS_INCREMENTOR

        super().__init__(
            self.type, self.cols_to_add, self.cols_to_drop, self.cols_to_rename, spark
        )

    def apply_simple_trans(self, df: DataFrame) -> DataFrame:
        """Apply simple transformations.
        Simple in a way that there is a possibility to manipulate the main dataframe
        without a need to create another dataframe and merging"""
        df = df.withColumn(TYPE, lit(self.type))
        df = self.rename_cols(df)
        df = self.convert_ids(df, increment=self.id_increment)

        return df

    def apply_complex_trans(self, df: DataFrame) -> DataFrame:
        """Harvest oag properties that requires more complex transformations
        Basically from those harvested properties there will be created another dataframe
        which will be later on merged with the main dataframe"""
        df = map_best_access_right(df, self.harvested_properties, self.type)
        create_open_access(self.harvested_properties)

        return df

    @staticmethod
    def cast_columns(df: DataFrame) -> DataFrame:
        """Cast columns"""
        df = (
            df.withColumn("description", split(col("description"), ","))
            .withColumn("publication_date", col("publication_date").cast("date"))
            .withColumn("updated_at", col("updated_at").cast("date"))
        )
        return df

    @property
    def harvested_schema(self) -> StructType:
        """Schema of harvested properties"""
        return sort_schema(
            StructType(
                [
                    StructField(BEST_ACCESS_RIGHT, StringType(), True),
                    StructField(OPEN_ACCESS, BooleanType(), True),
                ]
            )
        )

    @property
    def cols_to_add(self) -> None:
        """Add those columns to the dataframe"""
        return None

    @property
    def cols_to_drop(self) -> tuple[str, ...]:
        """Drop those columns from the dataframe"""
        return ("parameters",)

    @property
    def cols_to_rename(self) -> dict[str, str]:
        """Columns to rename. Keys are mapped to the values"""
        return {
            "name": "title",
            "order_type": "best_access_right",
        }

    @staticmethod
    def convert_ids(df: DataFrame, increment) -> DataFrame:
        """Increment dataframes IDs.
        Assumption: IDs are ints"""
        return df.withColumn(ID, (col(ID) + increment).cast(StringType()))
