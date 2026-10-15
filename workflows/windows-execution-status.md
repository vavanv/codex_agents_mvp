# Phase 5 — Windows execution stabilization

Recorded 2026-10-14. Status: **UNVERIFIED — outer shell selection remains unresolved.**

## Completed

Phase 4 evidence is preserved in [nestjs-phase4-report.md](nestjs-phase4-report.md): actual named sessions, exact commands, observed exit codes/counts, independent verdict, full 15-file SHA-256 baseline, and recovery history. The original interrupted run remains UNVERIFIED; recovered combined checks passed.

Read-only checks in this session observed installed `codex-cli 0.162.1` at `C:\Users\vorobiev\AppData\Local\Programs\OpenAI\Codex\bin\codex.exe`. This does not establish that the hosted tool uses that CLI binary.

## Shell observation

A single successful read-only process-tree check used `exec_command` with:

- `shell: C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe`
- `login: false`
- default sandbox permissions (no escalation for this probe)
- command prefixed `rtk proxy powershell -NoProfile -Command`

Observed process paths:

1. Inner command shell: `C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe` (Windows PowerShell 5.1.26100.9711).
2. Its parent: `C:\Users\vorobiev\.local\bin\rtk.exe`.
3. The outer launcher: `C:\Program Files\WindowsApps\Microsoft.PowerShell_7.6.6.0_x64__8wekyb3d8bbwe\pwsh.exe`.

Inspection process exit: 0. Subsequent ordinary read-only role inspection and CLI version commands also exited 0. No launch failure or automatic retry occurred during these Phase 5 probes.

This shows the inner PowerShell executable, not the outer launcher, was selected on the observed execution path. The wrapper still depends on the WindowsApps launcher starting first; it cannot fix a failure before command execution. Previous successful recovery commands do not prove that the execution tool honored the outer `shell` selection.

## Supported configuration boundary

