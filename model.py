from pydantic import BaseModel
class product(BaseModel):
    id:int
    product_name:str
    product_description: str
    price:int