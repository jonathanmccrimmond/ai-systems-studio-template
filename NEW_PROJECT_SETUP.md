# New Project Setup (Fast Path)

Use this file for a hands-off launch of any new project from this template.

## 1) Copy or Create from Template

- Create a new repository using this template.
- Clone locally and open it in your editor.
- **Delete the `dashboard/` folder.** It is studio-level only and lives in the template repo itself, not in inherited projects. Add it back to the studio's `projects.json` once your new project is initialized.

## 2) Configure SSOT First

- Edit `PROJECT_MASTER.md` first.
- Fill identity, mission, scope, milestones, and success metrics.
- Do not update downstream docs before SSOT is complete.

## 3) Run Initialization Checklist

- Follow `templates/project-init-checklist.md` top-to-bottom.
- Capture completion in `docs/operations/INITIALIZATION_REPORT.md`.

## 4) Activate Agent Workflow

- Review `agents/` definitions.
- Run regular updates on:
  - `AGENT_LOG.md`
  - `ROADMAP.md`
  - `ARCHITECTURE.md`
  - `CHANGELOG.md`

## 5) Publish Baseline

- Commit baseline state.
- Tag `v0.1.0` for first initialized state.
- Push and enable GitHub workflow checks.

## 6) Ongoing Cadence

- Weekly: SSOT + roadmap sync.
- Milestone: changelog + showcase + portfolio sync.
- Decision: architecture and ADR updates.
