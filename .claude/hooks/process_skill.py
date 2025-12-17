#!/usr/bin/env python3
"""
Process Skill Hook for Claude Code

This hook processes user input from Claude chat, matches it against existing skills,
and updates skill .md files when new useful information is discovered.

Supports saving the last prompt and its response as a skill - either editing an
existing skill or creating a new one based on keyword matching.

Uses the Claude Agent SDK to analyze input and determine skill relevance.
"""

from __future__ import annotations

import asyncio
import json
import logging
import os
import re
import sys
from datetime import datetime
from pathlib import Path
from typing import Optional, List, Dict

# Configure logging to daily log file
LOG_FILE = Path(f"/tmp/{datetime.now().strftime('%Y_%m_%d')}.log")
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s [%(levelname)s] %(funcName)s: %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
    handlers=[
        logging.FileHandler(LOG_FILE, mode='a'),
    ]
)
logger = logging.getLogger(__name__)

# Load environment variables from .env file
CLAUDE_DIR = Path(__file__).parent.parent
ENV_FILE = CLAUDE_DIR / ".env"
if ENV_FILE.exists():
    with open(ENV_FILE) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, value = line.split('=', 1)
                os.environ[key.strip()] = value.strip()

# Try to import claude_agent_sdk, provide fallback for environments without it
try:
    from claude_agent_sdk import query, ClaudeAgentOptions
    HAS_AGENT_SDK = True
except ImportError:
    HAS_AGENT_SDK = False


# Configuration
CLAUDE_DIR = Path(__file__).parent.parent
SKILLS_DIR = CLAUDE_DIR / "skills"

# Canonical sections that every skill file should have
# These are the well-defined sections that get updated (not appended)
CANONICAL_SECTIONS = {
    "summary": {
        "title": "Summary",
        "description": "Brief overview of the skill",
        "order": 1
    },
    "current_config": {
        "title": "Current Configuration",
        "description": "Current parameter values and settings",
        "order": 2,
        "keywords": ["threshold", "period", "limit", "value", "parameter", "config", "setting", "oversold", "overbought"]
    },
    "examples": {
        "title": "Examples",
        "description": "Code examples and usage patterns",
        "order": 3,
        "keywords": ["example", "code", "snippet", "usage", "pattern", "class", "function", "def", "strategy"]
    },
    "notes": {
        "title": "Notes",
        "description": "Additional notes and observations",
        "order": 4
    },
    "history": {
        "title": "Change History",
        "description": "Log of recent changes (limited entries)",
        "order": 5,
        "max_entries": 5  # Keep only last 5 changes
    }
}

# Skill definitions with keywords and file mappings
# Skills can have sub-skills defined in the "sub_skills" field
# Skills marked as "critical": True contain important numerical values that
# should trigger a warning when the user attempts to modify them
SKILLS = {
    "backtesting-analyzer": {
        "file": "backtesting-analyzer.md",
        "keywords": [
            "backtest", "backtesting", "strategy", "performance", "metrics",
            "sharpe", "drawdown", "return", "win rate", "trades", "profit",
            "loss", "equity", "portfolio", "analyze", "analysis", "sma",
            "crossover", "indicator", "signal", "optimize", "optimization",
            "rsi", "macd", "bollinger", "overbought", "oversold", "threshold"
        ],
        "description": "Backtesting performance and strategy analysis",
        "critical": True,  # Contains strategy parameters with numerical values
        "critical_keywords": ["threshold", "period", "rsi", "macd", "overbought", "oversold"],
        "warning_message": "⚠️  CRITICAL SKILL: This involves trading strategy parameters. Current values: RSI period=7, oversold=10, overbought=90. Changing these may significantly affect strategy performance.",
        "sub_skills": {
            "strategy-examples": {
                "file": "backtesting/strategy-examples.md",
                "keywords": [
                    "strategy", "example", "sma", "crossover", "buy", "sell",
                    "position", "indicator", "implement", "create", "build",
                    "rsi", "macd", "bollinger", "overbought", "oversold",
                    "threshold", "limit", "period"
                ],
                "description": "Trading strategy examples and implementation",
                "critical": True,
                "critical_keywords": ["threshold", "period", "limit", "overbought", "oversold", "rsi"],
                "warning_message": "⚠️  CRITICAL: Strategy parameters affect trading decisions. Current RSI values: oversold=10, overbought=90, period=7. Review before changing."
            },
            "performance-profiling": {
                "file": "backtesting/performance-profiling.md",
                "keywords": [
                    "profile", "profiling", "memory", "cpu", "speed", "slow",
                    "fast", "optimize", "cProfile", "tracemalloc", "benchmark"
                ],
                "description": "CPU and memory profiling for strategies"
            },
            "plotting-visualization": {
                "file": "backtesting/plotting-visualization.md",
                "keywords": [
                    "plot", "chart", "graph", "visualization", "visual",
                    "display", "show", "resample", "candlestick", "equity curve"
                ],
                "description": "Charts, plots, and visual analysis"
            },
            "reproducibility": {
                "file": "backtesting/reproducibility.md",
                "keywords": [
                    "random", "seed", "reproducible", "consistent", "deterministic",
                    "random_state", "monte carlo", "repeat", "same result"
                ],
                "description": "Consistent, reproducible backtest results"
            },
            "fillna-interpolation": {
                "file": "backtesting/fillna-interpolation.md",
                "keywords": [
                    "fillna", "interpolate", "interpolation", "missing", "nan",
                    "null", "arithmetic mean", "neighbors", "linear", "stats"
                ],
                "description": "Handle missing values with interpolation"
            }
        }
    },
    "code-quality": {
        "file": "code-quality.md",
        "keywords": [
            "lint", "linting", "flake8", "mypy", "type check", "typing",
            "format", "formatting", "style", "pep8", "ruff", "quality",
            "static analysis", "code review", "pylint", "black"
        ],
        "description": "Code quality checks and linting"
    },
    "docs-builder": {
        "file": "docs-builder.md",
        "keywords": [
            "documentation", "docs", "docstring", "pdoc", "sphinx", "api docs",
            "readme", "guide", "tutorial", "example", "markdown", "rst", "build docs"
        ],
        "description": "Documentation building and validation"
    },
    "test-runner": {
        "file": "test-runner.md",
        "keywords": [
            "test", "testing", "unittest", "pytest", "coverage", "test suite",
            "unit test", "integration test", "test case", "assertion", "mock",
            "fixture", "run tests", "test coverage"
        ],
        "description": "Test execution and coverage"
    },
    "personal-coding-preferences": {
        "file": "personal-coding-preferences.md",
        "keywords": [
            "preference", "style", "convention", "coding style", "format",
            "naming", "indentation", "tabs", "spaces", "quotes", "imports",
            "type hints", "docstrings", "comments", "architecture", "pattern",
            "best practice", "standard", "guideline", "rule", "personal",
            "like", "prefer", "always", "never", "use", "avoid"
        ],
        "description": "Personal coding preferences and styles"
    }
}


def find_matching_skills(user_input: str) -> list[dict]:
    """
    Find skills that match the user input based on keywords.
    Also searches sub-skills for more specific matches.

    Args:
        user_input: The text from the Claude chat window

    Returns:
        List of matching skill dictionaries with match scores
    """
    logger.debug(f"Finding matching skills for input: {user_input[:100]}...")
    user_input_lower = user_input.lower()
    matches = []

    for skill_name, skill_info in SKILLS.items():
        score = 0
        matched_keywords = []

        for keyword in skill_info["keywords"]:
            # Use word boundary matching for better accuracy
            pattern = r'\b' + re.escape(keyword.lower()) + r'\b'
            if re.search(pattern, user_input_lower):
                score += 1
                matched_keywords.append(keyword)

        if score > 0:
            matches.append({
                "name": skill_name,
                "file": skill_info["file"],
                "description": skill_info["description"],
                "score": score,
                "matched_keywords": matched_keywords,
                "is_sub_skill": False,
                "parent_skill": None
            })

        # Check sub-skills if they exist
        if "sub_skills" in skill_info:
            for sub_name, sub_info in skill_info["sub_skills"].items():
                sub_score = 0
                sub_matched = []

                for keyword in sub_info["keywords"]:
                    pattern = r'\b' + re.escape(keyword.lower()) + r'\b'
                    if re.search(pattern, user_input_lower):
                        sub_score += 1
                        sub_matched.append(keyword)

                if sub_score > 0:
                    matches.append({
                        "name": f"{skill_name}/{sub_name}",
                        "file": sub_info["file"],
                        "description": sub_info["description"],
                        "score": sub_score,
                        "matched_keywords": sub_matched,
                        "is_sub_skill": True,
                        "parent_skill": skill_name
                    })

    # If any sub-skill matches, remove its parent from the results
    # Sub-skills are more specific and should always be preferred over their parent
    sub_skill_parents = {m["parent_skill"] for m in matches if m["is_sub_skill"] and m["parent_skill"]}
    if sub_skill_parents:
        matches = [m for m in matches if m["is_sub_skill"] or m["name"] not in sub_skill_parents]

    # Sort by score descending
    matches.sort(key=lambda x: x["score"], reverse=True)
    logger.info(f"Found {len(matches)} matching skills: {[m['name'] for m in matches[:5]]}")
    return matches


