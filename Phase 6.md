# Codex Agents MVP — Phase 6: Real Project Integration

## Objective

Validate that the reusable multi-agent development workflow completed in Phase 5C can operate in an independent software project.

The successful Phase 5B demonstration established:

- `quick_implementer` — implementation completed.
- `code_validator` — TypeScript exit 0, Jest 32/32 tests passed.
- `code_reviewer` — APPROVE, no findings.
- Candidate hashes matched throughout the workflow.
- All three named agents completed sequentially without recovery or retries.

Phase 5C generalized the workflow instructions and configurations.

**Phase 6 must establish actual portability, not repeat the existing NestJS demonstration.**

## Phase 6A — Integration Preparation

### 1. Identify the target project

Use an existing, separate development/test project.

Target project: `[PROVIDE_TARGET_PROJECT_PATH]`

Prefer a small Node.js, NestJS, React, or Python project.

Do not use the existing calculator or NestJS examples inside `codex_agents_mvp`.

If the target project is not specified, request its path and stop. Do not create a replacement project without authorization.

Do not modify production applications or the original V2 project.

### 2. Inspect the reusable workflow

Read:

- `C:\Develop\agents\codex_agents_mvp\plan.md`
- `C:\Develop\agents\codex_agents_mvp\AGENTS.md`
- `C:\Develop\agents\codex_agents_mvp\workflows\develop.md`
- All three project-local agent TOML definitions.

Identify the minimum configuration required to make the three named agents available in the target project.

Determine whether project-local agent configuration must be copied or adapted. Do not assume the MVP's agents are automatically visible from another project.

Do not copy or modify files during Phase 6A.

### 3. Inspect the target project

Determine:

- Language and framework.
- Existing project structure.
- Package manager.
- Available dependencies.
- Existing test framework and validation commands.
- Git working-tree status, if Git is used.
- Existing project instructions and agent configuration.
- Permitted modification scope.
- Existing build or typecheck commands.
- Any environmental or security restrictions.

Do not install missing dependencies.

### 4. Propose one small development task

Choose one realistic, bounded feature or bug fix suitable for the target project.

The task must:

- Require actual source modifications.
- Have clear acceptance criteria.
- Allow meaningful automated tests.
- Avoid unrelated refactoring.
- Be small enough for one implementer → validator → reviewer sequence.

Present the proposed task and exact authorized file scope for approval.

### 5. Prepare candidate verification

Use Python standard-library `hashlib` for SHA-256 verification.

Propose a deterministic file-inventory procedure supporting added, modified, and deleted files.

Preserve unrelated project files.

Do not fingerprint unnecessary dependency trees such as `node_modules` unless required for a specific integrity check.

### Phase 6A restrictions

- Read-only inspection only.
- No subagent invocation.
- No source changes or configuration copying.
- No dependency installations.
- No commits or pushes.
- No global Codex configuration changes.
- No permissions or security modifications.
- No automatic retries.
- No Phase 6B execution.

### Phase 6A deliverable

Report:

1. Target project and framework.
2. Existing development/test environment.
3. Exact agent configuration integration plan.
4. Proposed development task.
5. Acceptance criteria.
6. Exact typecheck/build/test commands, working directories and expected generated artifacts.
7. Allowed modification scope.
8. Baseline and integrity-check strategy.
9. Risks or missing prerequisites.
10. Final status: READY / SETUP_REQUIRED / UNVERIFIED.

Status definitions:

- **READY:** Read-only inspection establishes the target, proposed task/scope,
  installed prerequisites, safe validation commands and integrity strategy.
  All three named role selections are exposed in the target-project session,
  and effective workspace-write access covers the proposed scope. No setup
  changes remain. READY is a preparation result, not approval to start Phase 6B.
- **SETUP_REQUIRED:** Identifiable prerequisites remain, such as project-local
  role migration, unavailable dependencies or a session without target write
  access. Specify the exact missing prerequisite and proposed changes; do not
  perform them during Phase 6A or weaken security restrictions.
- **UNVERIFIED:** Required evidence cannot be established or a required inspection
  fails. Do not infer role availability from task names or another project's run.

If setup is required, obtain separate authorization for its exact target paths
and changes. Merge approved project-local guidance and role definitions without
overwriting existing instructions. Do not change global configuration or grant
permissions automatically. Start a fresh session in the target project and
reassess readiness, without invoking agents, before requesting Phase 6B approval.
Setup is outside the uninterrupted three-agent development attempt.

