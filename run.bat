@echo off
echo.
echo ========================================
echo   Kundli Matching for Marriage
echo   Vedic Astrology Compatibility Tool
echo ========================================
echo.
echo Starting the application...
echo.

REM Try to open with default browser
start "" "launch.html"

REM If that doesn't work, try specific browsers
if errorlevel 1 (
    echo Trying alternative browsers...
    start "" "chrome.exe" "launch.html" 2>nul
    if errorlevel 1 (
        start "" "firefox.exe" "launch.html" 2>nul
        if errorlevel 1 (
            start "" "msedge.exe" "launch.html" 2>nul
            if errorlevel 1 (
                echo.
                echo Could not automatically open browser.
                echo Please manually open 'launch.html' in your web browser.
                echo.
                pause
            )
        )
    )
)

echo.
echo Application should now be running in your browser!
echo If not, please open 'launch.html' manually.
echo.
echo Press any key to exit...
pause >nul