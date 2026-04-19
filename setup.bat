@echo off
REM Medicine Tracker Setup & Run Script (Windows)

echo.
echo ============================================
echo   Medicine Tracker - Setup & Run
echo ============================================
echo.

REM Check if node is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Node.js not found. Please install Node.js from https://nodejs.org/
  exit /b 1
)

echo [1/3] Installing dependencies...
call npm install

echo.
echo [2/3] Email Configuration (Optional but needed for reminders)
echo.
echo To enable email reminders and monthly reports:
echo   1. Use a Gmail account
echo   2. Enable 2-factor authentication on your Google Account
echo   3. Generate an App Password here: https://support.google.com/accounts/answer/185833
echo.
set /p EMAIL_USER="Enter your Gmail address (or press Enter to skip): "
if not "%EMAIL_USER%"=="" (
  setx EMAIL_USER "%EMAIL_USER%"
  echo Please generate an app password and run before starting:
  echo   $env:EMAIL_PASS = "your-app-password"
)

echo.
echo [3/3] Ready to start!
echo.
echo To start the server, run:
echo   npm start
echo.
echo Then open http://localhost:3000 in your browser.
echo.

pause
