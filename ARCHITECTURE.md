# ARCHITECTURE

Last Synced With PROJECT_MASTER:
Date: [YYYY-MM-DD]
Reviewer: [Name]

This file tracks architecture design, decisions, and rationale.

## 1. System Overview

The AI Systems Studio Template is a meta-repository architecture that standardizes project operations across:
- strategy (`PROJECT_MASTER.md`)
- execution (`ROADMAP.md`)
- technical decisions (`ARCHITECTURE.md`)
- communications (`slides/`, portfolio, social outputs)

## 2. Architecture Principles

- SSOT-first: `PROJECT_MASTER.md` governs all derivative artifacts.
- Traceability: every major output links back to source goals.
- Modularity: templates and agents are reusable across projects.
- Evolvability: decisions are documented with ADR entries.

## 3. Repository-Level Components

- `docs/`: narrative and technical documentation modules
- `slides/`: showcase presentation sources/exports
- `assets/`: shared media artifacts
- `agents/`: autonomous role definitions and prompts
- `templates/`: reusable scaffolds for consistent outputs
- `.github/workflows/`: automated validation and operational checks

## 4. Decision Record (ADR Index)

### ADR-001: PROJECT_MASTER as SSOT
- Status: Accepted
- Date: 2026-05-21
- Decision: `PROJECT_MASTER.md` is the canonical state document.
- Consequence: All other planning/communication artifacts must reference and align with it.

## 5. Open Questions

- What level of CI validation should enforce SSOT alignment?
- Which outputs are mandatory per milestone vs optional?
- What agent orchestration model best fits team size and cadence?

## 6. Diagram References

See template diagrams in `templates/architecture/`.
