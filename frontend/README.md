# Product Management Frontend

A React frontend application for managing products, built with TypeScript, Vite, and Tailwind CSS.

## Features

- **Product List**: View all products in a responsive table
- **Add Product**: Create new products with form validation
- **Edit Product**: Update existing product details
- **Product Details**: View detailed information about a single product
- **Delete Product**: Remove products with confirmation dialog
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Proper error states and loading indicators
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Query** for data fetching and caching
- **Axios** for API calls

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- FastAPI backend running on http://localhost:8000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to http://localhost:3000

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Integration

The frontend is configured to work with the FastAPI backend running on `http://localhost:8000`. The API endpoints used are:

- `GET /products` - Get all products
- `GET /product/{id}` - Get product by ID
- `POST /product` - Create new product
- `PUT /product/{id}` - Update product
- `DELETE /product/{id}` - Delete product

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx
│   ├── LoadingSpinner.tsx
│   ├── ConfirmModal.tsx
│   └── ErrorMessage.tsx
├── pages/              # Page components
│   ├── ProductList.tsx
│   ├── AddProduct.tsx
│   ├── EditProduct.tsx
│   └── ProductDetails.tsx
├── services/           # API service layer
│   └── api.ts
├── types/              # TypeScript type definitions
│   └── product.ts
├── hooks/              # Custom React hooks
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### Product List Page
- Displays all products in a clean, responsive table
- Each product shows name, description, and price
- Action buttons for View, Edit, and Delete
- Empty state when no products exist
- Loading and error states

### Add Product Page
- Form with validation for all required fields
- Real-time validation feedback
- Error handling for API failures
- Cancel and submit actions

### Edit Product Page
- Pre-populated form with existing product data
- Same validation as Add Product page
- Updates existing product via API
- Handles product not found scenarios

### Product Details Page
- Clean, detailed view of product information
- Navigation back to product list
- Quick edit button
- Handles product not found scenarios

### Shared Components
- **Navbar**: Consistent navigation across all pages
- **LoadingSpinner**: Reusable loading indicator
- **ConfirmModal**: Confirmation dialog for destructive actions
- **ErrorMessage**: Consistent error display component

## Development Notes

- The app uses React Query for efficient data fetching and caching
- All API calls are properly typed with TypeScript
- Form validation is handled client-side with real-time feedback
- The UI is fully responsive and follows modern design principles
- Error boundaries and loading states provide good user experience