def check_critical_skill_warning(user_input: str) -> Optional[str]:
    """
    Check if the user input matches a critical skill and return a warning message.

    Critical skills contain important numerical values (thresholds, periods, limits)
    that should not be changed without careful consideration.

    Args:
        user_input: The user's prompt text

    Returns:
        Warning message string if critical skill matched, None otherwise
    """
    user_input_lower = user_input.lower()
    warnings = []
    sub_skill_warnings = []  # Track sub-skill warnings separately for prioritization

    # Check if input contains modification intent
    # More comprehensive patterns for detecting intent to change values
    modification_patterns = [
        r'\b(change|update|set|modify|make|adjust|configure|use)\b',
        r'\b(should be|must be|needs to be|should have|as)\b',
        r'\b\d+\b',  # Contains numbers - likely changing a value
    ]

    has_modification_intent = any(
        re.search(pattern, user_input_lower) for pattern in modification_patterns
    )

    if not has_modification_intent:
        logger.debug(f"No modification intent detected in: {user_input[:100]}...")
        return None

    logger.info(f"Modification intent detected, checking critical skills...")

    # Check main skills AND their sub-skills
    for skill_name, skill_info in SKILLS.items():
        # First check sub-skills (more specific, should be checked first)
        for sub_name, sub_info in skill_info.get("sub_skills", {}).items():
            if not sub_info.get("critical"):
                continue

            sub_critical_keywords = sub_info.get("critical_keywords", [])
            sub_matched = []

            for keyword in sub_critical_keywords:
                pattern = r'\b' + re.escape(keyword.lower()) + r'\b'
                if re.search(pattern, user_input_lower):
                    sub_matched.append(keyword)

            if sub_matched:
                sub_warning = sub_info.get(
                    "warning_message",
                    f"⚠️  WARNING: '{skill_name}/{sub_name}' contains critical parameters."
                )
                sub_skill_warnings.append({
                    "warning": sub_warning,
                    "matched_count": len(sub_matched),
                    "matched_keywords": sub_matched
                })
                logger.info(f"Critical sub-skill warning for '{skill_name}/{sub_name}': {sub_matched}")

        # Then check main skill
        if not skill_info.get("critical"):
            continue

        critical_keywords = skill_info.get("critical_keywords", [])
        matched_critical = []

        for keyword in critical_keywords:
            pattern = r'\b' + re.escape(keyword.lower()) + r'\b'
            if re.search(pattern, user_input_lower):
                matched_critical.append(keyword)

        if matched_critical:
            warning_msg = skill_info.get(
                "warning_message",
                f"⚠️  WARNING: '{skill_name}' is a critical skill with important numerical values."
            )
            warnings.append({
                "warning": warning_msg,
                "matched_count": len(matched_critical),
                "matched_keywords": matched_critical
            })
            logger.info(f"Critical skill warning triggered for '{skill_name}': {matched_critical}")

    # Prioritize sub-skill warnings over parent warnings (more specific)
    # If we have sub-skill warnings, use the one with most keyword matches
    if sub_skill_warnings:
        sub_skill_warnings.sort(key=lambda x: x["matched_count"], reverse=True)
        logger.info(f"Returning sub-skill warning with {sub_skill_warnings[0]['matched_count']} matches")
        return sub_skill_warnings[0]["warning"]

    # Otherwise, use parent skill warning with most matches
    if warnings:
        warnings.sort(key=lambda x: x["matched_count"], reverse=True)
        return warnings[0]["warning"]

    return None


def create_new_skill(skill_name: str, description: str, keywords: list, content: str = "") -> bool:
    """
    Create a new skill file when no matching skills are found.

    Args:
        skill_name: Name for the new skill (will be used as filename)
        description: Description of the skill
        keywords: List of keywords for matching
        content: Initial content for the skill

    Returns:
        True if successful, False otherwise
    """
    logger.info(f"Creating new skill: {skill_name}")
    logger.debug(f"Keywords: {keywords}")
    # Sanitize skill name for filename
    safe_name = re.sub(r'[^a-z0-9-]', '-', skill_name.lower())
    safe_name = re.sub(r'-+', '-', safe_name).strip('-')
    filename = f"{safe_name}.md"
    file_path = SKILLS_DIR / filename

    if file_path.exists():
        logger.warning(f"Skill file {filename} already exists")
        return False

    # Create the skill file
    skill_content = f"""# {skill_name.replace('-', ' ').title()} Skill

{description}

{content if content else '## Notes'}
"""

    try:
        file_path.write_text(skill_content)

        # Add to SKILLS dict (runtime only - won't persist)
        SKILLS[safe_name] = {
            "file": filename,
            "keywords": keywords,
            "description": description
        }

        logger.info(f"Successfully created new skill: {filename}")
        return True
    except Exception as e:
        logger.error(f"Error creating skill: {e}")
        return False


def extract_skill_info_from_input(user_input: str) -> dict:
    """
    Extract skill name, description, and keywords from user input.

    Args:
        user_input: The user's input text (after 'saveskill' prefix)

    Returns:
        Dict with skill_name, description, keywords, and content
    """
    # Remove 'saveskill' prefix
    text = re.sub(r'^saveskill\s*', '', user_input, flags=re.IGNORECASE).strip()

    # Try to extract meaningful words for keywords
    words = re.findall(r'\b[a-zA-Z]{3,}\b', text.lower())
    # Filter common words
    stop_words = {'the', 'and', 'for', 'that', 'this', 'with', 'from', 'are', 'was',
                  'were', 'been', 'have', 'has', 'had', 'will', 'would', 'could',
                  'should', 'can', 'may', 'might', 'must', 'shall', 'not', 'but',
                  'use', 'using', 'used', 'how', 'what', 'when', 'where', 'why'}
    keywords = [w for w in words if w not in stop_words][:10]

    # Generate a skill name from first few significant words
    significant_words = [w for w in words[:5] if w not in stop_words][:3]
    skill_name = '-'.join(significant_words) if significant_words else 'new-skill'

    return {
        "skill_name": skill_name,
        "description": text[:200] if len(text) > 200 else text,
        "keywords": keywords,
        "content": text
    }


def generate_skill_section_title(prompt: str, response: str = None) -> str:
    """
    Generate a logical, code-related section title from prompt/response content.

    Args:
        prompt: The user's prompt
        response: Optional assistant response for additional context

    Returns:
        A descriptive section title focused on the technical content
    """
    # Clean up the prompt - remove system tags and prefixes
    prompt_clean = re.sub(r'^saveskill\s*', '', prompt, flags=re.IGNORECASE).strip()
    prompt_clean = re.sub(r'<[^>]+>', '', prompt_clean)  # Remove XML-like tags
    prompt_clean = re.sub(r'/home/[^\s]+', '', prompt_clean)  # Remove file paths

    # Extended stop words for better filtering
    stop_words = {
        # Common words
        'the', 'and', 'for', 'that', 'this', 'with', 'from', 'are', 'was',
        'were', 'been', 'save', 'skill', 'last', 'prompt', 'response',
        'please', 'can', 'could', 'would', 'should', 'will', 'have', 'has',
        'had', 'does', 'did', 'doing', 'done', 'make', 'made', 'get', 'got',
        # IDE/system words that shouldn't appear in titles
        'user', 'opened', 'file', 'ide', 'selection', 'selected', 'desktop',
        'home', 'path', 'directory', 'folder', 'manupriya', 'terminal',
        'project', 'claude', 'hook', 'error', 'warning', 'success',
    }

    # Technical keywords that should be prioritized in titles
    tech_keywords = {
        'strategy', 'backtest', 'optimize', 'implement', 'configure', 'setup',
        'analysis', 'performance', 'metrics', 'threshold', 'indicator', 'signal',
        'test', 'debug', 'fix', 'refactor', 'add', 'update', 'change', 'modify',
        'rsi', 'macd', 'sma', 'ema', 'bollinger', 'crossover', 'drawdown',
        'sharpe', 'return', 'profit', 'loss', 'trade', 'position', 'equity',
        'function', 'class', 'method', 'parameter', 'variable', 'config',
    }

    # Extract words from prompt
    words = re.findall(r'\b[a-zA-Z]{3,}\b', prompt_clean.lower())

    # Prioritize technical keywords
    tech_words = [w for w in words if w in tech_keywords]
    other_words = [w for w in words if w not in stop_words and w not in tech_keywords]

    # Build title: prioritize tech keywords, then other significant words
    significant = tech_words[:3] + other_words[:2]
    significant = significant[:5]  # Limit to 5 words max

    if significant:
        return ' '.join(w.capitalize() for w in significant)

    # Fallback: try to extract from response if available
    if response:
        response_clean = re.sub(r'<[^>]+>', '', response)
        response_words = re.findall(r'\b[a-zA-Z]{4,}\b', response_clean.lower())
        tech_from_response = [w for w in response_words if w in tech_keywords][:3]
        if tech_from_response:
            return ' '.join(w.capitalize() for w in tech_from_response)

    return "Saved Knowledge"


