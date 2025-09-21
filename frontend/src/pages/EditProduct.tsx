import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { productApi } from '../services/api';
import { UpdateProductRequest } from '../types/product';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '0');

  const [formData, setFormData] = useState<UpdateProductRequest>({
    product_name: '',
    product_description: '',
    price: 0,
  });
  const [errors, setErrors] = useState<Partial<UpdateProductRequest>>({});

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => productApi.getProductById(productId),
    enabled: !!productId,
  });

  const updateProductMutation = useMutation({
    mutationFn: (data: UpdateProductRequest) => productApi.updateProduct(productId, data),
    onSuccess: () => {
      navigate('/');
    },
    onError: (error: any) => {
      console.error('Error updating product:', error);
    },
  });

  useEffect(() => {
    if (product) {
      setFormData({
        product_name: product.product_name,
        product_description: product.product_description,
        price: product.price,
      });
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof UpdateProductRequest]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UpdateProductRequest> = {};

    if (!formData.product_name.trim()) {
      newErrors.product_name = 'Product name is required';
    }

    if (!formData.product_description.trim()) {
      newErrors.product_description = 'Product description is required';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      updateProductMutation.mutate(formData);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="Failed to load product. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-sm font-medium text-gray-900">Product not found</h3>
        <p className="mt-1 text-sm text-gray-500">The product you're looking for doesn't exist.</p>
        <div className="mt-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
        <p className="mt-2 text-sm text-gray-600">
          Update the product information below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="product_name" className="block text-sm font-medium text-gray-700">
            Product Name *
          </label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={formData.product_name}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              errors.product_name ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter product name"
          />
          {errors.product_name && (
            <p className="mt-1 text-sm text-red-600">{errors.product_name}</p>
          )}
        </div>

        <div>
          <label htmlFor="product_description" className="block text-sm font-medium text-gray-700">
            Product Description *
          </label>
          <textarea
            id="product_description"
            name="product_description"
            rows={4}
            value={formData.product_description}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              errors.product_description ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter product description"
          />
          {errors.product_description && (
            <p className="mt-1 text-sm text-red-600">{errors.product_description}</p>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
              errors.price ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter price"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updateProductMutation.isPending}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updateProductMutation.isPending ? 'Updating...' : 'Update Product'}
          </button>
        </div>
      </form>

      {updateProductMutation.isError && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Failed to update product. Please try again.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
