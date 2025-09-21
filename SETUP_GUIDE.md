# Complete Setup Guide for Product Management System

This guide will help you set up both the FastAPI backend and React frontend for the Product Management System.

## Prerequisites

- Python 3.8+ installed
- Node.js 16+ installed
- Git (optional)

## Backend Setup (FastAPI)

The backend is already set up in the root directory. To run it:

1. **Activate the virtual environment:**
   ```bash
   # On Windows
   myenv\Scripts\activate
   
   # On macOS/Linux
   source myenv/bin/activate
   ```

2. **Install dependencies (if not already done):**
   ```bash
   pip install fastapi uvicorn sqlalchemy
   ```

3. **Start the FastAPI server:**
   ```bash
   uvicorn main:app --reload
   ```

   The API will be available at: http://localhost:8000
   API documentation at: http://localhost:8000/docs

## Frontend Setup (React)

The frontend is located in the `frontend/` directory.

### Option 1: Using Batch Files (Windows)

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Run the installation script:**
   ```bash
   install.bat
   ```

3. **Start the development server:**
   ```bash
   start.bat
   ```

### Option 2: Manual Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

The React app will be available at: http://localhost:3000

## Running Both Applications

1. **Start the FastAPI backend first:**
   ```bash
   # In the root directory
   myenv\Scripts\activate  # Windows
   uvicorn main:app --reload
   ```

2. **In a new terminal, start the React frontend:**
   ```bash
   # In the frontend directory
   cd frontend
   npm run dev
   ```

## Features Available

### Backend API Endpoints:
- `GET /` - Welcome message
- `GET /products` - Get all products
- `GET /product/{id}` - Get product by ID
- `POST /product` - Create new product
- `PUT /product/{id}` - Update product
- `DELETE /product/{id}` - Delete product

### Frontend Pages:
- **Home Page** (`/`) - Product list with CRUD operations
- **Add Product** (`/add`) - Form to create new products
- **Edit Product** (`/edit/:id`) - Form to update existing products
- **Product Details** (`/product/:id`) - Detailed view of a single product

## Troubleshooting

### Common Issues:

1. **PowerShell Execution Policy Error:**
   - Run PowerShell as Administrator
   - Execute: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
   - Or use Command Prompt instead of PowerShell

2. **Port Already in Use:**
   - Backend: Change port in `uvicorn main:app --reload --port 8001`
   - Frontend: Vite will automatically suggest a different port

3. **CORS Issues:**
   - The frontend is configured to proxy API calls to the backend
   - Make sure the backend is running on port 8000

4. **Database Issues:**
   - The backend will automatically create the database and tables
   - Sample products will be added on first run

## Project Structure

```
FastAPI_demo/
├── main.py                 # FastAPI application
├── model.py               # Pydantic schemas
├── model_database.py      # SQLAlchemy models
├── database_setup.py      # Database configuration
├── myenv/                 # Python virtual environment
└── frontend/              # React application
    ├── src/
    │   ├── components/    # Reusable UI components
    │   ├── pages/         # Page components
    │   ├── services/      # API service layer
    │   ├── types/         # TypeScript types
    │   └── hooks/         # Custom React hooks
    ├── package.json       # Node.js dependencies
    └── README.md          # Frontend documentation
```

## Next Steps

1. **Test the application:**
   - Open http://localhost:3000 in your browser
   - Try creating, editing, and deleting products
   - Verify all CRUD operations work correctly

2. **Customize the application:**
   - Modify the UI styling in the React components
   - Add more fields to the product model
   - Implement additional features like search or filtering

3. **Deploy the application:**
   - Build the React app: `npm run build`
   - Deploy the FastAPI backend to a cloud service
   - Update the API URL in the frontend for production

## Support

If you encounter any issues:
1. Check that both servers are running
2. Verify the API endpoints are accessible
3. Check the browser console for errors
4. Review the terminal output for backend errors
