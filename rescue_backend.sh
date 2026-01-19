#!/bin/bash

# CONFIGURATION
BACKEND_REPO_DIR="../legalgramchatbotbackend"

echo "STARTING RESCUE OPERATION..."

# 1. RESURRECT THE FILES (Bring back api/ from the previous commit)
echo "Restoring 'api/' from git history (HEAD~1)..."
git checkout HEAD~1 -- api/ || {
  echo "Failed to checkout api/ from HEAD~1. Aborting.";
  exit 1;
}

# Verify restoration
if [ ! -d "api" ]; then
    echo "CRITICAL ERROR: Could not restore api/ folder. Check git history."
    exit 1
fi
echo "Files restored locally."

# 2. COPY TO BACKEND REPO (Using the correct local path)
echo "Copying files to $BACKEND_REPO_DIR..."
if [ ! -d "$BACKEND_REPO_DIR" ]; then
  echo "Backend repo directory $BACKEND_REPO_DIR not found. Aborting.";
  exit 1;
fi
cp -r api/* "$BACKEND_REPO_DIR/"

# 3. PUSH TO BACKEND REPO
cd "$BACKEND_REPO_DIR"
echo "Entered $(pwd)"
git add .
# If there is an existing commit, amend it to include the restored files; otherwise create a new commit
if git rev-parse --verify HEAD >/dev/null 2>&1; then
  git commit --amend -m "feat: Initial backend migration (Source Code Restored)" || git commit -m "feat: Initial backend migration (Source Code Restored)"
else
  git commit -m "feat: Initial backend migration (Source Code Restored)" || true
fi

echo "Force Pushing corrected code to Backend Remote..."
git push -u origin main --force

# 4. CLEANUP FRONTEND (Final Polish)
cd -
echo "Re-cleaning Frontend Repo..."
rm -rf api
rm -f rescue_backend.sh

echo "RESCUE COMPLETE"
echo "1. Backend Code should be at: https://github.com/T361/legalgramchatbotbackend"
echo "2. Frontend Repo cleanup finished."
