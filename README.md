# Codex Agents MVP

The named three-agent workflow completed Phase 5B successfully:
`MVP_NESTJS_UNINTERRUPTED_PASS`. TypeScript exited 0, Jest passed 32/32 tests,
independent review returned APPROVE, and all 15 candidate hashes stayed identical.
Earlier interrupted attempts remain UNVERIFIED. Phase 5C provides reusable
instructions. The owner reports Phase 6B `MVP_PORTABILITY_PASS` in a separate
Node.js project: 12/12 tests, two syntax checks, independent APPROVE and matching
candidate hashes. That historical run was not independently observed in this
packaging session; its session IDs and per-file digests were not supplied.
There is no custom runner or orchestration framework. The NestJS example has
existing dependencies; this workflow does not install them automatically.

Observed tools during setup: `codex-cli 0.162.1`, Python `3.12.6`.

## Use the workflow in this project

From PowerShell, open this project folder and start the existing signed-in CLI:

```powershell
Set-Location 'C:\Develop\agents\codex_agents_mvp'
rtk proxy codex
```

Use a new session so project instructions and custom agents can be discovered.
Choose the parent permission mode intentionally. Do not install, upgrade or
change global configuration to make this scaffold work.

Submit one request using [workflows/develop.md](workflows/develop.md). Fill in:

```text
Follow workflows/develop.md and coordinate all three stages automatically.
Task: <requested feature, bug fix, or refactoring>
Project path: <absolute project root>
Scope: <permitted source and test paths>
Acceptance criteria: <expected behavior and boundaries>
Validation commands: <existing commands with cwd, or discover from project config>
Restrictions: <forbidden operations and operations requiring separate approval>
```

Root selects `quick_implementer`, then `code_validator`, then `code_reviewer`
through actual `agent_type` selections, waiting between stages. Final evidence
includes sessions, changed files, commands/exits/test counts, review findings,
and candidate path/hash comparisons. No automatic retries, installs or Git writes.

## Use in another project

Use [SETUP.md](SETUP.md) and the merge-safe manual adoption map for
[templates/development](templates/development/). The template contains only
project instructions, the workflow and three agent definitions; it is not an
installer. Phase 7 packages the existing architecture without a custom coordinator.

With separate authorization for that target project, merge the relevant guidance
from AGENTS.md, workflows/develop.md and the three `.codex/agents/*.toml` files
into its project-local setup. Preserve existing instructions and role definitions;
resolve conflicts before writing. Do not copy demos, the historical plan, global
configuration or credentials. This task does not perform adoption in another tree.

Start a fresh supported Codex session in that project, confirm its effective write
permissions and all three named role selections, then submit the filled request.
The workflow file is a prompt template, not automatically loaded configuration:
explicitly instruct Codex to read it. Role availability observed here does not
guarantee another host exposes the same capability. Stop UNVERIFIED if it does not.

For Node.js, NestJS and React, inspect existing package.json scripts and test/build
configuration; preserve the project's package manager and installed toolchain.
For Python, inspect pyproject.toml, test configuration and established docs.
Do not assume a particular runner or invent commands. Clarify required commands
or scope if they cannot be established safely. Run only installed, authorized
checks; missing dependencies require stopping rather than automatic installation.

Use Python standard-library hashlib for deterministic candidate inventories,
including source/tests/configuration. Declare dependency/generated-artifact
exclusions and compare both path sets and hashes at each stage. Do not reuse the
NestJS 15-file manifest for an unrelated project. On Windows use UTF-8 reads and
`rtk proxy python -X utf8` to avoid console encoding failures. Never pass a
PowerShell cmdlet directly to `rtk proxy`; use a supported shell executable.

## Historical Phase 1 baseline tests

The original baseline command from the project root was:

```powershell
python -m unittest discover -s examples/calculator -p "test_*.py" -v
```

Setup executed that command once via a Python subprocess, with the child-only
environment variable `PYTHONDONTWRITEBYTECODE=1` to avoid extra cache files.
Observed result: **4 tests, 3 passed, 1 failure, process exit code 1**.
`test_below_lower` failed with `AssertionError: -5 != 0`; the other three passed.
This expected failure established the original fixture, not a failed setup.
Phase 2 subsequently repaired it; this historical result is not a current rerun.
All three TOMLs parse with Python's standard-library `tomllib`, and the test
source contains exactly four test methods.