The current [official configuration reference](https://developers.openai.com/codex/config-reference/) documents login-shell control, subprocess environment policy and Windows sandbox implementation settings. This investigation did not establish a documented config.toml key or CLI flag for pinning the outer Windows PowerShell executable. No speculative shell key was added.

[Official Windows documentation](https://learn.chatgpt.com/docs/windows/windows-app#windows-subsystem-for-linux-wsl) says the integrated terminal and agent are configured independently. Changing the terminal alone does not establish a change to agent command execution. Its documented agent switch to WSL requires restarting the app; that switch was not performed.

[Official sandbox troubleshooting](https://learn.chatgpt.com/docs/windows/windows-sandbox#troubleshooting-and-faq) identifies the sandbox log, Windows build, selected sandbox implementation and exact error as useful evidence. No logs were collected/exported or sent, and no sandbox, ACL, security, global configuration or installed software was changed. No external message was sent.

## Phase 5A diagnostic boundary

The host-side outer shell selection remains unresolved; Phase 5A is not declared stabilized. Process ancestry is diagnostic evidence, not a prerequisite or acceptance condition for Phase 5B. An outer WindowsApps `pwsh.exe` observation alone does not establish that the inner command used the wrong shell. Do not repeat ancestry checks unless required to investigate an actual execution failure.

No completed-task filter or other NestJS source change was made in Phase 5. Dependency remediation remains a separate task; no audit fix was performed.

## Phase 5B preflight failure — UNVERIFIED

The separately authorized uninterrupted attempt stopped during preflight: `Get-FileHash` was unavailable in that invocation and the inspection process exited 1. The reason is unknown; this does not establish that the cmdlet is missing from Windows. No implementer, validator or reviewer was started in that attempt, and no source changes were made. The outer WindowsApps launcher was observed, with the interpretation limited as above. No retry was performed. This interrupted attempt remains **UNVERIFIED**.

A subsequent user-supplied single-file Python `hashlib` check succeeded with process exit 0 for `examples/nestjs-api/src/tasks/tasks.controller.ts`:

```text
A2DAFF18B993307BF2096A8D91CEDD76D44FA1925A1CB36B0DD00AEE00C5058F
```

That evidence covers one file only. It does not verify the full 15-file inventory, establish an unchanged candidate, or authorize a fresh feature attempt.

## Revised Phase 5B preflight and acceptance procedure

This instruction update replaces `Get-FileHash` with Python's standard-library `hashlib`. The separate read-only full-manifest verification and a fresh Phase 5B development attempt both remain pending separate authorization. Do not execute either as part of this documentation update.

1. Confirm the working directory is `C:\Develop\agents\codex_agents_mvp`, the authorized example scope is `examples/nestjs-api`, and execution uses `workspace-write` within the existing permission boundary. No escalation, network, dependency installation, Git mutations, global configuration changes or changes outside the project are permitted.
2. In the separately authorized read-only check, use the command below from the project root. It reads the existing exact 15-file manifest in [nestjs-phase4-report.md](nestjs-phase4-report.md) as UTF-8, checks the inventory, and prints relative paths with SHA-256 values. Compare all 15 values with that historical baseline before declaring the revised preflight verified. Record the real process exit and any inventory/hash differences. Do not introduce a script or runner.
3. Only after a fresh development attempt is authorized, delegate implementation to an identifiable `quick_implementer` and wait for completion. Record the final candidate's full 15-file inventory and per-file hashes after implementation, before starting validation. Intended implementation changes establish this new candidate; the historical Phase 4 hashes are not the post-implementation baseline.
4. Delegate exactly one validation task to a distinct identifiable `code_validator`. It must run the actual local typecheck and Jest commands below once, reporting both process exit codes, suite count, total/passed/failed/skipped test counts. It must not edit files. Verify the full inventory and all per-file hashes against the post-implementation candidate after validation.
5. Only if validation passes and the candidate is unchanged, delegate review to a distinct identifiable `code_reviewer`. It must read the changed source and tests, make no edits, and return `APPROVE` or `REQUEST_CHANGES` with concrete findings. Verify the full inventory and all per-file hashes again after review. Acceptance requires an independent `APPROVE`, passing real checks and the same candidate at every checkpoint.
6. Report the observed named-agent evidence, commands, process exits, test counts and candidate comparisons. Stop without automatic repair or retry if delegation fails, an agent cannot be identified, a required command fails, tests do not run, the candidate changes unexpectedly or evidence is incomplete: report **UNVERIFIED**, or **FAILED** if a real test or review rejects the candidate. Preserve previous interrupted records. Do not silently waive mandatory acceptance conditions.

Read-only fingerprint command (shown here, not executed by this update):

```powershell
rtk proxy python -c "import hashlib; from pathlib import Path; root=Path('examples/nestjs-api'); report=Path('workflows/nestjs-phase4-report.md').read_text(encoding='utf-8'); section=report.split('## Candidate integrity',1)[1].split('## Result boundary',1)[0]; paths=[line.split(chr(96))[1] for line in section.splitlines() if line.startswith('| '+chr(96))]; assert len(paths)==15 and len(set(paths))==15, 'Expected exact 15-file manifest'; actual={p.relative_to(root).as_posix() for p in root.rglob('*') if p.is_file() and not any(part in ('node_modules','dist','coverage') for part in p.relative_to(root).parts) and not p.name.endswith('.tsbuildinfo')}; expected=set(paths); assert actual==expected, 'Inventory mismatch: missing='+repr(sorted(expected-actual))+'; added='+repr(sorted(actual-expected)); [print(path+' '+hashlib.sha256((root/path).read_bytes()).hexdigest().upper()) for path in paths]"
```

The same inventory and fingerprint procedure applies after implementation/before validation, after validation and after review. Compare both the path set and every hash with the recorded post-implementation candidate; a missing, added or changed candidate file is a mismatch. Inventory intentionally excludes `node_modules` and generated `dist`, `coverage` and `*.tsbuildinfo` artifacts; this does not claim whole-workspace or dependency integrity.

Required validator commands, from `C:\Develop\agents\codex_agents_mvp\examples\nestjs-api`:

```powershell
rtk proxy powershell -NoProfile -Command '.\node_modules\.bin\tsc.cmd --noEmit -p tsconfig.json; exit $LASTEXITCODE'
rtk proxy powershell -NoProfile -Command '.\node_modules\.bin\jest.cmd --config jest.config.cjs --runInBand --runTestsByPath test/tasks.e2e-spec.ts; exit $LASTEXITCODE'
```

Use the existing three-agent sequence; do not recreate the project or introduce a runner. An execution failure still triggers the stop rule under the current security boundary, regardless of process ancestry.

