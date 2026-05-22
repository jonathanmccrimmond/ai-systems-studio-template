# Studio Dashboard

A static HTML dashboard that showcases all AI Systems Studio projects in one place.

## Studio-only — do not inherit

This `dashboard/` folder belongs to the **template repo itself**, which doubles as the studio hub. It is **not** part of what gets inherited into new projects.

When initializing a new project from this template, delete the `dashboard/` folder as the first cleanup step (see `NEW_PROJECT_SETUP.md`).

## Structure

- `index.html` — single-page shell
- `app.js` — fetches `projects.json` and renders cards
- `styles.css` — light/dark adaptive styling
- `projects.json` — the manifest (the only file you normally edit)

## Editing projects

Add or update entries in `projects.json`. Each project has:

```json
{
  "code": "CPI-ENG-001",
  "name": "CPI Engine",
  "status": "Active",
  "pitch": "One-line description that reads well on a card.",
  "slide_deck": "https://..."
}
```

`status` values that get a coloured badge: `Active`, `Planning`, `Shipped`, `Archived`. Any other value will render as the default.

## Keeping the timestamp current

Before committing any dashboard change, run:

```bash
./dashboard/update-timestamp.sh
```

This pulls the latest commit date touching `dashboard/` from git and writes it into `projects.json.last_updated`. The footer in the rendered dashboard shows the date.

## Running locally

Browsers block `fetch("projects.json")` over the `file://` protocol. Serve the folder over HTTP:

```bash
cd dashboard
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploying

Push the template repo and enable GitHub Pages with source = `main` branch, folder = `/dashboard`. The dashboard will be live at `https://<user>.github.io/ai-systems-studio-template/`.

## Keeping it in sync with SSOT

Each project's `PROJECT_MASTER.md` is the source of truth for name, status, and pitch. When a project's identity changes, update its `PROJECT_MASTER.md` first, then mirror the change into `projects.json` here.
