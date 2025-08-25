@echo off
echo ========================================
echo    GitHub Upload Script
echo ========================================

echo Adding all files...
git add .

echo Committing changes...
set /p message="Enter commit message (or press Enter for default): "
if "%message%"=="" set message="Update website"
git commit -m "%message%"

echo Pushing to GitHub...
git push origin main

echo ========================================
echo Upload completed!
echo Check your GitHub repository and Pages
echo ========================================
pause