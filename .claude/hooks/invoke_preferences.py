#!/usr/bin/env python3
"""
PreToolUse Hook - Invoke Personal Coding Preferences

This hook runs before code editing tools (Edit, Write) to remind Claude
of the user's personal coding preferences and style guidelines.
"""

from pathlib import Path

CLAUDE_DIR = Path(__file__).parent.parent
PREFERENCES_FILE = CLAUDE_DIR / "skills" / "personal-coding-preferences.md"


def main():
    """Output the personal coding preferences as context for Claude."""
    if PREFERENCES_FILE.exists():
        content = PREFERENCES_FILE.read_text()
        print("=" * 60)
        print("CODING PREFERENCES - Please follow these guidelines:")
        print("=" * 60)
        print(content)
        print("=" * 60)
    else:
        print("No personal coding preferences file found.")


if __name__ == "__main__":
    main()
