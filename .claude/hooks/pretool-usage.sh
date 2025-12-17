#!/bin/bash
# Claude Code Hook: pretool-usage
# Runs before any tool is executed
# Purpose: Validate project state and provide context

set -e

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "Warning: Not in a git repository"
    exit 0
fi

# Show current branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "📍 Branch: $BRANCH"

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  You have uncommitted changes"
    git status --short | head -5
fi

# Check Python version
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}')
    echo "🐍 Python: $PYTHON_VERSION"
fi

exit 0
