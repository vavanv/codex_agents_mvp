# Phase 6B — Real Project Portability Demonstration

Execute one explicitly authorized, uninterrupted three-agent development workflow in:

`C:\Develop\agents\phase6a`

## Objective

Add `rename(id, title)` to the existing Node.js task-store module.

Acceptance criteria:

- Rename an existing task by ID.
- Trim and validate the new title.
- Reject invalid or empty titles.
- Return an appropriate error for nonexistent IDs, following existing project conventions.
- Preserve task ID, insertion order, task count, and other properties.
- Preserve defensive-copy behavior.
- Add meaningful tests for successful and invalid renaming.

## Authorized modification scope

Only these application files may change:

- `src/task-store.js`
- `test/task-store.test.js`

## Execution

Read the existing project-local `AGENTS.md` and `workflows/develop.md`.

Use `collaboration.spawn_agent` and actual named `agent_type` selections.

Run these stages sequentially, waiting for each to finish:

1. `quick_implementer`: Implement the feature and tests.
2. `code_validator`: Run the required validation commands, capture exit codes and test counts. Do not edit files.
3. `code_reviewer`: Independently inspect the identical validated candidate and return APPROVE or REQUEST_CHANGES. Do not edit files.

## Validation commands

From the project root:

```powershell
rtk proxy node --check src/task-store.js
rtk proxy node --check test/task-store.test.js
rtk proxy node --test test/task-store.test.js
```

Record each command's actual exit code. All checks and tests must pass.

## Candidate integrity

Use Python standard-library `hashlib`.

Record initial candidate and relevant workspace state.

After implementation, validation, and review, compare source/test hashes and the authorized file inventory.

Support expected modifications while rejecting unexpected changes outside the approved scope.

## Restrictions

- No generic-agent substitution.
- No automatic retries or recovery.
- No installations or dependency changes.
- No global configuration or sandbox changes.
- No commits or pushes.
- No custom coordinator or runner.
- Stop immediately on a required-stage failure.
- Preserve the original MVP and V2 projects unchanged.

## Final report

Provide:

1. Actual three named agent sessions.
2. Files modified.
3. Feature implementation summary.
4. Exact validation commands and exit codes.
5. Total passing, failing, and skipped tests.
6. Independent reviewer verdict and findings.
7. Candidate SHA-256 comparison.
8. Unexpected modifications, if any.
9. Final PASS / FAILED / UNVERIFIED / SETUP_REQUIRED.

Report **MVP_PORTABILITY_PASS** only if all three named agents complete sequentially, all required checks pass, the reviewer approves the identical candidate, and no unauthorized modifications or manual recovery occur.

Preserve historical interrupted attempts as UNVERIFIED.
