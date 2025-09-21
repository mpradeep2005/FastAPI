import axios from 'axios';
import { Product, CreateProductRequest, UpdateProductRequest } from '../types/product';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productApi = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
  },

  // Get product by ID
  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get(`/product/${id}`);
    return response.data;
  },

  // Create new product
  createProduct: async (product: CreateProductRequest): Promise<Product> => {
    const response = await api.post('/product', product);
    return response.data;
  },

  // Update product
  updateProduct: async (id: number, product: UpdateProductRequest): Promise<Product> => {
    const response = await api.put(`/product/${id}`, product);
    return response.data;
  },

  // Delete product
  deleteProduct: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/product/${id}`);
    return response.data;
  },
};

export default api;
