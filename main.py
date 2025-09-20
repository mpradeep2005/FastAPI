from fastapi import FastAPI
from model import product

app = FastAPI()

@app.get("/")
def welcome():
    return "hi,welcome"

products = [
    product(id=1, product_name="pen", product_description="nice pen", price=5),
    product(id=2, product_name="box", product_description="nice box", price=50),
    product(id=3, product_name="scale", product_description="nice scale", price=15)
            ]

@app.get("/products")
def get_all_products():
    return products

@app.get("/product/{id}")
def get_productby_id(id:int):
    return products[id]

@app.post("/product")
def post_products(product:product):
    products.append(product)
    return product

@app.put("/product/{id}")
def update_products(id:int,product:product):
    for i in range(len(products)):
        if products[i].id==id:
            products[i]=products
            return "updated successfully"
    return "NO products found"

@app.delete("/products")
def delete_products(id:int):
    for i in range(len(products)):
        if products[i].id==id:
            del products[i]
            return "deleted successfully"
    return "No products found"
