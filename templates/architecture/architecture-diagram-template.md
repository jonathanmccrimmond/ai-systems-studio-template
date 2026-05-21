# Architecture Diagram Template

Use this template as a source for Mermaid or diagram tooling.

## Context Diagram (Mermaid)

```mermaid
flowchart LR
  User[User / Stakeholder] --> Studio[AI Systems Studio Project]
  Studio --> Docs[Documentation Layer]
  Studio --> Build[Build / Product Layer]
  Studio --> Showcase[Showcase Layer]
  Studio --> Portfolio[Portfolio Layer]
  Studio --> Social[Social Distribution Layer]

  Docs --> Master[PROJECT_MASTER SSOT]
  Build --> Master
  Showcase --> Master
  Portfolio --> Master
  Social --> Master
```

## Container Diagram Skeleton

```mermaid
flowchart TB
  SSOT[PROJECT_MASTER.md]
  Roadmap[ROADMAP.md]
  Arch[ARCHITECTURE.md]
  Changelog[CHANGELOG.md]
  AgentLog[AGENT_LOG.md]

  Agents[Agents]
  Docs[docs/]
  Slides[slides/]
  Assets[assets/]
  Templates[templates/]

  SSOT --> Roadmap
  SSOT --> Arch
  SSOT --> Changelog
  SSOT --> Agents
  Agents --> Docs
  Agents --> Slides
  Agents --> Assets
  Templates --> Docs
  Templates --> Slides
  AgentLog --> Agents
```

## Diagram Notes
- Keep naming consistent with actual repository paths.
- Update diagrams whenever architecture decisions change.
- Reflect accepted ADRs in visual flow changes.