**STOP after Phase 6A. Wait for explicit approval before continuing.**

---

## Phase 6B — Real Three-Agent Development Demonstration

This phase is a future execution specification, not authorization to execute it now.

After separate authorization, perform one uninterrupted development workflow in the approved target project.

Require a READY preparation result and approval of the task, write scope,
validation commands/cwd, inventory roots and exclusions. Capture the initial
inventory before invoking the implementer. Do not combine setup with this run.

### Stage 1 — quick_implementer

Use the actual `agent_type: "quick_implementer"`.

Implement the approved feature and relevant tests.

Only modify authorized project files.

Do not commit or push.

Wait for completion.

Compare the implementation with the initial inventory and confirm that only
approved changes occurred. Record the final candidate before starting validation.

### Stage 2 — code_validator

Use the actual `agent_type: "code_validator"`.

Run the agreed validation commands.

Record:

- Exact commands.
- Actual process exit codes.
- Typecheck/build results.
- Test suites and counts.
- Passing/failing/skipped tests.

Do not manually edit source, tests or configuration. Only generated artifacts
declared in Phase 6A and produced by the approved commands are expected; exclude
them from the candidate inventory up front. This exception does not permit
source rewrites, auto-formatting or automatic dependency/lockfile updates.

Stop if validation fails, required tests do not execute, or evidence is incomplete.
Before starting review, compare the full candidate path set and per-file hashes
with the recorded post-implementation candidate. Do not proceed on a mismatch.

### Stage 3 — code_reviewer

Use the actual `agent_type: "code_reviewer"`.

Independently inspect the same validated candidate.

Review:

- Functional correctness.
- Acceptance criteria.
- Error handling.
- Security.
- Maintainability.
- Test quality.
- Unexpected modifications.

Return APPROVE or REQUEST_CHANGES with concrete findings.

Do not modify files.

### Candidate consistency

Use Python standard-library hashlib with deterministic, sorted project-relative
paths. Declare inventory roots and exclusions before implementation. Cover
relevant source, tests, configuration and validation inputs, including files
outside write scope needed to detect unrelated changes. Exclude unnecessary
dependency trees and declared generated artifacts, not source or tests.

Capture an initial inventory before implementation. Compare the implementation
with it to reject unauthorized changes; approved additions/deletions establish
the new candidate. Record that candidate's complete path set and SHA-256 hashes
before validation. Re-enumerate the same roots and compare every path/hash after
validation, before invoking review, and again after review, before reporting PASS.
Do not silently expand exclusions. A fixed list of previously known files is
insufficient to detect unexpected additions or deletions.

Stop on any unexpected candidate change. Preserve pre-existing project changes
and report the checkpoint and differing paths; do not repair or retry automatically.

### Execution restrictions

- All three named agents must run sequentially.
- No generic-agent substitution.
- No automatic retries or recovery.
- No installation or upgrades without approval.
- No global configuration or security changes.
- No custom coordinator, runner, or execution adapter.
- No commits or pushes.
- Stop at the first required-stage failure.

Use the established RTK/PowerShell guidance.

Do not treat shell ancestry as an acceptance requirement. Preserve security restrictions.

### Phase 6B success criteria

Report `MVP_PORTABILITY_PASS` only when:

1. The workflow runs in a separate target project.
2. All three actual named agents complete sequentially.
3. The requested feature is implemented.
4. Required build/typecheck commands pass.
5. Real automated tests pass.
6. The independent reviewer returns APPROVE.
7. Candidate hashes remain consistent.
8. No unauthorized modifications occur.
9. No recovery or manual coordination between stages is needed.

Otherwise report FAILED, UNVERIFIED, or SETUP_REQUIRED based on actual evidence.

FAILED means real validation/review rejection or an unauthorized modification;
UNVERIFIED means missing evidence or execution failure. SETUP_REQUIRED belongs
to preparation before the development attempt, not a label that erases a failed
or interrupted Phase 6B run. A portability pass applies to the observed target
project and environment; it does not establish universal project compatibility.

Keep historical unsuccessful attempts unchanged.

## Project documentation

After separately authorized successful execution, update `plan.md` with the Phase 6 results.

Do not modify the historical Phase 5B PASS or Phase 5C COMPLETE records.

## Design principle

Keep this MVP lightweight.

Use Codex's existing named-agent capabilities and project-local Markdown/TOML configurations.

Do not introduce another orchestration framework.

**The final goal is one development request in any supported project, automatically implemented, validated, and independently reviewed.**
