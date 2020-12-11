#!/bin/bash

# Enter the Core directory
cd Core

# Run the main script
python3 -B main.py

# Go back to the root
cd ..

# Push the changes
git pull origin master
git add .
git commit -m "File changes (automatized)"
git push --set-upstream origin master