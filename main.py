from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

import model_database
from database_setup import engine, session_local
from model_database import Base, Product
from model import ProductSchema

Base.metadata.create_all(bind=engine)# create tables


sample_products = [                    # sample products to initialize DB
    Product(id=1, product_name="pen", product_description="nice pen", price=5),
    Product(id=2, product_name="box", product_description="nice box", price=50),
    Product(id=3, product_name="scale", product_description="nice scale", price=15)
]



@asynccontextmanager
async def life_span(_: FastAPI):                     # Lifespan for startup and shutdown
    db: Session = session_local()
    try:
        if db.query(model_database.Product).count() == 0:
            db.add_all(sample_products)
            db.commit()
            print("Database initialized with sample products.")
        yield
    finally:
        db.close()
        print("Database session closed.")


app = FastAPI(lifespan=life_span)

def get_db():                       # Dependency to get DB session
    db: Session = session_local()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def welcome():
    return "Hi, welcome!"

@app.get("/products")
def get_all_products(db: Session = Depends(get_db)):
    return db.query(Product).all()

@app.get("/product/{product_id}")
def get_product_by_id(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@app.post("/product")
def create_product(product: ProductSchema, db: Session = Depends(get_db)):
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


@app.put("/product/{product_id}")
def update_product(product_id: int, updated_product: ProductSchema, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    db_product.product_name = updated_product.product_name
    db_product.product_description = updated_product.product_description
    db_product.price = updated_product.price

    db.commit()
    db.refresh(db_product)
    return db_product

@app.delete("/product/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(db_product)
    db.commit()
    return {"message": "Product deleted successfully"}