# Adopt the development workflow

Use this manual setup only with explicit authorization for the target project.
Start with a disposable copy or an isolated branch prepared by the developer;
setup performs no Git operations. No installer, dependency installation, global
configuration change, permission change or custom coordinator is required.

## Merge project-local files safely

Inspect the target's existing root and relevant nested AGENTS.md files, workflow,
and agent definitions first. Preserve existing instructions and global guidance.
Never blindly overwrite a file or replace the target's AGENTS.md. Merge compatible
guidance and resolve conflicting role names or instructions with the developer
before writing. Copy only missing files under the separately authorized scope.

| Source in this package | Target-relative destination |
| --- | --- |
| `templates/development/AGENTS.md` | `AGENTS.md` (merge guidance) |
| `templates/development/workflows/develop.md` | `workflows/develop.md` |
| `templates/development/.codex/agents/quick_implementer.toml` | `.codex/agents/quick_implementer.toml` |
| `templates/development/.codex/agents/code_validator.toml` | `.codex/agents/code_validator.toml` |
| `templates/development/.codex/agents/code_reviewer.toml` | `.codex/agents/code_reviewer.toml` |

Include the hidden `.codex` directory. Preserve the three role names and their
`name`, `description`, `developer_instructions` fields; these templates contain no
model or permission overrides. Do not copy examples, histories, credentials or
global configuration. The workflow is an instruction template: explicitly ask
Codex to read it; copying it does not execute or automatically load a workflow.

## Start a fresh target session and check readiness

Open the target project in Codex and start a fresh session there so its local
instructions and roles can be discovered. With an existing signed-in CLI, an
optional PowerShell launch recipe is shown below; replace the placeholder:

```powershell
rtk proxy powershell -NoProfile -Command 'Set-Location -LiteralPath "<target-project>"; rtk proxy codex'
```

This is a launch instruction, not a guarantee about a host's execution launcher.
Changing a command's cwd in an already MVP-rooted session does not turn that
session into a target-rooted workspace or grant writes to the target.

Before any development, request a read-only readiness check of:

- Actual current project root equals the target.
- Advertised sandbox mode is `workspace-write` and configured writable roots
  include the target. Distinguish configured permission from experimentally
  demonstrated write access; do not perform a write probe by default.
- The actual `collaboration.spawn_agent` tool exposes `quick_implementer`,
  `code_validator`, and `code_reviewer` through `agent_type`. Do not invoke agents
  just to test availability; `task_name` is not role selection.
- Applicable project guidance, workflow and all three agent TOMLs are readable.

Report `READY_FOR_AUTHORIZATION` only if these configuration conditions hold;
otherwise report `SETUP_REQUIRED` or `UNVERIFIED`. Readiness is not development
authorization. Stop for a separate development request; do not change permissions
or global configuration to force readiness.

## Submit one development request

```text
Read workflows/develop.md and coordinate its three stages automatically.
Task: <one bounded change>
Project path: <absolute target project root>
Scope: <authorized source/tests/configuration paths>
Acceptance criteria: <behavior, boundaries, errors>
Validation commands: <existing commands and cwd, or discover>
Restrictions: <forbidden operations / operations needing separate approval>
```

Discover unknown commands from existing package.json scripts, pyproject.toml,
test/build configuration and project docs. Node.js, NestJS, React and Python
projects retain their own installed toolchain; there is no universal validation
command. Clarify missing safe scope/commands; stop if dependencies are unavailable.
Do not install automatically or invent passing results.

Root uses actual named `agent_type` selections in distinct sessions, sequentially:
`quick_implementer`, then exactly one `code_validator`, then `code_reviewer`.
Wait for each result. The validator executes real approved commands once, reporting
cwd, exits and passed/failed/skipped counts. The reviewer independently reads
the same implementation and tests, returns APPROVE or REQUEST_CHANGES, and
makes no edits. Neither validator nor reviewer manually edits candidate files.

Before implementation, record a full inventory of relevant source, tests and
validation/configuration inputs, including files outside edit scope to detect
unrelated changes. Declare roots and exclusions first; do not scan dependencies.
Use Python standard-library hashlib and sorted project-relative path/hash output.
Re-enumerate to detect new/deleted files. Compare the initial inventory with
post-implementation scope, then record the candidate before validation. Compare
after validation, before review starts, and after review; all candidate paths and
hashes must match. Keep snapshots in session memory, without a new script/runner.

PASS requires all three named stages, real successful required checks, independent
APPROVE and matching candidate inventories/hashes. Real rejection or unauthorized
mutation means FAILED; unavailable commands, role identity or evidence means
UNVERIFIED. Stop on failure without automatic repair/retry; preserve older
attempts separately. A later attempt requires separate authorization.

## Windows execution boundary

See [the existing Windows execution record](workflows/windows-execution-status.md).
Phase 5A outer launcher selection remains unresolved. WindowsApps `pwsh.exe`
previously failed before command startup; successful inner PowerShell recipes do
not guarantee the outer launcher selection or reliability in another session.
Process ancestry remains diagnostic, not a routine acceptance requirement.

Follow applicable RTK rules; never pass PowerShell cmdlets directly to `rtk proxy`.
Use supported executables and preserve process exit codes, for example:

```powershell
rtk proxy powershell -NoProfile -Command '<approved native validation command>; exit $LASTEXITCODE'
rtk proxy python -X utf8 -c "from pathlib import Path; print(Path('AGENTS.md').read_text(encoding='utf-8'))"
```

Use UTF-8 reads and Python `-X utf8` for Unicode output. Do not rely on
Get-FileHash availability, undocumented flags/configuration keys, or security
workarounds. Stop and report the actual failure rather than retrying automatically.
Role edit restrictions are instructions, not independent OS sandboxes.

The reported separate-project Node.js pass and observed NestJS pass demonstrate
feasibility in those environments. They do not establish universal portability
or reliability across repeated tasks. Track future task outcomes and manual
interventions simply, without adding infrastructure or more demonstrations here.
