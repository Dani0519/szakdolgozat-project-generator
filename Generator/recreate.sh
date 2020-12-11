#!/bin/bash

# Read the file from parameter
file=$1
echo "Regenerate ${file}"

# Enter the Core directory
cd Core

# Run the main script
python3 -B regenerate.py $file

if [ $? -eq 1 ]; then
  exit
fi

# Go back to the root
cd ..

# Push the changes
git pull origin master
git add .
git commit -m "Regenerated ${file}"
git push --set-upstream origin master
