# Project Initialization Checklist

Use this checklist whenever creating a new project from the AI Systems Studio Template.

## 1. Repository Setup

- [ ] Create new repository from template
- [ ] Confirm directory structure exists
- [ ] Confirm required starter files exist
- [ ] Configure branch protections and repository settings

## 2. Initialize SSOT

- [ ] Rename and update `PROJECT_MASTER.md`
- [ ] Fill mission, scope, stakeholders, and metrics
- [ ] Define initial milestones and roadmap alignment
- [ ] Record initial architecture assumptions

## 3. Documentation Baseline

- [ ] Create first project docs using `templates/docs/project-documentation-template.md`
- [ ] Link docs back to `PROJECT_MASTER.md`
- [ ] Define ownership and update cadence

## 4. Architecture Tracking

- [ ] Add first ADR in `ARCHITECTURE.md`
- [ ] Generate initial diagrams from `templates/architecture/architecture-diagram-template.md`
- [ ] Capture known risks and open questions

## 5. Showcase and Portfolio

- [ ] Create initial deck from `templates/slides/google-slides-showcase-template.md`
- [ ] Create portfolio page draft from `templates/notion/notion-project-page-template.md`
- [ ] Add initial assets to `assets/`

## 6. Agent Operations

- [ ] Review agent definitions in `agents/`
- [ ] Assign human owner for approvals
- [ ] Start logging runs in `AGENT_LOG.md`

## 7. Governance and Change Tracking

- [ ] Add initial entry in `CHANGELOG.md`
- [ ] Confirm roadmap in `ROADMAP.md`
- [ ] Validate all downstream artifacts align with SSOT

## 8. CI and Quality

- [ ] Enable `.github/workflows/template-validation.yml`
- [ ] Add project-specific checks as needed
- [ ] Run validation before first release

## Definition of Ready

A project is ready when:
- `PROJECT_MASTER.md` is complete and current
- Docs, roadmap, and architecture are aligned
- Showcase and portfolio drafts exist
- Agent operations and logging are active
