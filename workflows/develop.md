# Reusable development workflow

This is an instruction template for Codex's built-in coordination, not an
executable runner. Fill in the inputs and ask root to execute the stages.

## Request inputs

```text
Task: <feature, bug fix, or refactoring request>
Project path: <absolute target project root>
Scope: <permitted files/directories, including tests if authorized>
Acceptance criteria: <required behavior, boundaries, and errors>
Validation commands: <exact existing commands and working directories, or discover>
Restrictions: <forbidden operations and operations requiring separate approval>
```

## Establish the task

Resolve the project path, read its applicable AGENTS.md and local guidance,
confirm effective workspace-write permissions and the authorized write scope,
and preserve pre-existing changes. Authorization for this template does not
grant access to another project or override its instructions. Stop and request
clarification if required write scope or a safe validation command is unclear.

Use supplied validation commands when established. Otherwise inspect existing
package.json scripts, pyproject.toml, test configuration and project documentation.
Select installed commands appropriate to the task: typecheck/build when applicable,
existing regression tests and relevant new tests. This works with Node.js, NestJS,
React and Python project conventions without assuming a package manager or test
runner. Record each exact command and cwd before implementation. Inspect command
side effects; do not run commands that install, deploy or exceed authorization.
If required tools/dependencies are missing, stop UNVERIFIED; do not install them.

Confirm that the actual tool supports all three named agent_type selections.
If unavailable, stop UNVERIFIED; task_name alone is not role selection. Do not
substitute generic children, change global settings or create an adapter.

## Candidate consistency

Before implementation, record a deterministic inventory of relevant project
source, tests, configuration and validation inputs, including files outside write
scope needed to detect unrelated edits. Use installed Python standard-library
hashlib: read bytes, calculate SHA-256 and report sorted project-relative paths
with their digests. Use explicit UTF-8 for reading documentation and Python
`-X utf8` for Unicode console output. Do not rely on Get-FileHash availability.

Declare inventory roots and exclusions up front (for example dependencies,
version-control internals, caches and generated build/coverage artifacts).
Re-enumerate the same roots at each checkpoint so additions and deletions are
detected. Do not exclude source/tests or silently expand exclusions. If Python
or the required inventory cannot be used safely, stop UNVERIFIED.

After implementation, compare against the initial inventory: only authorized
changes are acceptable. Intended additions/deletions establish a new candidate.
Record its complete path set and per-file hashes before validation; compare that
same candidate after validation and after review. All paths and hashes must match.
Keep snapshots in session memory; do not add a runner or receipt infrastructure.
This checks declared file contents, not OS isolation or hidden runtime behavior.

## Sequential stages

Root performs each actual collaboration.spawn_agent call with the indicated
agent_type. Wait for completion and inspect its result before the next stage;
record distinguishable sessions and role types. Pass the task, scope, acceptance
criteria, restrictions and relevant candidate information to each agent.

1. **Implementation — agent_type="quick_implementer".** Inspect existing code,
   implement the smallest correct change, and add/update tests only within the
   authorized scope. Avoid unrelated refactoring. Do not run validation or delegate.
   Report changed files and implementation details. Root records the final candidate.
2. **Validation — agent_type="code_validator".** Delegate exactly one validation
   task to a distinct agent. Inspect implementation and execute the established
   typecheck/build/test commands once each, sequentially in the specified cwd.
   Report exact commands, real process exit codes, suite/test counts (passed,
   failed, skipped), diagnostics and failures. Mark unavailable counts as unknown;
   a zero-test run does not satisfy required tests. Do not edit source, tests or
   configuration; only declared generated artifacts from authorized commands are
   expected. Stop on failure or incomplete evidence. Root verifies candidate hashes.
3. **Review — agent_type="code_reviewer".** Only after successful validation and
   matching hashes, use a third distinct agent to independently read the same
   source and tests. Check correctness, maintainability, security, error handling,
   regressions and acceptance criteria. Return APPROVE with no findings only if
   satisfied, otherwise REQUEST_CHANGES with concrete findings. Do not edit or
   delegate. Distinguish root-provided hashes from independently measured hashes.
   Root verifies the complete candidate again after review.

## Restrictions and result

No automatic retries or repair. A new attempt requires separate authorization.
No installs, dependency upgrades, Git mutations (including commits/pushes), network
or deployment operations, global configuration/security/permission changes, or
writes beyond the project and authorized scope. Stop for separate approval of
any required restricted operation; do not bypass security boundaries. Validator
and reviewer read-only rules are instructions, not independent OS sandboxes.

Follow applicable RTK rules: prefix supported shell commands with RTK; never pass
PowerShell cmdlets directly to `rtk proxy`. Use a supported executable, such as
`rtk proxy powershell -NoProfile -Command '<command>; exit $LASTEXITCODE'` for
native checks, preserving each process exit. Process ancestry is diagnostic,
not a development acceptance condition. Do not add routine ancestry probes.

Stop if delegation or a required command fails, actor identity cannot be established,
tests do not execute, the candidate changes unexpectedly, or evidence is incomplete.
Report FAILED for real test rejection, REQUEST_CHANGES or unauthorized mutation;
report UNVERIFIED for missing evidence or execution failure. Report PASS only when
all three named stages finish, all required checks pass, independent review is
APPROVE and candidate comparisons succeed. Preserve earlier attempts separately.

```text
Result: PASS / FAILED / UNVERIFIED
Task / project / authorized scope:
Implementer session / actual agent_type / changed files:
Validator session / actual agent_type:
Commands / cwd / process exit codes / observed suite and test counts:
Reviewer session / actual agent_type / verdict / findings:
Candidate inventory / exclusions / per-file SHA-256:
After implementation vs initial scope check:
After validation vs candidate / after review vs candidate:
Unexpected changes / restricted operations / limitations:
```
