from fastapi import FastAPI
from model import product

app = FastAPI()

@app.get("/")
def welcome():
    return "hi,welcome"

products = [product(id=1, product_name="pen", product_description="nice pen", price=500)]

@app.get("/products")
def get_all_products():
    return products
