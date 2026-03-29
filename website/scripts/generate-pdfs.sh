#!/bin/bash
set -euo pipefail

# Generate PDFs from built Astro HTML using weasyprint.
# Run after `npm run build` — converts the static print pages in dist/ to PDF.
# Requires: weasyprint (pip install weasyprint)

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WEBSITE_DIR="$(dirname "$SCRIPT_DIR")"
DIST_DIR="${WEBSITE_DIR}/dist"

if [ ! -d "$DIST_DIR" ]; then
  echo "Error: dist/ not found. Run 'npm run build' first."
  exit 1
fi

if ! command -v weasyprint &> /dev/null; then
  echo "Error: weasyprint not found. Install with: pip install weasyprint"
  exit 1
fi

# The built HTML references assets at /bridge-docs/ (the Astro base path).
# Rewrite these to absolute file:// URLs so weasyprint can resolve them locally.
DIST_URL="file://${DIST_DIR}/"

PAGES=(
  "print/our-system/index.html|downloads/our-system-convention-card.pdf"
  "print/sayc/index.html|downloads/sayc-convention-card.pdf"
  "print/transition-guide/index.html|downloads/transition-guide.pdf"
)

mkdir -p "${DIST_DIR}/downloads"

for entry in "${PAGES[@]}"; do
  IFS='|' read -r src dest <<< "$entry"
  src_path="${DIST_DIR}/${src}"

  if [ ! -f "$src_path" ]; then
    echo "Warning: ${src} not found in dist/, skipping."
    continue
  fi

  echo "Generating ${dest}..."
  sed "s|/bridge-docs/|${DIST_URL}|g" "$src_path" | weasyprint - "${DIST_DIR}/${dest}"
done

echo "PDF generation complete."