def extract_code_changes(response: str) -> list[str]:
    """
    Extract code changes mentioned in the response.

    Args:
        response: The assistant's response text

    Returns:
        List of code change descriptions
    """
    changes = []

    # Look for explicit parameter value changes like "rsi_period = 14" -> "rsi_period = 7"
    # or "Changed `rsi_period = 14` → `rsi_period = 7`"
    param_changes = re.findall(
        r'`?(\w+)\s*=\s*(\d+(?:\.\d+)?)`?\s*(?:→|->|-->|to)\s*`?(?:\w+\s*=\s*)?(\d+(?:\.\d+)?)`?',
        response
    )
    for name, old_val, new_val in param_changes:
        if old_val != new_val:
            changes.append(f"{name}: {old_val} → {new_val}")

    # Look for "Changed X to Y" or "Updated X to Y" patterns
    changed_to = re.findall(
        r'(?:changed|updated|set|modified)\s+`?(\w+)`?\s+(?:from\s+`?(\d+(?:\.\d+)?)`?\s+)?to\s+`?(\d+(?:\.\d+)?)`?',
        response, re.IGNORECASE
    )
    for match in changed_to:
        name, old_val, new_val = match
        if old_val and old_val != new_val:
            changes.append(f"{name}: {old_val} → {new_val}")
        elif new_val:
            changes.append(f"{name} = {new_val}")

    # Extract bullet points that describe changes
    bullet_matches = re.findall(r'[-•*]\s*\*?\*?([^:\n]+):\s*([^\n]+)', response)
    for label, value in bullet_matches:
        if any(word in label.lower() for word in ['threshold', 'value', 'parameter', 'setting', 'changed', 'updated', 'period']):
            # Clean up the value - remove trailing punctuation
            clean_value = value.strip().rstrip('.')
            changes.append(f"{label.strip()}: {clean_value}")

    # Look for explicit before/after patterns with arrows
    before_after = re.findall(r'(\w+)[:\s]+`?(\d+(?:\.\d+)?)`?\s*(?:→|->|-->)\s*`?(\d+(?:\.\d+)?)`?', response)
    for name, old_val, new_val in before_after:
        if old_val != new_val:
            change_str = f"{name}: {old_val} → {new_val}"
            if change_str not in changes:
                changes.append(change_str)

    # Extract current values mentioned with assignment (e.g., "rsi_period = 7")
    current_values = re.findall(r'`(\w+(?:_\w+)*)\s*=\s*(\d+(?:\.\d+)?)`', response)
    for name, val in current_values:
        val_str = f"{name} = {val}"
        # Only add if we don't already have a change for this parameter
        if not any(name in c for c in changes):
            changes.append(val_str)

    # Deduplicate while preserving order
    seen = set()
    unique_changes = []
    for change in changes:
        if change not in seen:
            seen.add(change)
            unique_changes.append(change)

    return unique_changes[:5]  # Limit to 5 changes


def extract_issues_encountered(response: str) -> list[str]:
    """
    Extract any issues or errors mentioned in the response.

    Args:
        response: The assistant's response text

    Returns:
        List of issue descriptions
    """
    issues = []

    # Look for error/issue indicators
    issue_patterns = [
        r'(?:error|issue|problem|bug|failed|failure)[:\s]+([^.]+)',
        r'(?:fixed|resolved|addressed)[:\s]+([^.]+)',
        r'(?:warning|note)[:\s]+([^.]+)',
    ]

    for pattern in issue_patterns:
        matches = re.findall(pattern, response, re.IGNORECASE)
        for match in matches:
            if len(match) > 10:  # Skip very short matches
                issues.append(match.strip()[:100])  # Limit length

    return issues[:3]  # Limit to 3 issues


def extract_code_snippet(response: str) -> Optional[str]:
    """
    Extract the most relevant code snippet from the response.

    Args:
        response: The assistant's response text

    Returns:
        Code snippet if found, None otherwise
    """
    # Look for code blocks with python, or inline code with class/function definitions
    code_blocks = re.findall(r'```(?:python)?\s*\n(.*?)```', response, re.DOTALL)

    if code_blocks:
        # Return the first meaningful code block (not just a single line)
        for block in code_blocks:
            lines = block.strip().split('\n')
            if len(lines) >= 2 or any(kw in block for kw in ['class ', 'def ', '=']):
                # Limit to 15 lines max
                if len(lines) > 15:
                    return '\n'.join(lines[:15]) + '\n# ... (truncated)'
                return block.strip()

    # Look for inline code showing class attributes or assignments
    inline_code = re.findall(r'`([^`]+(?:=|class |def )[^`]+)`', response)
    if inline_code:
        return '\n'.join(inline_code[:5])

    return None


def extract_current_config_values(response: str) -> Dict[str, str]:
    """
    Extract current configuration values from the response.

    Args:
        response: The assistant's response text

    Returns:
        Dict of parameter names to their current values
    """
    values = {}

    # Look for parameter assignments in various formats
    # Format: `param_name = value`
    backtick_assigns = re.findall(r'`(\w+(?:_\w+)*)\s*=\s*(\d+(?:\.\d+)?)`', response)
    for name, val in backtick_assigns:
        values[name] = val

    # Format: param_name: value or param_name = value in prose
    prose_assigns = re.findall(r'\b(\w+(?:_\w+)*)\s*[=:]\s*(\d+(?:\.\d+)?)\b', response)
    for name, val in prose_assigns:
        # Skip common words that aren't parameters
        if name.lower() not in {'line', 'lines', 'file', 'step', 'version', 'year', 'day', 'month'}:
            values[name] = val

    return values


def extract_values_from_prompt(prompt: str) -> Dict[str, str]:
    """
    Extract parameter values from user prompts.

    Handles various natural language patterns like:
    - "threshold as 10 and 90"
    - "set oversold to 10"
    - "oversold=10, overbought=90"
    - "RSI should have threshold as 10 and 90"

    Args:
        prompt: The user's prompt text

    Returns:
        Dict of parameter names to their new values
    """
    values = {}
    prompt_lower = prompt.lower()

    # Known parameter names and their aliases
    param_aliases = {
        'oversold': ['oversold', 'lower', 'buy threshold', 'buy signal'],
        'overbought': ['overbought', 'upper', 'sell threshold', 'sell signal'],
        'rsi_period': ['rsi_period', 'rsi period', 'period'],
        'fast': ['fast', 'fast_period', 'fast period'],
        'slow': ['slow', 'slow_period', 'slow period'],
        'threshold': ['threshold'],
    }

    # Pattern: "threshold as X and Y" - extract both values for oversold/overbought
    threshold_pair = re.search(r'threshold[s]?\s+(?:as|of|to|should be|=|:)?\s*(\d+)\s+and\s+(\d+)', prompt_lower)
    if threshold_pair:
        val1, val2 = int(threshold_pair.group(1)), int(threshold_pair.group(2))
        # Lower value is oversold, higher is overbought
        values['oversold'] = str(min(val1, val2))
        values['overbought'] = str(max(val1, val2))
        logger.debug(f"Extracted threshold pair: oversold={values['oversold']}, overbought={values['overbought']}")

    # Pattern: "X and Y" after mentioning RSI/threshold (fallback)
    if not threshold_pair:
        rsi_values = re.search(r'(?:rsi|threshold)[^0-9]*(\d+)\s*(?:and|,|/)\s*(\d+)', prompt_lower)
        if rsi_values:
            val1, val2 = int(rsi_values.group(1)), int(rsi_values.group(2))
            values['oversold'] = str(min(val1, val2))
            values['overbought'] = str(max(val1, val2))
            logger.debug(f"Extracted RSI values: oversold={values['oversold']}, overbought={values['overbought']}")

    # Pattern: "param to/as/= value"
    for canonical_name, aliases in param_aliases.items():
        for alias in aliases:
            # "set X to Y" or "X should be Y" or "X as Y" or "X = Y" or "X: Y"
            patterns = [
                rf'{re.escape(alias)}\s+(?:to|as|should be|=|:)\s*(\d+(?:\.\d+)?)',
                rf'(?:set|change|update|make)\s+{re.escape(alias)}\s+(?:to|as|=|:)?\s*(\d+(?:\.\d+)?)',
                rf'{re.escape(alias)}\s*[=:]\s*(\d+(?:\.\d+)?)',
            ]
            for pattern in patterns:
                match = re.search(pattern, prompt_lower)
                if match and canonical_name not in values:
                    values[canonical_name] = match.group(1)
                    logger.debug(f"Extracted {canonical_name}={values[canonical_name]} from pattern")
                    break

    # Pattern: explicit "oversold X overbought Y" or "X/Y" near RSI mention
    explicit_pair = re.search(r'oversold\s*[=:]?\s*(\d+)[,\s]+overbought\s*[=:]?\s*(\d+)', prompt_lower)
    if explicit_pair:
        values['oversold'] = explicit_pair.group(1)
        values['overbought'] = explicit_pair.group(2)

    # Reverse pattern: "overbought X oversold Y"
    reverse_pair = re.search(r'overbought\s*[=:]?\s*(\d+)[,\s]+oversold\s*[=:]?\s*(\d+)', prompt_lower)
    if reverse_pair:
        values['overbought'] = reverse_pair.group(1)
        values['oversold'] = reverse_pair.group(2)

    return values


