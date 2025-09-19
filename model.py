class product:
    id:int
    product_name:str
    product_description: str
    price:int

    def __init__(self,id:int,product_name:str,product_description:str,price:int):
        self.id=id
        self.product_name=product_name
        self.product_description= product_description
        self.price=price