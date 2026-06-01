#!/bin/bash
# Helper script to initialize git and push the TrevorosUI codebase

echo "Step 1: Initializing git repository..."
git init

echo "Step 2: Checking if remote origin already exists..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/notreallyrajat/TrevorosUI.git

echo "Step 3: Staging all project files..."
git add .

echo "Step 4: Committing codebase changes..."
git commit -m "Finalize Trevoros institutional dashboard, fix TS build warnings, and align layout"

echo "Step 5: Setting active branch to main..."
git branch -M main

echo "Step 6: Pushing to remote GitHub repository..."
git push -u origin main