def update_all_value_occurrences(content: str, param: str, new_value: str) -> str:
    """
    Update ALL occurrences of a parameter value throughout the entire content.

    This handles values in:
    - Prose text: "RSI<30" -> "RSI<10"
    - Markdown tables: "| RSI | 30/70 |" -> "| RSI | 10/90 |"
    - Code blocks: "oversold = 30" -> "oversold = 10"
    - Bullet points: "- **oversold**: 30" -> "- **oversold**: 10"

    Args:
        content: The full file content
        param: Parameter name (e.g., 'oversold', 'overbought')
        new_value: The new value to set

    Returns:
        Updated content with all occurrences replaced
    """
    updated = content
    param_lower = param.lower()

    # Define patterns based on parameter type
    if param_lower == 'oversold':
        patterns = [
            # Code: oversold = 30
            (r'(oversold\s*=\s*)\d+', rf'\g<1>{new_value}'),
            # Markdown bold: **oversold**: 30 or **oversold** = 30
            (r'(\*\*oversold\*\*[:\s]+)\d+', rf'\g<1>{new_value}'),
            # Prose: RSI<30 or RSI < 30
            (r'(RSI\s*<\s*)\d+', rf'\g<1>{new_value}'),
            # Table/prose: oversold=30 or oversold: 30
            (r'(oversold[=:\s]+)\d+', rf'\g<1>{new_value}'),
            # Parenthetical: (30/70) -> update first number
            (r'\((\d+)/(\d+)\)', lambda m: f'({new_value}/{m.group(2)})' if int(m.group(1)) < int(m.group(2)) else f'({m.group(1)}/{m.group(2)})'),
            # Prose: "30/70 thresholds" -> update first number
            (r'\b(\d+)/(\d+)\s*threshold', lambda m: f'{new_value}/{m.group(2)} threshold' if int(m.group(1)) < int(m.group(2)) else m.group(0)),
            # Buy signal description
            (r'(buy[^0-9]*?(?:signal|threshold|when)[^0-9]*?(?:RSI\s*)?[<]?\s*)\d+', rf'\g<1>{new_value}'),
        ]
    elif param_lower == 'overbought':
        patterns = [
            # Code: overbought = 70
            (r'(overbought\s*=\s*)\d+', rf'\g<1>{new_value}'),
            # Markdown bold: **overbought**: 70
            (r'(\*\*overbought\*\*[:\s]+)\d+', rf'\g<1>{new_value}'),
            # Prose: RSI>70 or RSI > 70
            (r'(RSI\s*>\s*)\d+', rf'\g<1>{new_value}'),
            # Table/prose: overbought=70 or overbought: 70
            (r'(overbought[=:\s]+)\d+', rf'\g<1>{new_value}'),
            # Parenthetical: (30/70) -> update second number
            (r'\((\d+)/(\d+)\)', lambda m: f'({m.group(1)}/{new_value})' if int(m.group(1)) < int(m.group(2)) else f'({m.group(1)}/{m.group(2)})'),
            # Prose: "30/70 thresholds" -> update second number
            (r'\b(\d+)/(\d+)\s*threshold', lambda m: f'{m.group(1)}/{new_value} threshold' if int(m.group(1)) < int(m.group(2)) else m.group(0)),
            # Sell signal description
            (r'(sell[^0-9]*?(?:signal|threshold|when)[^0-9]*?(?:RSI\s*)?[>]?\s*)\d+', rf'\g<1>{new_value}'),
        ]
    elif param_lower == 'rsi_period' or param_lower == 'period':
        patterns = [
            (r'(rsi_period\s*=\s*)\d+', rf'\g<1>{new_value}'),
            (r'(\*\*rsi_period\*\*[:\s]+)\d+', rf'\g<1>{new_value}'),
            (r'(\d+)[- ](?:day|period)\s+RSI', rf'{new_value}-day RSI'),
            (r'(RSI\s*\(\s*)\d+(\s*\))', rf'\g<1>{new_value}\g<2>'),
        ]
    else:
        # Generic parameter update
        patterns = [
            (rf'({param}\s*=\s*)\d+(?:\.\d+)?', rf'\g<1>{new_value}'),
            (rf'(\*\*{param}\*\*[:\s]+)\d+(?:\.\d+)?', rf'\g<1>{new_value}'),
            (rf'({param}[=:\s]+)\d+(?:\.\d+)?', rf'\g<1>{new_value}'),
        ]

    for pattern, replacement in patterns:
        if callable(replacement):
            updated = re.sub(pattern, replacement, updated, flags=re.IGNORECASE)
        else:
            updated = re.sub(pattern, replacement, updated, flags=re.IGNORECASE)

    return updated


def determine_target_section(prompt: str, response: str) -> str:
    """
    Determine which canonical section should be updated based on content.

    Args:
        prompt: The user's prompt
        response: The assistant's response

    Returns:
        The canonical section key (e.g., 'current_config', 'examples', 'notes')
    """
    combined_text = (prompt + " " + response).lower()

    # Check for configuration/parameter changes - highest priority
    config_indicators = [
        r'\b(change|update|set|modify)\b.*\b(threshold|period|limit|value|parameter)\b',
        r'\b(threshold|period|limit|oversold|overbought)\b.*\b(to|=|:)\s*\d+',
        r'\boversold\b|\boverbought\b',
        r'\brsi_period\b|\bperiod\s*=',
        r'industry\s+standard',
    ]
    for pattern in config_indicators:
        if re.search(pattern, combined_text):
            logger.debug(f"Matched config pattern: {pattern}")
            return "current_config"

    # Check for code examples
    example_indicators = [
        r'```python',
        r'\bclass\s+\w+.*strategy',
        r'\bdef\s+\w+\s*\(',
        r'\bexample\b.*\bcode\b',
    ]
    for pattern in example_indicators:
        if re.search(pattern, combined_text):
            logger.debug(f"Matched example pattern: {pattern}")
            return "examples"

    # Default to notes for general information
    return "notes"


def parse_skill_file_sections(content: str) -> Dict[str, Dict]:
    """
    Parse a skill file into its sections.

    Args:
        content: The full content of the skill file

    Returns:
        Dict mapping section titles to their content and metadata
    """
    sections = {}

    # Match ## headers and their content
    pattern = r'^##\s+(.+?)$\n(.*?)(?=^##\s+|\Z)'
    matches = re.findall(pattern, content, re.MULTILINE | re.DOTALL)

    for title, section_content in matches:
        title = title.strip()
        sections[title] = {
            "title": title,
            "content": section_content.strip(),
            "raw": f"## {title}\n{section_content}"
        }

    return sections


def find_matching_section(sections: Dict[str, Dict], target_section: str) -> Optional[str]:
    """
    Find an existing section that matches the target canonical section.

    Args:
        sections: Parsed sections from the skill file
        target_section: The canonical section key to match

    Returns:
        The actual section title if found, None otherwise
    """
    canonical = CANONICAL_SECTIONS.get(target_section, {})
    canonical_title = canonical.get("title", "").lower()
    canonical_keywords = canonical.get("keywords", [])

    # First, try exact title match
    for title in sections:
        if title.lower() == canonical_title:
            return title

    # Then try partial title match
    for title in sections:
        title_lower = title.lower()
        if canonical_title in title_lower or title_lower in canonical_title:
            return title
        # Check for keyword matches in section title
        for keyword in canonical_keywords:
            if keyword.lower() in title_lower:
                return title

    return None


def update_section_content(
    existing_content: str,
    new_info: Dict,
    section_type: str
) -> str:
    """
    Intelligently update section content by merging new information.

    Args:
        existing_content: Current section content
        new_info: New information to merge (with keys like 'values', 'code', 'changes')
        section_type: The canonical section type

    Returns:
        Updated section content
    """
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")

    if section_type == "current_config":
        # For configuration sections, update values in place
        updated = existing_content

        # Update parameter values mentioned in the content
        for param, value in new_info.get("values", {}).items():
            # Try to update existing parameter mentions
            patterns = [
                (rf'(\*\*{param}\*\*[:\s]+)`?\d+(?:\.\d+)?`?', rf'\1{value}'),
                (rf'({param}\s*[=:]\s*)`?\d+(?:\.\d+)?`?', rf'\1{value}'),
                (rf'(`{param}\s*=\s*)\d+(?:\.\d+)?(`)', rf'\g<1>{value}\g<2>'),
            ]
            for pattern, replacement in patterns:
                updated, count = re.subn(pattern, replacement, updated, flags=re.IGNORECASE)
                if count > 0:
                    logger.debug(f"Updated {param} to {value}")
                    break

        # Update the timestamp if present
        updated = re.sub(
            r'\*Updated:.*?\*',
            f'*Updated: {timestamp}*',
            updated
        )

        # If no timestamp exists, add one at the beginning
        if '*Updated:' not in updated:
            updated = f"*Updated: {timestamp}*\n\n{updated}"

        return updated

    elif section_type == "examples":
        # For examples, update code blocks if class/function names match
        updated = existing_content

        new_code = new_info.get("code", "")
        if new_code:
            # Try to find and replace matching code blocks
            # Look for class definitions
            class_match = re.search(r'class\s+(\w+)', new_code)
            if class_match:
                class_name = class_match.group(1)
                # Replace existing code block for this class
                pattern = rf'```python\s*\nclass\s+{class_name}.*?```'
                if re.search(pattern, updated, re.DOTALL):
                    updated = re.sub(pattern, f'```python\n{new_code}\n```', updated, flags=re.DOTALL)
                    logger.debug(f"Updated code block for class {class_name}")

        return updated

    elif section_type == "history":
        # For history, prepend new entry and limit to max_entries
        max_entries = CANONICAL_SECTIONS.get("history", {}).get("max_entries", 5)

        new_entry = f"- **{timestamp}**: {new_info.get('summary', 'Updated')}"

        # Parse existing entries
        entries = re.findall(r'^- \*\*.*?\*\*:.*$', existing_content, re.MULTILINE)

        # Prepend new entry and limit
        entries = [new_entry] + entries[:max_entries - 1]

        return '\n'.join(entries)

    else:
        # For notes and other sections, append with timestamp
        new_text = new_info.get("text", "")
        if new_text:
            return f"{existing_content}\n\n### Update ({timestamp})\n{new_text}"

        return existing_content