Baseline calculator SHA-256:
`D9D59CDF13F108761EDD1653B37B5D955BD9D5C0244B670852C6977EFB846822`.

## Role support and limits

The [official Subagents documentation](https://learn.chatgpt.com/docs/agent-configuration/subagents)
specifies standalone project-local `.codex/agents/*.toml` files with `name`,
`description` and `developer_instructions`. Context7's `/openai/codex`
documentation also confirms these fields and named `agent_type` selection.
The installed CLI's normal help and `features list` were inspected without
running a model; `multi_agent` is reported **stable / true**.
The role files omit model and permission overrides and inherit the parent.

**Historical setup limitation (later resolved here):** the setup interface's
`collaboration.spawn_agent` schema has no `agent_type` or equivalent named-role
selector. A task name is not evidence of loading a custom agent. No roles were
spawned during setup. CLI version and feature flags do not prove that these files load
or that a future interactive session exposes named selection. The minimal
format agrees with current documentation; loading and named selection on this
installed release were unverified at setup. Subsequent named-role demonstrations,
including Phase 5B, established actual selection and execution in this session.
Stop with `UNVERIFIED` if the real named roles cannot be selected; do not
substitute generic children, change global settings or build an adapter.

Validator/reviewer instructions prohibit edits but do not create separate OS
sandboxes. Prompts alone do not guarantee success or independence.

For each new development task, require three distinguishable named sessions,
actual validation commands/output/counts/exits, an independent APPROVE and
unchanged candidate paths/hashes after validation and review. Real rejection
means FAILED; incomplete evidence means UNVERIFIED. Do not retry automatically.
Windows outer-shell stabilization (Phase 5A) remains unresolved; process ancestry
is diagnostic, not a prerequisite for accepting development results.

## Section 4A migration and preservation report

Source root: `C:\Develop\agents\codex_agents`.
Destination root: this separate `codex_agents_mvp` folder.
Only the four exact source candidates were inspected for content; other V2
files were read solely for the authorized preservation inventory.

| Exact V2 source | Exact MVP destination | Source status | Action |
| --- | --- | --- | --- |
| `AGENTS.md` | `AGENTS.md` | FOUND | REWRITTEN |
| `.codex/agents/quick_implementer.toml` | `.codex/agents/quick_implementer.toml` | NOT_FOUND | CREATED_NEW |
| `.codex/agents/code_validator.toml` | `.codex/agents/code_validator.toml` | NOT_FOUND | CREATED_NEW |
| `.codex/agents/code_reviewer.toml` | `.codex/agents/code_reviewer.toml` | NOT_FOUND | CREATED_NEW |

The original instructions informed evidence discipline, bounded ownership,
serialized implementation and no recursive delegation. V2 workflow/rules,
launchers, telemetry, qualification gates and infrastructure were not imported.
Absent roles were created from Section 5 without searching for replacements.
The workflow, calculator, four-test fixture and this README were created new;
the existing `plan.md` was retained. Only the eight required MVP files were added.

The initial observation recorded V2 Git HEAD
`4109dfc02f376fb65d3159bba854d608b3ecebe8`, its complete porcelain working-tree
status and a SHA-256 inventory of all 622 regular working-tree files, excluding
`.git/`. Candidate `AGENTS.md` SHA-256:
`D30ACA5B30B91041A6719A034E2EAF397A1ED4907C89178F24C0839B9168D116`.
V2 was already dirty (13 modified and 391 untracked status entries); its existing
changes were left intact. Snapshots were
retained in tool-session memory, with no receipt files written into either tree.
Python `hashlib` was used after the legacy PowerShell inventory attempt could
not resolve `Get-FileHash`; that failed read-only attempt was discarded.

Preservation comparison after scaffolding and baseline tests:
**NO_ORIGINAL_MUTATION**. The before/after set of 622 paths and SHA-256 hashes,
Git HEAD, complete working-tree status and all existing candidate hashes agree.
This preservation result applies to each of the four manifest rows above.
No Git mutation, model/demo execution, install, credential change or global
configuration edit was performed. This check covers observed file contents and
Git state, not hidden runtime behavior or OS isolation.
