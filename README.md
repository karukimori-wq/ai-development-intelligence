# AI Development Intelligence

A repository-native external memory and reusable decision intelligence layer for AI-assisted software development.

## Purpose

This repository preserves useful reasoning outcomes across development sessions so future agents can start from verified prior knowledge instead of repeatedly rediscovering the same facts.

It stores two different things:

- **Project memory**: what happened in a specific project, including decisions, failures, evidence, and current state.
- **Reusable knowledge**: cross-project discoveries, patterns, and rules that can change future engineering decisions.

This repository is not a replacement for product source code or authoritative platform contracts. Product repositories remain the source of truth for their code. Formal cross-application contracts remain in their dedicated contracts repository.

## Core principle

> Give the agent a map, not the whole library.

`AGENTS.md` stays small and tells agents how to navigate. Detailed knowledge is retrieved only when relevant.

## Phase 1 workflow

1. Understand the task.
2. Search the index and relevant memory before acting.
3. Read only the most relevant knowledge and evidence.
4. Perform the engineering work in the target repository.
5. Capture reusable discoveries, failures, and decisions.
6. Attach verifiable evidence.
7. Strengthen an existing entry instead of duplicating it.
8. Promote repeated observations from discovery to pattern to rule only when evidence supports promotion.

## Repository map

- `AGENTS.md` — compact operating instructions for AI agents.
- `core/` — governance, lifecycle, retrieval, and promotion rules.
- `knowledge/` — reusable discoveries, failures, decisions, patterns, and rules.
- `memory/` — project-specific memory and reconnect points.
- `evidence/` — evidence records that support knowledge claims.
- `schemas/` — machine-readable schemas.
- `templates/` — templates for consistent capture.
- `index/` — lightweight retrieval index.

## Knowledge lifecycle

`observation -> discovery/failure/decision -> repeated evidence -> pattern -> verified rule`

Promotion is evidence-based, never automatic merely because an agent wrote something down.

## Phase 1 scope

Phase 1 intentionally uses GitHub as the human-readable system of record. No vector database is required yet. A future indexing service may mirror this repository for faster retrieval, while GitHub remains authoritative.