def extract_update_info(prompt: str, response: str) -> Dict:
    """
    Extract structured information for updating skill sections.

    Args:
        prompt: The user's prompt
        response: The assistant's response

    Returns:
        Dict with structured update information
    """
    info = {
        "values": {},
        "code": None,
        "changes": [],
        "summary": "",
        "text": ""
    }

    # Extract configuration values from response
    info["values"] = extract_current_config_values(response)

    # Extract values from prompt using natural language patterns (higher priority)
    # This handles patterns like "threshold as 10 and 90"
    prompt_values = extract_values_from_prompt(prompt)
    # Prompt values override response values since user intent is explicit
    info["values"].update(prompt_values)
    logger.debug(f"Extracted values: {info['values']}")

    # Also extract from the prompt for simple "set X to Y" patterns (fallback)
    simple_prompt_values = re.findall(
        r'\b(oversold|overbought|threshold|period|limit)\b[:\s]+(\d+)',
        prompt, re.IGNORECASE
    )
    for name, value in simple_prompt_values:
        if name.lower() not in info["values"]:
            info["values"][name.lower()] = value

    # Extract code changes
    info["changes"] = extract_code_changes(response)

    # Extract code snippet
    info["code"] = extract_code_snippet(response)

    # Create a brief summary
    clean_prompt = clean_prompt_text(prompt) if callable(clean_prompt_text) else prompt
    clean_prompt = re.sub(r'<[^>]+>', '', clean_prompt)
    info["summary"] = clean_prompt[:100] + ("..." if len(clean_prompt) > 100 else "")

    # Extract any additional text notes
    if info["changes"]:
        info["text"] = "Changes: " + ", ".join(info["changes"][:3])

    return info


def update_skill_sections(
    skill_file: str,
    prompt: str,
    response: str
) -> Dict:
    """
    Intelligently update relevant sections in a skill file.

    This is the main function that determines which sections to update
    and merges new information appropriately.

    Args:
        skill_file: Path to the skill file
        prompt: The user's prompt
        response: The assistant's response

    Returns:
        Dict with update results
    """
    logger.info(f"Updating skill sections in {skill_file}")

    result = {
        "success": False,
        "sections_updated": [],
        "message": ""
    }

    # Read current content
    current_content = read_skill_file(skill_file)
    if not current_content:
        result["message"] = f"Could not read skill file: {skill_file}"
        return result

    # Parse existing sections
    sections = parse_skill_file_sections(current_content)
    logger.debug(f"Found sections: {list(sections.keys())}")

    # Determine target section based on content
    target_section = determine_target_section(prompt, response)
    logger.info(f"Target section determined: {target_section}")

    # Extract update information
    update_info = extract_update_info(prompt, response)
    logger.debug(f"Update info: values={update_info['values']}, changes={update_info['changes'][:2]}")

    # Find matching existing section
    existing_section_title = find_matching_section(sections, target_section)

    updated_content = current_content

    if existing_section_title:
        # Update existing section
        logger.info(f"Updating existing section: {existing_section_title}")

        existing = sections[existing_section_title]
        new_section_content = update_section_content(
            existing["content"],
            update_info,
            target_section
        )

        # Replace the section in the file
        old_section = f"## {existing_section_title}\n{existing['content']}"
        new_section = f"## {existing_section_title}\n\n{new_section_content}"

        # Use a more robust replacement
        pattern = rf'(## {re.escape(existing_section_title)}\n)(.*?)(?=\n## |\Z)'
        updated_content = re.sub(
            pattern,
            f"## {existing_section_title}\n\n{new_section_content}\n",
            current_content,
            flags=re.DOTALL
        )

        result["sections_updated"].append(existing_section_title)

    else:
        # Need to create the section - but first check if we should really add it
        canonical = CANONICAL_SECTIONS.get(target_section, {})
        section_title = canonical.get("title", target_section.replace("_", " ").title())

        logger.info(f"Creating new section: {section_title}")

        # Build initial content for new section
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")

        if target_section == "current_config":
            values_list = [f"- **{k}**: {v}" for k, v in update_info["values"].items()]
            new_section_content = f"*Updated: {timestamp}*\n\n" + "\n".join(values_list) if values_list else f"*Updated: {timestamp}*"
        elif target_section == "examples" and update_info["code"]:
            new_section_content = f"```python\n{update_info['code']}\n```"
        elif target_section == "history":
            new_section_content = f"- **{timestamp}**: {update_info['summary']}"
        else:
            new_section_content = update_info.get("text", update_info["summary"])

        # Append new section
        new_section = f"\n## {section_title}\n\n{new_section_content}\n"
        updated_content = current_content.rstrip() + "\n" + new_section

        result["sections_updated"].append(section_title)

    # Also update history section if it exists
    history_section = find_matching_section(sections, "history")
    if history_section and target_section != "history":
        history_info = {"summary": update_info["summary"]}
        new_history = update_section_content(
            sections[history_section]["content"],
            history_info,
            "history"
        )
        pattern = rf'(## {re.escape(history_section)}\n)(.*?)(?=\n## |\Z)'
        updated_content = re.sub(
            pattern,
            f"## {history_section}\n\n{new_history}\n",
            updated_content,
            flags=re.DOTALL
        )
        if history_section not in result["sections_updated"]:
            result["sections_updated"].append(history_section)

    # IMPORTANT: Update ALL occurrences of parameter values throughout the entire file
    # This handles values in prose text, tables, code blocks, etc.
    if update_info["values"]:
        logger.info(f"Updating all value occurrences: {update_info['values']}")
        for param, value in update_info["values"].items():
            updated_content = update_all_value_occurrences(updated_content, param, value)
        result["values_updated"] = list(update_info["values"].keys())

    # Write updated content
    if update_skill_file(skill_file, updated_content):
        result["success"] = True
        result["message"] = f"Updated sections: {', '.join(result['sections_updated'])}"
        if update_info["values"]:
            result["message"] += f" | Values updated: {list(update_info['values'].keys())}"
    else:
        result["message"] = "Failed to write updated content"

    return result


def summarize_exchange(prompt: str, response: str) -> str:
    """
    Create a concise summary of the exchange including logical details,
    code changes, and any issues encountered.

    Args:
        prompt: The user's original prompt
        response: The assistant's response

    Returns:
        Concise summary of the exchange
    """
    # Clean the prompt
    clean_prompt = clean_prompt_text(prompt) if 'clean_prompt_text' in dir() else prompt
    clean_prompt = re.sub(r'<[^>]+>', '', clean_prompt)  # Remove any remaining tags

    summary_parts = []

    # 1. Extract the core request/task
    task_words = re.findall(r'\b(change|update|set|modify|fix|add|remove|implement|create|configure)\b',
                           clean_prompt.lower())
    if task_words:
        # Get a brief description of what was requested
        request_summary = clean_prompt[:150].strip()
        if len(clean_prompt) > 150:
            request_summary += "..."
        summary_parts.append(f"**Task:** {request_summary}")

    # 2. Extract code changes
    code_changes = extract_code_changes(response)
    if code_changes:
        summary_parts.append("**Changes Made:**")
        for change in code_changes:
            summary_parts.append(f"- {change}")

    # 3. Extract file locations mentioned (with line numbers for precision)
    file_mentions = re.findall(r'([\w/]+\.(?:py|js|ts|md|json|yaml|yml))(?::(\d+))?', response)
    if file_mentions:
        unique_files = []
        seen = set()
        for file, line in file_mentions:
            file_ref = f"{file}:{line}" if line else file
            if file_ref not in seen:
                seen.add(file_ref)
                unique_files.append(file_ref)
        if unique_files:
            summary_parts.append(f"**Files:** {', '.join(unique_files[:3])}")

    # 4. Extract current configuration values (important for future reference)
    config_values = extract_current_config_values(response)
    if config_values:
        # Filter to likely config parameters (those with underscores or known names)
        config_params = {k: v for k, v in config_values.items()
                        if '_' in k or k.lower() in {'period', 'threshold', 'limit', 'oversold', 'overbought'}}
        if config_params:
            formatted_values = [f"{k}={v}" for k, v in config_params.items()]
            summary_parts.append(f"**Current Values:** {', '.join(formatted_values[:5])}")

    # 5. Extract any relevant code snippet
    code_snippet = extract_code_snippet(response)
    if code_snippet and len(code_snippet) < 500:
        summary_parts.append("**Code:**")
        summary_parts.append(f"```python\n{code_snippet}\n```")

    # 6. Extract any issues
    issues = extract_issues_encountered(response)
    if issues:
        summary_parts.append("**Issues:**")
        for issue in issues:
            summary_parts.append(f"- {issue}")

    # If we couldn't extract structured info, provide a brief summary
    if len(summary_parts) <= 1:
        # Just provide first meaningful sentence from response
        response_clean = re.sub(r'<[^>]+>', '', response)
        sentences = re.split(r'[.!?]\s+', response_clean)
        meaningful = [s for s in sentences if len(s) > 20][:2]
        if meaningful:
            summary_parts.append(f"**Summary:** {'. '.join(meaningful)}.")

    return '\n'.join(summary_parts)


def format_prompt_response_as_skill(prompt: str, response: str, section_title: str = None) -> str:
    """
    Format a prompt and its response as a concise skill summary in markdown format.
    Creates a summary of logical details, code changes, and issues instead of raw prompt/response.

    Args:
        prompt: The user's original prompt/question
        response: Claude's response to the prompt
        section_title: Optional custom section title

    Returns:
        Formatted markdown content for the skill
    """
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")

    if not section_title:
        section_title = generate_skill_section_title(prompt, response)

    # Generate concise summary instead of raw prompt/response
    summary = summarize_exchange(prompt, response)

    content = f"""### {section_title}
*Saved on {timestamp}*

{summary}
"""
    return content


