# AI Systems Studio Template

This repository is the base template for all future AI Systems Studio projects.

## Purpose

Use this template to start every new project with a consistent operating system for:
- project documentation
- architecture decision tracking
- showcase slide updates
- portfolio updates
- social media-ready outputs

## Core Principle

`PROJECT_MASTER.md` is the single source of truth (SSOT).

Every other file (roadmap, architecture, changelog, agent logs, slides, portfolio updates) must align with and trace back to the current state captured in `PROJECT_MASTER.md`.

## Repository Structure

- `PROJECT_MASTER.md`: canonical project definition and operating state
- `CHANGELOG.md`: dated change history tied to project milestones
- `ROADMAP.md`: prioritized work plan and timeline
- `ARCHITECTURE.md`: architecture, decisions, and technical rationale
- `AGENT_LOG.md`: execution log of agent activity and outputs
- `docs/`: project-specific documentation artifacts
- `slides/`: generated or source showcase decks
- `assets/`: visual/media assets used across docs, slides, and social
- `agents/`: role definitions and operating prompts for internal agents
- `templates/`: reusable templates for docs, slides, Notion, and diagrams
- `.github/workflows/`: CI automation and quality checks

## How Future Projects Inherit This

1. Create a new repository from this template.
2. Rename and initialize project identity in `PROJECT_MASTER.md`.
3. Keep all downstream files synchronized with `PROJECT_MASTER.md`.
4. Use `/templates` to generate project-specific docs, decks, and pages.
5. Configure and run agents from `/agents` to keep outputs current.

## Expected Lifecycle for Every Project

Every project derived from this template should eventually:
- maintain its own documentation in `docs/`
- update showcase slides in `slides/`
- update portfolio entries (via templates/notion and showcase artifacts)
- track architecture decisions in `ARCHITECTURE.md` and diagram templates

## Suggested Operating Cadence

- Weekly: update `PROJECT_MASTER.md`, `ROADMAP.md`, and `AGENT_LOG.md`
- Milestone-based: update `CHANGELOG.md`, `slides/`, and portfolio outputs
- Decision-based: update `ARCHITECTURE.md` with ADR-style entries

## CI Workflow Placeholder

A starter workflow file is included at `.github/workflows/template-validation.yml`.
Customize it per project for linting, link checks, docs checks, and release automation.
