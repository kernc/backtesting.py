
#!/bin/bash
# Claude Code Hook: user-prompt-submit
# Runs when user submits a prompt
# Purpose: Setup project context and validate task requirements

set -e

# Check project health
echo "🔍 Project Health Check:"

# Verify key files exist
if [ ! -f "setup.py" ]; then
    echo "⚠️  setup.py not found"
fi

if [ ! -f "README.md" ]; then
    echo "⚠️  README.md not found"
fi

# Check test suite exists
if [ ! -d "backtesting/test" ]; then
    echo "⚠️  Test directory not found"
else
    echo "✅ Test suite available"
fi

# Show latest changes for context
if git log --oneline -5 > /dev/null 2>&1; then
    echo ""
    echo "📝 Recent commits:"
    git log --oneline -3
fi

exit 0