def save_prompt_response_to_skill(
    prompt: str,
    response: str,
    matching_skills: list[dict],
    force_new: bool = False,
    new_skill_name: str = None
) -> dict:
    """
    Save a prompt and its response to a skill file.
    Uses intelligent section-based updating to merge information into
    existing sections rather than just appending.

    Args:
        prompt: The user's original prompt
        response: Claude's response
        matching_skills: List of skills that matched keyword search
        force_new: If True, always create a new skill instead of updating
        new_skill_name: Name for new skill (if creating one)

    Returns:
        Dict with status, action taken, and file updated/created
    """
    logger.info(f"Saving prompt/response to skill. force_new={force_new}")
    logger.debug(f"Prompt: {prompt[:100]}...")
    logger.debug(f"Response length: {len(response) if response else 0}")
    logger.debug(f"Matching skills count: {len(matching_skills)}")

    result = {
        "success": False,
        "action": None,
        "file": None,
        "sections_updated": [],
        "message": ""
    }

    # Decide whether to update existing skill or create new one
    if matching_skills and not force_new:
        # Update the top matching skill using intelligent section updating
        top_match = matching_skills[0]
        skill_file = top_match["file"]

        # Use the new section-based update approach
        update_result = update_skill_sections(skill_file, prompt, response)

        if update_result["success"]:
            result["success"] = True
            result["action"] = "updated"
            result["file"] = skill_file
            result["sections_updated"] = update_result["sections_updated"]
            result["message"] = f"Updated {skill_file}: {update_result['message']}"
            logger.info(f"Successfully updated skill sections: {update_result['sections_updated']}")
        else:
            # Fall back to append method if section update fails
            logger.warning(f"Section update failed, falling back to append: {update_result['message']}")
            content = format_prompt_response_as_skill(prompt, response)
            section_title = generate_skill_section_title(prompt, response)
            success = append_to_skill_file(skill_file, section_title, content)

            if success:
                result["success"] = True
                result["action"] = "appended"
                result["file"] = skill_file
                result["message"] = f"Appended to skill: {skill_file}"
                logger.info(f"Successfully appended to skill: {skill_file}")
            else:
                result["message"] = f"Failed to update skill: {skill_file}"
                logger.error(f"Failed to update skill: {skill_file}")
    else:
        # Create a new skill with canonical section structure
        logger.info("Creating new skill (no matches or force_new)")
        skill_info = extract_skill_info_from_input(prompt)
        skill_name = new_skill_name or skill_info["skill_name"]

        # Create skill with proper canonical sections
        success = create_new_skill_with_sections(
            skill_name=skill_name,
            description=skill_info['description'],
            keywords=skill_info["keywords"],
            prompt=prompt,
            response=response
        )

        if success:
            result["success"] = True
            result["action"] = "created"
            result["file"] = f"{skill_name}.md"
            result["message"] = f"Created new skill: {skill_name}.md"
            logger.info(f"Successfully created new skill: {skill_name}.md")
        else:
            result["message"] = f"Failed to create new skill: {skill_name}"
            logger.error(f"Failed to create new skill: {skill_name}")

    logger.debug(f"save_prompt_response_to_skill result: {result}")
    return result


def create_new_skill_with_sections(
    skill_name: str,
    description: str,
    keywords: list,
    prompt: str,
    response: str
) -> bool:
    """
    Create a new skill file with proper canonical section structure.

    Args:
        skill_name: Name for the new skill
        description: Description of the skill
        keywords: List of keywords for matching
        prompt: The user's prompt
        response: The assistant's response

    Returns:
        True if successful, False otherwise
    """
    logger.info(f"Creating new skill with sections: {skill_name}")

    # Sanitize skill name for filename
    safe_name = re.sub(r'[^a-z0-9-]', '-', skill_name.lower())
    safe_name = re.sub(r'-+', '-', safe_name).strip('-')
    filename = f"{safe_name}.md"
    file_path = SKILLS_DIR / filename

    if file_path.exists():
        logger.warning(f"Skill file {filename} already exists")
        return False

    # Extract update info for initial content
    update_info = extract_update_info(prompt, response)
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")

    # Build skill content with canonical sections
    sections = []

    # Title and summary
    sections.append(f"# {skill_name.replace('-', ' ').title()} Skill\n")
    sections.append(f"{description}\n")

    # Current Configuration section (if we have values)
    if update_info["values"]:
        sections.append("## Current Configuration\n")
        sections.append(f"*Updated: {timestamp}*\n")
        for param, value in update_info["values"].items():
            sections.append(f"- **{param}**: {value}")
        sections.append("")

    # Examples section (if we have code)
    if update_info["code"]:
        sections.append("## Examples\n")
        sections.append(f"```python\n{update_info['code']}\n```\n")

    # Notes section
    if update_info["text"] or update_info["summary"]:
        sections.append("## Notes\n")
        sections.append(update_info.get("text", update_info["summary"]))
        sections.append("")

    # Change History section
    sections.append("## Change History\n")
    sections.append(f"- **{timestamp}**: Initial creation - {update_info['summary']}")

    skill_content = '\n'.join(sections)

    try:
        file_path.write_text(skill_content)

        # Add to SKILLS dict (runtime only)
        SKILLS[safe_name] = {
            "file": filename,
            "keywords": keywords,
            "description": description
        }

        logger.info(f"Successfully created new skill with sections: {filename}")
        return True
    except Exception as e:
        logger.error(f"Error creating skill: {e}")
        return False


def read_skill_file(skill_file: str) -> str:
    """Read the current content of a skill file."""
    file_path = SKILLS_DIR / skill_file
    if file_path.exists():
        return file_path.read_text()
    return ""


def update_skill_file(skill_file: str, new_content: str) -> bool:
    """
    Update a skill file with new content.

    Args:
        skill_file: Name of the skill file
        new_content: New content to write

    Returns:
        True if successful, False otherwise
    """
    file_path = SKILLS_DIR / skill_file
    logger.debug(f"Updating skill file: {skill_file}")
    try:
        file_path.write_text(new_content)
        logger.info(f"Successfully updated skill file: {skill_file}")
        return True
    except Exception as e:
        logger.error(f"Error updating skill file {skill_file}: {e}")
        return False


def append_to_skill_file(skill_file: str, section_title: str, content: str) -> bool:
    """
    Append a new section to an existing skill file, or update if section exists.

    Args:
        skill_file: Name of the skill file
        section_title: Title for the new section
        content: Content to append or update

    Returns:
        True if successful, False otherwise
    """
    logger.debug(f"Appending to skill file: {skill_file}, section: {section_title}")
    current_content = read_skill_file(skill_file)

    # Check if this section already exists
    section_header = f"## {section_title}"
    if section_header in current_content:
        logger.info(f"Section '{section_title}' exists in {skill_file}, updating it")
        # Find the section and replace its content up to the next ## header or end of file
        pattern = rf'(## {re.escape(section_title)}\n)(.*?)(?=\n## |\Z)'
        new_section_content = f"## {section_title}\n\n{content}\n"
        updated_content, count = re.subn(pattern, new_section_content, current_content, flags=re.DOTALL)
        if count > 0:
            logger.info(f"Updated existing section '{section_title}'")
            return update_skill_file(skill_file, updated_content)
        else:
            logger.warning(f"Failed to update section '{section_title}' - pattern didn't match")
            return False

    new_section = f"\n## {section_title}\n\n{content}\n"
    updated_content = current_content.rstrip() + "\n" + new_section

    return update_skill_file(skill_file, updated_content)


async def analyze_with_claude(user_input: str, matching_skills: list[dict]) -> Optional[dict]:
    """
    Use Claude Agent SDK to analyze if the user input contains useful new information
    for any of the matching skills.

    Args:
        user_input: The user's input text
        matching_skills: List of skills that matched keyword search

    Returns:
        Dict with skill_name, section_title, and content if update recommended, None otherwise
    """
    logger.debug("Analyzing with Claude Agent SDK...")
    if not HAS_AGENT_SDK:
        logger.warning("Claude Agent SDK not available, using keyword-based matching only")
        return None

    if not matching_skills:
        return None

    # Read current skill contents for context
    skill_contexts = []
    for skill in matching_skills[:3]:  # Limit to top 3 matches
        content = read_skill_file(skill["file"])
        skill_contexts.append({
            "name": skill["name"],
            "file": skill["file"],
            "description": skill["description"],
            "current_content": content[:2000]  # Limit content size
        })

    prompt = f"""Analyze the following user input and determine if it contains useful new information
that should be added to one of the matching skill files.

User Input:
{user_input}

Matching Skills:
{json.dumps(skill_contexts, indent=2)}

Your task:
1. Determine if the user input contains actionable, useful information (code snippets, commands,
   tips, best practices, or documentation) that would enhance one of the skill files.
2. If yes, identify which skill file should be updated and what section title to use.
3. Format the new content appropriately for a markdown skill file.

Respond with JSON in this exact format:
{{
    "should_update": true/false,
    "reason": "explanation of why or why not",
    "skill_name": "name of skill to update (if should_update is true)",
    "section_title": "Title for the new section",
    "content": "Formatted markdown content to add"
}}

Only recommend updates for genuinely useful, actionable information. Do not create updates for
general questions, casual conversation, or information already present in the skill files."""

    try:
        response_text = ""
        async for message in query(
            prompt=prompt,
            options=ClaudeAgentOptions(
                allowed_tools=[],  # No tools needed for analysis
                max_tokens=1000
            )
        ):
            if hasattr(message, 'content'):
                response_text += str(message.content)

        # Extract JSON from response
        json_match = re.search(r'\{[^{}]*\}', response_text, re.DOTALL)
        if json_match:
            result = json.loads(json_match.group())
            if result.get("should_update"):
                logger.info(f"Claude recommends update to skill: {result.get('skill_name')}")
                return result
            else:
                logger.debug(f"Claude decided not to update: {result.get('reason', 'no reason')}")
    except Exception as e:
        logger.error(f"Error analyzing with Claude: {e}")

    return None


