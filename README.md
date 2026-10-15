# Codex Agents MVP

Phase 0 and Phase 1 scaffold only. The calculator deliberately retains its
lower-bound bug. The three-agent demonstration has **not** been run.
There are no third-party dependencies, installers, runners or services.

Observed tools during setup: `codex-cli 0.162.1`, Python `3.12.6`.

## Start a later interactive demonstration

From PowerShell, open this project folder and start the existing signed-in CLI:

```powershell
Set-Location 'C:\Develop\agents\codex_agents_mvp'
rtk proxy codex
```

Use a new session so project instructions and custom agents can be discovered.
Choose the parent permission mode intentionally. Do not install, upgrade or
change global configuration to make this scaffold work.

Once the owner explicitly requests Phase 2, paste this single prompt (also in
[workflows/develop.md](workflows/develop.md)):

```text
Fix the lower-bound bug in examples/calculator/calculator.py.

Please coordinate automatically using the three named project-local agents:
1. quick_implementer — edit calculator.py only, no tests.
2. code_validator — run exactly:
   python -m unittest discover -s examples/calculator -p "test_*.py" -v
3. code_reviewer — inspect the same source and tests and return an honest verdict.

Run the three stages sequentially, without asking me to start any agent.
Between stages, use the SHA-256 of calculator.py to ensure the candidate
has not changed. Do not edit tests or unrelated files.
Do not commit, push, install, upgrade, or retry.

Final answer: implementation evidence, real test command and exit code,
number of tests, review verdict/findings, matching candidate hashes, and
PASS / FAILED / UNVERIFIED. If real named delegation is unavailable, stop.
```

## Baseline tests

The exact test command from the project root is:

```powershell
python -m unittest discover -s examples/calculator -p "test_*.py" -v
```

Setup executed that command once via a Python subprocess, with the child-only
environment variable `PYTHONDONTWRITEBYTECODE=1` to avoid extra cache files.
Observed result: **4 tests, 3 passed, 1 failure, process exit code 1**.
`test_below_lower` failed with `AssertionError: -5 != 0`; the other three passed.
This expected failure establishes the unrepaired fixture, not a failed setup.
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

**BLOCKED_ROLE_SELECTION in the current setup interface:** its exposed
`collaboration.spawn_agent` schema has no `agent_type` or equivalent named-role
selector. A task name is not evidence of loading a custom agent. No roles were
spawned. CLI version and feature flags do not prove that these new files load
or that a future interactive session exposes named selection. The minimal
format agrees with current documentation; loading and named selection on this
installed release remain unverified until a separately authorized session.
Stop with `UNVERIFIED` if the real named roles cannot be selected; do not
substitute generic children, change global settings or build an adapter.

Validator/reviewer instructions prohibit edits but do not create separate OS
sandboxes. Prompts alone do not guarantee success or independence.

For a later demonstration, inspect three distinguishable named agent sessions,
the one-file calculator change, the validator's actual command/output/count/exit
code, and the reviewer's `APPROVE` or `REQUEST_CHANGES` findings. Compare source
SHA-256 before and after validation and review. Only report `MVP_DEMO_PASS` after
four tests pass with exit 0, an approving independent review, matching candidate
hashes and no unrelated changes. Real rejection means `FAILED`; incomplete
evidence means `UNVERIFIED`. Do not retry automatically.

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
