# Intelligence Usage Ledger

This directory records **how development intelligence is used**, not product telemetry and not raw agent transcripts.

## Purpose

The ledger exists to answer questions such as:

- Was prior intelligence retrieved before substantial work?
- Which Rule/Failure/Pattern was actually used?
- Was retrieved knowledge rejected after checking current code?
- Did prior knowledge plausibly prevent a repeat failure?
- Was extraction evaluated after work?
- Did work produce a contradiction or new knowledge?

## Storage model

Store compact JSONL event files under year/month partitions:

`usage/YYYY/MM/events.jsonl`

Each line follows `schemas/intelligence-event.schema.json`.

Do not store chain-of-thought, prompts, full conversations, raw logs, secrets, source code, customer data, or sensitive payloads.

## Event discipline

A retrieval event means the intelligence index/entries were actually consulted. `knowledge_used` means an entry materially affected investigation, implementation, verification, or avoidance. `knowledge_rejected` is equally valuable: it means the agent checked remembered guidance and current reality showed it should not be applied.

`failure_prevented` must not be guessed. Record it only when there is a concrete counterfactual signal, such as a known prior failure check catching the same unsafe condition before release.

## Metrics

Aggregate this ledger into `metrics/intelligence-health.json` periodically. Keep unknown outcome metrics null until sufficient observations exist.