def process_input_simple(user_input: str) -> dict:
    """
    Simple processing without Claude Agent SDK.
    Uses keyword matching to find relevant skills.

    Args:
        user_input: The user's input text

    Returns:
        Dict with matching skills and recommendations
    """
    matches = find_matching_skills(user_input)

    return {
        "input": user_input,
        "matching_skills": matches,
        "top_match": matches[0] if matches else None,
        "sdk_available": HAS_AGENT_SDK
    }


async def process_input(
    user_input: str,
    auto_update: bool = False,
    response: str = None,
    force_new_skill: bool = False
) -> dict:
    """
    Process user input from Claude chat window.

    Args:
        user_input: The text from the chat window
        auto_update: Whether to automatically update skill files
        response: Optional response text to save along with the prompt
        force_new_skill: If True, create a new skill instead of updating existing

    Returns:
        Dict containing:
        - matching_skills: List of matched skills
        - update_recommendation: Recommended update (if any)
        - updated: Whether a file was updated
        - save_result: Result of saving prompt/response (if provided)
    """
    # Find matching skills by keywords
    matching_skills = find_matching_skills(user_input)

    result = {
        "input": user_input,
        "matching_skills": matching_skills,
        "update_recommendation": None,
        "updated": False,
        "save_result": None
    }

    # If response is provided, save the prompt/response as a skill
    if response:
        save_result = save_prompt_response_to_skill(
            prompt=user_input,
            response=response,
            matching_skills=matching_skills,
            force_new=force_new_skill
        )
        result["save_result"] = save_result
        result["updated"] = save_result.get("success", False)
        result["message"] = save_result.get("message", "")
        return result

    if not matching_skills:
        result["message"] = "No matching skills found for this input"
        return result

    # Try to analyze with Claude Agent SDK for smarter updates
    if HAS_AGENT_SDK:
        recommendation = await analyze_with_claude(user_input, matching_skills)
        if recommendation:
            result["update_recommendation"] = recommendation

            if auto_update and recommendation.get("should_update"):
                skill_name = recommendation.get("skill_name")
                skill_info = SKILLS.get(skill_name)

                if skill_info:
                    success = append_to_skill_file(
                        skill_info["file"],
                        recommendation.get("section_title", "New Information"),
                        recommendation.get("content", "")
                    )
                    result["updated"] = success
                    if success:
                        result["message"] = f"Updated {skill_info['file']} with new section"
    else:
        result["message"] = "SDK not available, showing keyword matches only"

    return result


def get_all_exchanges_from_transcript(transcript_path: str) -> List[tuple[str, str]]:
    """
    Read the transcript file and extract ALL user prompt and assistant response pairs.

    The transcript format has messages split across multiple entries (one for each turn/tool use).
    A real user prompt is followed by assistant messages (which may include tool_use and text).
    Tool result messages from the user should not reset the current prompt.

    Args:
        transcript_path: Path to the transcript JSONL file

    Returns:
        List of tuples (user_prompt, assistant_response) for all exchanges
    """
    logger.debug(f"Reading all exchanges from transcript: {transcript_path}")
    exchanges = []

    try:
        with open(transcript_path, 'r') as f:
            lines = f.readlines()

        # Parse JSONL - each line is a JSON object
        messages = []
        for line in lines:
            line = line.strip()
            if line:
                try:
                    msg = json.loads(line)
                    messages.append(msg)
                except json.JSONDecodeError:
                    continue

        # Extract all user/assistant pairs
        # Key insight: user messages with tool_result content are NOT new prompts
        # We need to accumulate assistant text responses until we see a new real user prompt
        current_user_prompt = ""
        current_assistant_response = ""

        for msg in messages:
            msg_type = msg.get("type", "")

            if msg_type == "user":
                # Check if this is a tool result or a real user prompt
                content = msg.get("message", {}).get("content", "")
                is_tool_result = False

                if isinstance(content, list):
                    # Check if content contains tool_result type
                    for part in content:
                        if isinstance(part, dict) and part.get("type") == "tool_result":
                            is_tool_result = True
                            break

                    if not is_tool_result:
                        # This is a real user prompt - extract text
                        text_parts = []
                        for part in content:
                            if isinstance(part, dict) and part.get("type") == "text":
                                text_parts.append(part.get("text", ""))
                            elif isinstance(part, str):
                                text_parts.append(part)
                        new_prompt = "\n".join(text_parts).strip()

                        # If we have a previous exchange, save it before starting new one
                        if current_user_prompt and current_assistant_response:
                            exchanges.append((current_user_prompt, current_assistant_response))
                            logger.debug(f"Saved exchange: prompt={current_user_prompt[:50]}...")

                        # Start new exchange if this prompt has content
                        if new_prompt:
                            current_user_prompt = new_prompt
                            current_assistant_response = ""  # Reset for new exchange

                elif isinstance(content, str) and content.strip():
                    # String content is a real user prompt
                    if current_user_prompt and current_assistant_response:
                        exchanges.append((current_user_prompt, current_assistant_response))
                        logger.debug(f"Saved exchange: prompt={current_user_prompt[:50]}...")

                    current_user_prompt = content
                    current_assistant_response = ""

            elif msg_type == "assistant" and current_user_prompt:
                # Extract text content from assistant message and accumulate it
                content = msg.get("message", {}).get("content", [])
                if isinstance(content, list):
                    for part in content:
                        if isinstance(part, dict) and part.get("type") == "text":
                            text = part.get("text", "").strip()
                            if text:
                                if current_assistant_response:
                                    current_assistant_response += "\n\n" + text
                                else:
                                    current_assistant_response = text
                elif isinstance(content, str) and content.strip():
                    if current_assistant_response:
                        current_assistant_response += "\n\n" + content
                    else:
                        current_assistant_response = content

        # Don't forget the last exchange if any
        if current_user_prompt and current_assistant_response:
            exchanges.append((current_user_prompt, current_assistant_response))
            logger.debug(f"Saved final exchange: prompt={current_user_prompt[:50]}...")

        logger.info(f"Extracted {len(exchanges)} exchanges from transcript")
        return exchanges

    except Exception as e:
        logger.error(f"Error reading transcript: {e}")
        return []


def get_last_exchange_from_transcript(transcript_path: str) -> tuple[str, str]:
    """
    Read the transcript file and extract the last user prompt and assistant response.

    Args:
        transcript_path: Path to the transcript JSONL file

    Returns:
        Tuple of (last_user_prompt, last_assistant_response)
    """
    exchanges = get_all_exchanges_from_transcript(transcript_path)
    if exchanges:
        return exchanges[-1]
    return "", ""


def _clean_prompt_for_check(prompt: str) -> str:
    """
    Strip system/IDE tags from prompt for actionability check.
    Note: Use clean_prompt_text() for the full cleaning function.
    """
    clean = prompt
    # Remove <ide_opened_file>...</ide_opened_file> tags and content
    clean = re.sub(r'<ide_opened_file>.*?</ide_opened_file>', '', clean, flags=re.DOTALL)
    # Remove <ide_selection>...</ide_selection> tags and content
    clean = re.sub(r'<ide_selection>.*?</ide_selection>', '', clean, flags=re.DOTALL)
    # Remove <system-reminder>...</system-reminder> tags and content
    clean = re.sub(r'<system-reminder>.*?</system-reminder>', '', clean, flags=re.DOTALL)
    # Remove any remaining unclosed tags of these types
    clean = re.sub(r'<ide_opened_file>[^<]*', '', clean)
    clean = re.sub(r'<ide_selection>[^<]*', '', clean)
    clean = re.sub(r'<system-reminder>[^<]*', '', clean)
    return clean.strip()


def is_actionable_exchange(prompt: str, response: str) -> bool:
    """
    Determine if an exchange contains actionable information worth saving.

    Args:
        prompt: The user's prompt
        response: The assistant's response

    Returns:
        True if the exchange contains actionable information
    """
    # First, strip out system/IDE tags to get the actual user content
    clean_prompt = _clean_prompt_for_check(prompt)

    logger.debug(f"Clean prompt after stripping tags: {clean_prompt[:100]}...")

    # Skip very short exchanges (use cleaned prompt for length check)
    if len(clean_prompt) < 10 or len(response) < 50:
        logger.debug(f"Skipping short exchange: prompt={len(clean_prompt)}, response={len(response)}")
        return False

    # Skip if prompt is ONLY system/IDE content (nothing left after stripping)
    if not clean_prompt:
        logger.debug("Skipping exchange: only system/IDE content, no user prompt")
        return False

    # Skip certain question types and meta-discussions
    skip_patterns = [
        r'^(what|how|why|can you|do you|are you)\b.*\?$',
        r'why were skills',
        r'settings\.json',
        r'process_skill',
        # Meta questions about the hook itself
        r'why didn.t.*update',
        r'hook.*not.*work',
    ]
    prompt_lower = clean_prompt.lower().strip()
    for pattern in skip_patterns:
        if re.search(pattern, prompt_lower, re.IGNORECASE):
            logger.debug(f"Skipping due to skip pattern: {pattern}")
            return False

    # Look for indicators of actionable content
    actionable_indicators = [
        # Code changes
        r'\b(change|update|set|modify|fix|add|remove|edit)\b.*\b(to|from)\b',
        r'\b(should be|must be|needs to be)\b',
        r'\b\d+\b',  # Contains numbers (like settings values)
        # Configuration
        r'\b(config|setting|parameter|threshold|limit|value)\b',
        # Implementation
        r'\b(implement|create|build|write)\b',
    ]

    for pattern in actionable_indicators:
        if re.search(pattern, prompt_lower):
            return True

    # Check if response indicates changes were made
    response_lower = response.lower()
    change_indicators = [
        r'(updated|changed|modified|set|fixed)',
        r'(done|complete|finished)',
        r'(now|currently)',
    ]
    for pattern in change_indicators:
        if re.search(pattern, response_lower):
            return True

    return False


