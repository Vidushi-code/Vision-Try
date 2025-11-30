# Git Setup Script for Vision Try-On Project
# Run this script to initialize git and push to GitHub

# Configuration - UPDATE THESE
$GITHUB_USERNAME = "your-github-username"
$REPO_NAME = "vision-try-on"

Write-Host "🚀 Setting up Git repository..." -ForegroundColor Cyan

# Initialize git if not already initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
} else {
    Write-Host "Git already initialized ✓" -ForegroundColor Green
}

# Create .gitignore if it doesn't exist
if (-not (Test-Path ".gitignore")) {
    Write-Host "Creating .gitignore file..." -ForegroundColor Yellow
    @"
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
*.egg-info/
dist/
build/

# Flask
instance/
.webassets-cache

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Environment variables
.env
"@ | Out-File -FilePath ".gitignore" -Encoding UTF8
}

# Stage all files
Write-Host "Adding files to git..." -ForegroundColor Yellow
git add .

# Commit
Write-Host "Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Virtual Try-On Eyewear Platform"

# Add remote (replace with your GitHub username)
Write-Host "Adding remote repository..." -ForegroundColor Yellow
$remoteUrl = "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
Write-Host "Remote URL: $remoteUrl" -ForegroundColor Cyan

# Check if remote already exists
$remoteExists = git remote | Select-String -Pattern "origin"
if ($remoteExists) {
    git remote set-url origin $remoteUrl
    Write-Host "Remote 'origin' URL updated ✓" -ForegroundColor Green
} else {
    git remote add origin $remoteUrl
    Write-Host "Remote 'origin' added ✓" -ForegroundColor Green
}

# Push to GitHub
Write-Host "`n📤 Ready to push to GitHub!" -ForegroundColor Cyan
Write-Host "Run the following command to push:" -ForegroundColor Yellow
Write-Host "git push -u origin main" -ForegroundColor White
Write-Host "`nOr if your default branch is 'master':" -ForegroundColor Yellow
Write-Host "git branch -M main" -ForegroundColor White
Write-Host "git push -u origin main" -ForegroundColor White

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
