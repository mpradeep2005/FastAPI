import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productApi } from '../services/api';
import { Product } from '../types/product';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ConfirmModal from '../components/ConfirmModal';

const ProductList = () => {
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    product: Product | null;
  }>({ isOpen: false, product: null });

  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: productApi.getAllProducts,
  });

  const deleteProductMutation = useMutation({
    mutationFn: productApi.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setDeleteModal({ isOpen: false, product: null });
    },
  });

  const handleDeleteClick = (product: Product) => {
    setDeleteModal({ isOpen: true, product });
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.product) {
      deleteProductMutation.mutate(deleteModal.product.id);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, product: null });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="Failed to load products. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <Link
          to="/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
        >
          Add New Product
        </Link>
      </div>

      {products && products.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new product.</p>
          <div className="mt-6">
            <Link
              to="/add"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Add Product
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {products?.map((product) => (
              <li key={product.id}>
                <div className="px-4 py-4 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">
                        {product.product_name}
                      </p>
                      <p className="text-sm text-gray-500">${product.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 truncate">
                      {product.product_description}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex space-x-2">
                    <Link
                      to={`/product/${product.id}`}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit/${product.id}`}
                      className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(product)}
                      className="text-red-600 hover:text-red-900 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteModal.product?.product_name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ProductList;
