#!/bin/bash
# Claude Code Hook: post-execution
# Runs after tool execution completes
# Purpose: Validate changes and run quality checks

set -e

# Only run on successful execution
if [ $? -ne 0 ]; then
    exit 0
fi

# Check if Python files were modified
if git diff-index --quiet HEAD --; then
    exit 0
fi

MODIFIED_PY=$(git diff-index --name-only HEAD -- | grep -E '\.py$' || true)

if [ -z "$MODIFIED_PY" ]; then
    exit 0
fi

echo "🔧 Post-Execution Checks:"

# Run mypy on modified files if they exist
if command -v mypy &> /dev/null; then
    echo "Running mypy on modified files..."
    for file in $MODIFIED_PY; do
        if [ -f "$file" ]; then
            mypy "$file" --no-error-summary 2>/dev/null || true
        fi
    done
fi

# Quick flake8 check
if command -v flake8 &> /dev/null; then
    echo "Running flake8..."
    for file in $MODIFIED_PY; do
        if [ -f "$file" ]; then
            flake8 "$file" --count --select=E9,F63,F7,F82 --show-source --statistics 2>/dev/null || true
        fi
    done
fi

exit 0
