#!/bin/bash
echo "Starting local server for built version..."
echo "Open http://localhost:8080 in your browser"
echo "Press Ctrl+C to stop the server"
cd dist && python3 -m http.server 8080

