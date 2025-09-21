import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { productApi } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '0');

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
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:text-blue-900 text-sm font-medium mb-4"
        >
          ← Back to Products
        </button>
        <h1 className="text-3xl font-bold text-gray-900">{product.product_name}</h1>
        <p className="mt-2 text-sm text-gray-600">Product Details</p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Product Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Details about the product.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Product ID</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {product.id}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Product Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {product.product_name}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {product.product_description}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Price</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <span className="text-2xl font-bold text-green-600">${product.price}</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Products
        </button>
        <button
          onClick={() => navigate(`/edit/${product.id}`)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Edit Product
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
