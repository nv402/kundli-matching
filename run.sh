#!/bin/bash

echo ""
echo "========================================"
echo "  Kundli Matching for Marriage"
echo "  Vedic Astrology Compatibility Tool"
echo "========================================"
echo ""
echo "Starting the application..."
echo ""

# Function to open URL in browser
open_browser() {
    if command -v xdg-open > /dev/null; then
        xdg-open "$1"
    elif command -v open > /dev/null; then
        open "$1"
    elif command -v start > /dev/null; then
        start "$1"
    else
        echo "Could not detect browser opener command."
        echo "Please manually open 'launch.html' in your web browser."
        return 1
    fi
}

# Try to open the launcher
if open_browser "launch.html"; then
    echo "Application should now be running in your browser!"
else
    echo ""
    echo "Could not automatically open browser."
    echo "Please manually open 'launch.html' in your web browser."
    echo ""
    echo "Alternative: You can also run a local server:"
    echo "  python -m http.server 8000"
    echo "  Then open: http://localhost:8000/launch.html"
fi

echo ""
echo "Press Enter to exit..."
read