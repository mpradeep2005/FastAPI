from contextlib import asynccontextmanager
from typing import List

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import model_database
import schemas
from database_setup import engine, session_local

model_database.Base.metadata.create_all(bind=engine)


sample_products = [
    model_database.Product(product_name="pen", product_description="nice pen", price=5),
    model_database.Product(product_name="box", product_description="nice box", price=50),
    model_database.Product(product_name="scale", product_description="nice scale", price=15)
]

@asynccontextmanager
async def life_span(_: FastAPI):
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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_credentials=True,
    allow_headers=["*"]
)


# Dependency to get DB
def get_db():
    db: Session = session_local()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def welcome():
    return "Hi, welcome!"


@app.get("/products", response_model=List[schemas.Product])
def get_all_products(db: Session = Depends(get_db)):
    products = db.query(model_database.Product).all()
    return products


@app.get("/product/{product_id}", response_model=schemas.Product)
def get_product_by_id(product_id: int, db: Session = Depends(get_db)):
    product = db.query(model_database.Product).filter(model_database.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@app.post("/product", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(get_db)):
    db_product = model_database.Product(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


@app.put("/product/{product_id}", response_model=schemas.Product)
def update_product(product_id: int, updated_product: schemas.ProductCreate, db: Session = Depends(get_db)):
    db_product = db.query(model_database.Product).filter(model_database.Product.id == product_id).first()
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
    db_product = db.query(model_database.Product).filter(model_database.Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(db_product)
    db.commit()
    return {"message": "Product deleted successfully"}
