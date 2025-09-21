export interface Product {
  id: number;
  product_name: string;
  product_description: string;
  price: number;
}

export interface CreateProductRequest {
  product_name: string;
  product_description: string;
  price: number;
}

export interface UpdateProductRequest {
  product_name: string;
  product_description: string;
  price: number;
}