def clean_prompt_text(prompt: str) -> str:
    """
    Strip system/IDE tags from prompt to get actual user content.

    Args:
        prompt: Raw prompt which may contain IDE/system tags

    Returns:
        Cleaned prompt with tags removed
    """
    clean = prompt
    # Remove <ide_opened_file>...</ide_opened_file> tags and content
    clean = re.sub(r'<ide_opened_file>.*?</ide_opened_file>', '', clean, flags=re.DOTALL)
    # Remove <ide_selection>...</ide_selection> tags and content
    clean = re.sub(r'<ide_selection>.*?</ide_selection>', '', clean, flags=re.DOTALL)
    # Remove <system-reminder>...</system-reminder> tags and content
    clean = re.sub(r'<system-reminder>.*?</system-reminder>', '', clean, flags=re.DOTALL)
    # Remove any remaining unclosed tags of these types
    clean = re.sub(r'<ide_opened_file>[^<]*', '', clean)
    clean = re.sub(r'<ide_selection>[^<]*', '', clean)
    clean = re.sub(r'<system-reminder>[^<]*', '', clean)
    return clean.strip()


def save_last_actionable_exchange(transcript_path: str) -> List[dict]:
    """
    Process only the LAST exchange from a transcript and save if actionable.
    This is called at Stop event to save the most recent prompt/response.

    Args:
        transcript_path: Path to the transcript JSONL file

    Returns:
        List with single result if saved, empty list otherwise
    """
    prompt, response = get_last_exchange_from_transcript(transcript_path)
    results = []

    if not prompt or not response:
        logger.debug("No complete exchange found in transcript")
        return results

    # Check if this exchange is actionable
    if not is_actionable_exchange(prompt, response):
        logger.debug(f"Skipping non-actionable exchange: {prompt[:50]}...")
        return results

    # Clean the prompt to remove IDE/system tags for skill matching
    clean_prompt = clean_prompt_text(prompt)

    # Find matching skills based on both cleaned prompt and response content
    matching_skills = find_matching_skills(clean_prompt + " " + response)

    if matching_skills:
        result = save_prompt_response_to_skill(
            prompt=clean_prompt,  # Use cleaned prompt for saving
            response=response,
            matching_skills=matching_skills,
            force_new=False
        )
        results.append(result)
        logger.info(f"Saved exchange to skill: {result}")
    else:
        logger.debug("No matching skills found for this exchange")

    return results


def save_all_actionable_exchanges(transcript_path: str) -> List[dict]:
    """
    Process all exchanges from a transcript and save actionable ones to skills.
    Use save_last_actionable_exchange() for Stop event (recommended).

    Args:
        transcript_path: Path to the transcript JSONL file

    Returns:
        List of results for each saved exchange
    """
    exchanges = get_all_exchanges_from_transcript(transcript_path)
    results = []

    for prompt, response in exchanges:
        # Check if this exchange is actionable
        if not is_actionable_exchange(prompt, response):
            logger.debug(f"Skipping non-actionable exchange: {prompt[:50]}...")
            continue

        # Find matching skills
        matching_skills = find_matching_skills(prompt + " " + response)

        if matching_skills:
            result = save_prompt_response_to_skill(
                prompt=prompt,
                response=response,
                matching_skills=matching_skills,
                force_new=False
            )
            results.append(result)
            logger.info(f"Saved exchange to skill: {result}")

    return results


def main():
    """
    Main entry point for the hook.

    Reads user input from stdin (as provided by Claude Code hooks)
    and processes it to find/update relevant skills.

    Claude Code Hook Input JSON format:
    For UserPromptSubmit:
    {
        "session_id": "abc123",
        "transcript_path": "/path/to/transcript.jsonl",
        "hook_event_name": "UserPromptSubmit",
        "prompt": "user's prompt/question"
    }

    For Stop:
    {
        "session_id": "abc123",
        "transcript_path": "/path/to/transcript.jsonl",
        "hook_event_name": "Stop",
        "stop_hook_active": false
    }

    Or command line:
        process_skill.py "prompt" ["response"]
    """
    logger.info("=" * 60)
    logger.info("process_skill.py started")
    logger.debug(f"Arguments: {sys.argv}")

    user_input = ""
    response = None
    force_new = False
    hook_event_name = None

    # First check command line args (highest priority)
    if len(sys.argv) > 1:
        logger.debug("Reading input from command line arguments")
        user_input = sys.argv[1]
        if len(sys.argv) > 2:
            response = sys.argv[2]
        if len(sys.argv) > 3 and sys.argv[3].lower() in ('true', '1', 'yes', 'new'):
            force_new = True
    # Then check stdin (for Claude Code hook format)
    elif not sys.stdin.isatty():
        logger.debug("Reading input from stdin")
        stdin_content = sys.stdin.read().strip()
        logger.debug(f"Stdin content length: {len(stdin_content)}")
        if stdin_content:
            try:
                hook_input = json.loads(stdin_content)
                logger.debug(f"Parsed hook input keys: {list(hook_input.keys())}")

                hook_event_name = hook_input.get("hook_event_name", "")
                transcript_path = hook_input.get("transcript_path", "")

                if hook_event_name == "UserPromptSubmit":
                    # For UserPromptSubmit, we only have the prompt (no response yet)
                    # Check for critical skill warnings, then exit
                    user_input = hook_input.get("prompt", "")
                    logger.info(f"UserPromptSubmit event - prompt: {user_input[:100]}...")

                    # Quick filter: skip IDE events and system messages early
                    prompt_lower = user_input.lower()
                    skip_patterns = [
                        r'(the\s+)?user\s+opened\s+(the\s+)?file',
                        r'ide_opened_file',
                        r'ide_selection',
                        r'<ide_opened_file>',
                        r'<ide_selection>',
                        r'<system-reminder>',
                    ]
                    for pattern in skip_patterns:
                        if re.search(pattern, prompt_lower, re.IGNORECASE):
                            logger.info(f"Skipping IDE/system event: {pattern}")
                            print("Success")  # Return success but don't process
                            sys.exit(0)

                    # Clean the prompt and check for critical skill warnings
                    clean_prompt = _clean_prompt_for_check(user_input)
                    warning = check_critical_skill_warning(clean_prompt)

                    if warning:
                        logger.info(f"Critical skill warning triggered: {warning}")
                        # Output warning message - this will be shown to the user
                        print(warning)
                        sys.exit(0)

                    # For UserPromptSubmit, just acknowledge and exit
                    # The actual skill saving will happen at Stop event when we have the response
                    logger.info("UserPromptSubmit acknowledged - skill saving deferred to Stop event")
                    print("Success")
                    sys.exit(0)

                elif hook_event_name == "Stop":
                    # For Stop event, process the LAST exchange from transcript
                    # This saves the most recent prompt/response as a skill if actionable
                    logger.info("Stop event - processing last exchange from transcript")
                    if transcript_path and not hook_input.get("stop_hook_active", False):
                        results = save_last_actionable_exchange(transcript_path)
                        if results:
                            logger.info(f"Saved {len(results)} exchange(s) to skills")
                            print(json.dumps({"saved_exchanges": len(results), "results": results}, indent=2))
                        else:
                            logger.info("No actionable exchange found to save")
                        sys.exit(0)
                    else:
                        logger.warning("Stop hook active or no transcript path, skipping")
                        sys.exit(0)

                else:
                    # Fallback for other formats
                    user_input = hook_input.get("prompt", "") or hook_input.get("input", "")
                    response = hook_input.get("response", None)

                force_new = hook_input.get("force_new", False)

            except json.JSONDecodeError as e:
                # Fallback to raw text
                logger.warning(f"JSON decode error: {e}, falling back to raw text")
                user_input = stdin_content

    if not user_input:
        logger.warning("No input provided, exiting")
        print("Usage: process_skill.py <prompt> [response] [force_new]")
        print("  or pipe JSON: echo '{\"prompt\": \"...\", \"response\": \"...\"}' | process_skill.py")
        print("")
        print("Options:")
        print("  prompt     - The user's question or topic")
        print("  response   - Claude's response to save (optional)")
        print("  force_new  - Create new skill instead of updating (true/false)")
        sys.exit(0)  # Exit with 0 to not block Claude Code

    logger.info(f"Processing input: {user_input[:100]}...")
    logger.info(f"Has response: {response is not None}, force_new: {force_new}")

    # Process the input
    if HAS_AGENT_SDK or response:
        logger.debug("Using async process_input")
        result = asyncio.run(process_input(
            user_input,
            auto_update=False,
            response=response,
            force_new_skill=force_new
        ))
    else:
        logger.debug("Using simple process_input (no SDK)")
        result = process_input_simple(user_input)

    # Output result as JSON
    logger.info(f"Result: success={result.get('save_result', {}).get('success') if result.get('save_result') else 'N/A'}")
    logger.debug(f"Full result: {json.dumps(result, indent=2)}")
    print(json.dumps(result, indent=2))

    # Return appropriate exit code
    if result.get("save_result"):
        exit_code = 0 if result["save_result"].get("success") else 1
        logger.info(f"Exiting with code {exit_code}")
        sys.exit(exit_code)
    exit_code = 0 if result.get("matching_skills") else 1
    logger.info(f"Exiting with code {exit_code}")
    sys.exit(exit_code)


if __name__ == "__main__":
    main()
