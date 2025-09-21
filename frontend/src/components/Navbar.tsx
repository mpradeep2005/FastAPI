import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-gray-800">
            Product Management
          </Link>
          <div className="space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
            >
              Products
            </Link>
            <Link
              to="/add"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Add Product
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
