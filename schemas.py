from pydantic import BaseModel

class ProductBase(BaseModel):
    product_name: str
    product_description: str | None = None
    price: float

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True
