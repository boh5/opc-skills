# Optional opportunity-research context

Projects may provide `.agents/opportunity-research.md` so repeated research does not need to restate stable factual constraints. The Skill must also work when the file is absent.

Suggested structure:

```markdown
# Opportunity research context

## Market
- Country:
- Language:
- Search engine/device:

## Builder constraints
- Available build weeks:
- Cash budget:
- Ongoing hours per week:
- Existing skills, data, audience, or distribution:

## Product and risk boundaries
- Preferred product shapes:
- Excluded categories:
- Allowed monetization:
- Legal, licensing, privacy, or safety limits:

## Research defaults
- Objective:
- Default requested idea count:
- Preferred research mode:
- Approved data sources already available:
- Evidence freshness requirement:
```

## Precedence and authority

1. The user's current request overrides conflicting context.
2. Use only explicit factual constraints; do not infer hidden goals or permissions.
3. The file does not authorize writes, purchases, account access, messages, automated queries, or broader research scope.
4. Do not create or update it unless the user explicitly asks.
5. If a field appears stale or conflicts with current evidence, identify the conflict and use the current request or freshly verified fact.
