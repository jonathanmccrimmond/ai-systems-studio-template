# PRIVATE_PROJECT_POLICY

This policy defines what can be shared, where it can be stored, and how agents and humans must handle project information.

## Data Classifications

### Public
- Examples: Published blog posts, approved showcase slides, approved portfolio summaries, open-source documentation.
- Storage Expectations: May be stored in public repositories and public cloud tools.
- Documentation Rules: Must still be accurate and aligned with `PROJECT_MASTER.md`.
- Showcase Restrictions: Allowed after owner approval.
- Portfolio Restrictions: Allowed after owner approval.
- Social Media Restrictions: Allowed after owner approval.

### Internal
- Examples: Draft plans, working notes, non-sensitive architecture discussions, in-progress agent outputs.
- Storage Expectations: Store in private repos/workspaces with collaborator-only access.
- Documentation Rules: Can be documented in internal files; do not present as final external messaging.
- Showcase Restrictions: Only approved excerpts may be included.
- Portfolio Restrictions: Only approved summaries may be included.
- Social Media Restrictions: Do not post directly; convert to approved Public content first.

### Confidential
- Examples: API keys, secrets, credentials, private client data, unreleased business strategy, financial details, legal or contract terms.
- Storage Expectations: Store only in approved secret managers or protected local environment files; never commit to git.
- Documentation Rules: Reference minimally and redact sensitive values.
- Showcase Restrictions: Prohibited.
- Portfolio Restrictions: Prohibited.
- Social Media Restrictions: Prohibited.

## Agent Publishing Rule

No agent may publish, export, or share Confidential information in any channel (repository, showcase, portfolio, social media, chat, or third-party tools).

## Enforcement

- Treat unknown sensitivity as Confidential until classified.
- Escalate uncertain classifications to the project owner before sharing.
- If exposure is detected, stop distribution, notify owner, and rotate affected credentials immediately.
