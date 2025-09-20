from sqlalchemy import Column, String, Float, Integer
from sqlalchemy.ext.declarative import declarative_base
Base=declarative_base()
class Product(Base):
    __tablename__="product"
    id=Column(Integer,primary_key=True,index=True)
    product_name=Column(String)
    product_description=Column(String)
    price=Column(Integer)