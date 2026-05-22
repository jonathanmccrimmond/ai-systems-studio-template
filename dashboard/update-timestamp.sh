#!/usr/bin/env bash
# Updates the `last_updated` field in projects.json with the latest commit
# date that touched the dashboard/ folder. Run before committing dashboard
# changes so the deployed footer shows a meaningful timestamp.
#
# Usage:  ./dashboard/update-timestamp.sh
#
# Idempotent — safe to run anytime. Uses git, not file mtime, so it survives
# fresh clones.

set -euo pipefail

cd "$(dirname "$0")/.."

# Latest commit date touching the dashboard folder, ISO-8601, UTC.
LAST=$(git log -1 --format=%cI -- dashboard/ 2>/dev/null || true)

if [ -z "$LAST" ]; then
  # No commits touching dashboard/ yet — fall back to now.
  LAST=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
fi

# In-place edit projects.json. macOS sed needs the empty arg after -i.
SED_INPLACE=(-i '')
if sed --version >/dev/null 2>&1; then
  # GNU sed
  SED_INPLACE=(-i)
fi

sed "${SED_INPLACE[@]}" -E "s|\"last_updated\":[[:space:]]*\"[^\"]*\"|\"last_updated\": \"${LAST}\"|" dashboard/projects.json

echo "dashboard/projects.json last_updated set to ${LAST}"
