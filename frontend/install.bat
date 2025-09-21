@echo off
echo Installing React frontend dependencies...
cd /d "%~dp0"
npm install
echo.
echo Installation complete!
echo.
echo To start the development server, run:
echo npm run dev
echo.
echo Make sure your FastAPI backend is running on http://localhost:8000
pause
