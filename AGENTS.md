# Codex Agents MVP

Goal: implement one requested change, obtain actual tests from a distinct
validator agent, and obtain a distinct reviewer result on the same source.

For a development task:

Use workflows/develop.md with the task, project path, authorized scope,
acceptance criteria, existing validation commands and restrictions. Establish
safe commands and effective write permissions first; clarify missing scope or
required commands. Use actual collaboration.spawn_agent agent_type selections,
not task names, and distinct sessions. Wait for each stage to complete.

1. Delegate implementation to `quick_implementer`; wait for its completion.
2. Record the candidate inventory and SHA-256 of source, tests and validation inputs.
3. Delegate exactly one validation task to `code_validator`; it must run the
   specified real typecheck/build/test commands and report counts and exit codes.
4. Ensure candidate paths and SHA-256 hashes have not changed.
5. Delegate review to `code_reviewer`; it must read the changed source and
   tests and return `APPROVE` or `REQUEST_CHANGES` with concrete findings.
6. Ensure candidate paths and SHA-256 hashes remain the same and report evidence.

Use Python standard-library hashlib with deterministic relative path reporting.
Record an initial inventory before implementation, declare exclusions, detect
additions/deletions and reject changes outside scope. Do not use a fixed demo
manifest for another task. If named roles or required checks are unavailable,
stop UNVERIFIED. Explicit documentation-only user instructions may prohibit
delegation; follow that scope without claiming a three-agent development pass.

Do not manually simulate subagents or silently replace them with root work.
Do not edit files from the validator or reviewer. These are instruction-level
restrictions, not separate OS sandboxes.
No Git mutations, install, network/deployment operations, or changes outside
this project or the authorized scope. No automatic repair/retry.
If delegation fails, an agent cannot be identified, tests do not run, a
candidate changes unexpectedly, or evidence is incomplete: stop and report
UNVERIFIED (or FAILED if a real test/review rejects the candidate).
Never claim a test was run or a review completed based only on root prose.

## RTK and PowerShell command execution

RTK must be used only with commands and executable programs that it supports.

PowerShell cmdlets such as Get-Content, Get-FileHash, Test-Path, and Get-ChildItem
are not standalone executables.

Never invoke PowerShell cmdlets directly through `rtk proxy <cmdlet>`.

When RTK is required, invoke a supported PowerShell executable through RTK and pass
the cmdlet using `-Command`, provided that invocation is supported.

Alternatively, use an approved native file-reading tool where available.

Do not bypass security restrictions, change global RTK configuration,
or retry failed commands automatically.

If no supported execution method is available, stop and report UNVERIFIED.
