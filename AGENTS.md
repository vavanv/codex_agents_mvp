# Codex Agents MVP

Goal: implement one requested change, obtain actual tests from a distinct
validator agent, and obtain a distinct reviewer result on the same source.

For a development task:

1. Delegate implementation to `quick_implementer`; wait for its completion.
2. Record the SHA-256 of the final changed source (the candidate).
3. Delegate exactly one validation task to `code_validator`; it must run the
   specified real test command and report test count and process exit code.
4. Ensure source SHA-256 has not changed.
5. Delegate review to `code_reviewer`; it must read the changed source and
   tests and return `APPROVE` or `REQUEST_CHANGES` with concrete findings.
6. Ensure source SHA-256 remains the same and report observed evidence.

Do not manually simulate subagents or silently replace them with root work.
Do not edit files from the validator or reviewer. These are instruction-level
restrictions, not separate OS sandboxes.
No Git mutations, install, network/deployment operations, or changes outside
this project. No automatic repair/retry in the first demonstration.
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
