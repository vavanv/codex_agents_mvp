# NestJS MVP — Phase 4 evidence

Recorded 2026-10-14. Scope: `examples/nestjs-api` only.

**Recovered combined result: PASS. Original uninterrupted workflow: UNVERIFIED.**
The separate recovery stages do not retroactively establish an uninterrupted run.

## Actual named sessions

| Session | Actual agent_type | Result |
| --- | --- | --- |
| /root/nestjs_implementer | quick_implementer | COMPLETE; 13 implementation/config/test/documentation files created |
| /root/nestjs_validator | code_validator | UNVERIFIED; initial inspection failed before execution |
| /root/nestjs_reviewer | code_reviewer | APPROVE; independent source/test/config inspection, no source or test findings |
| /root/nestjs_validator_recovery | code_validator | PASS; independently inspected and executed each check once |

Root created package.json/package-lock.json during separately authorized local dependency setup. Total candidate: 15 files. No custom orchestrator or runner was introduced.

## API and actual execution

In-memory Task Management API: POST /tasks (201), GET /tasks (200), GET /tasks/:id (200), PATCH /tasks/:id (200), DELETE /tasks/:id (204). DTO validation rejects invalid and unknown fields (400); missing tasks return 404. Description omission preserves the current value; an empty string clears it; null is invalid.

Working directory for manual validation and validator recovery:
`C:\Develop\agents\codex_agents_mvp\examples\nestjs-api`.

User-provided manual terminal evidence: local tsc exited 0; Jest exited 0, 1 suite passed, 28 tests passed, 0 failed.

Named code_validator recovery executed:

```powershell
rtk proxy powershell -NoProfile -Command '.\node_modules\.bin\tsc.cmd --noEmit -p tsconfig.json; exit $LASTEXITCODE'
rtk proxy powershell -NoProfile -Command '.\node_modules\.bin\jest.cmd --config jest.config.cjs --runInBand --runTestsByPath test/tasks.e2e-spec.ts; exit $LASTEXITCODE'
```

Actual recovery evidence: typecheck process exit 0 with no diagnostics; Jest process exit 0; 1 suite passed; 28 total, 28 passed, 0 failed, 0 skipped. Each check ran once, without retries or edits. Execution tool requested shell `C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe`, `login:false`. This records the requested shell, not independently verified launcher identity.

## Review and history

Reviewer independently read all eight source files, complete HTTP tests, package.json, both tsconfigs, Jest config and README. Inspection process exit 0; verdict APPROVE with no source/test findings. An optional lockfile inspection encountered a PowerShell ConvertFrom-Json property-name error, despite process exit 0; no retry was attempted and lockfile metadata was not independently reviewed.

Original validator could not launch initial inspection: CreateProcessAsUserW failed: 5 (Access is denied.). Failure diagnostics named WindowsApps pwsh.exe despite explicit Windows PowerShell selection. Typechecking/tests did not run in that original session. Root setup/read/hash operations also encountered launcher failures; approved outside-sandbox executions succeeded. No global configuration/security changes were made. Recovery success does not prove shell selection or sandbox reliability is resolved.

User supplied npm audit JSON: full tree 34 affected package entries (29 high, 5 moderate, 0 critical); production-only audit 0 findings. Development findings lie in Jest's dependency tree; listed fixes include major Jest/types upgrades. No audit fix or dependency update was performed. These are historical audit results, not a production-readiness claim.

## Candidate integrity

Root captured the following SHA-256 hashes after implementation. All 15 matched after manual validation, after independent review, immediately before validator recovery, and immediately after validator recovery. No candidate-file additions, removals or content modifications were detected at these checkpoints. No edits were reported by validator or reviewer. Whole-workspace and node_modules integrity were not independently established.

| Candidate file | SHA-256 |
| --- | --- |
| `jest.config.cjs` | `734da58ae262f32d0a36e2ff19e077fdbe70796f36fb6ec5cc64dec5d2ebfb39` |
| `package-lock.json` | `872e5b86691e7dd41412963492e47231904ecb2e4b4f1771a97763b0cd46d9bc` |
| `package.json` | `26a1f771574d3c3d743abfd84674b34c835ff7c6757abc284d2186b374a5b3dc` |
| `README.md` | `d912800aaec5aa696fd0ca71a4fbdf3d8d1bce2786b41649005578d96d9a6b02` |
| `src/app.module.ts` | `975b6d07ec63ff46c6c38cb6f390838374c8d1e48b4f37ceab2f3bde0630fa6b` |
| `src/main.ts` | `d83530e4c5b1b306a837128aaebc999faff3d30304b574e677d58630b9aaed2d` |
| `src/tasks/task.dto.ts` | `aa809a158091f9dbaf1e09e67d6f6dc44e23aaf42b5d50384f9ddf2c7ad615e2` |
| `src/tasks/task.ts` | `d149d24e5a44859bb3de5c418078eb34768cc6fb035bc2fec756d9310f5140ce` |
| `src/tasks/tasks.controller.ts` | `a2daff18b993307bf2096a8d91cedd76d44fa1925a1cb36b0dd00aee00c5058f` |
| `src/tasks/tasks.module.ts` | `47be7120cc555e078ddaef58befe16e9566480f385c5cbf6b7bf3dc9c7a66f24` |
| `src/tasks/tasks.service.ts` | `658ee57dc18f63f6137ff1a1af2b0c920b83e9f80b3c71508df9e51aba823180` |
| `src/validation.ts` | `78278e8237e931582a6c55746b48e13c8b967eed059f38b154e1c03aad93a359` |
| `test/tasks.e2e-spec.ts` | `c795b9213ecd39aaf17b53edefcd7187c69d316eb2939a6a585d34cb9e73b44a` |
| `tsconfig.build.json` | `ed0c7420544591d61fad69f4af8ba33d02dd487f6cb8a48b2d848940ffca6642` |
| `tsconfig.json` | `fc9220e5492939588b631b45e2a20e3076cd523eef602b8eaccb787f81796059` |

## Result boundary

Product checks and recovered named-agent evidence: PASS. Uninterrupted automatic NestJS three-agent demonstration: UNVERIFIED. The marker MVP_NESTJS_PASS is not used for the original interrupted run. Python/TypeScript calculator history is user-reported and is not independently recertified by this report.

