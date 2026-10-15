# Codex Agents MVP — Implementation Plan

**Status (2026-10-15):** **PHASE 5B PASS — PHASE 5C COMPLETE — PHASE 6B OWNER-REPORTED PASS — PHASE 7 PACKAGING AUTHORED**  
**Target directory:** `C:\Develop\agents\codex_agents_mvp`  
**Runtime observed during setup:** `codex-cli 0.162.1`, Python `3.12.6`; interactive Codex CLI on Windows 11  
**Goal:** One user request -> one implementer -> one independent test agent -> one independent review agent -> an honest result.

> **Status update scope:** This document retains the original MVP setup specification and acceptance criteria. Earlier progress entries reflect results reported by the project owner; Phase 5B below records actual named-agent evidence from this session. Phase 5C is a separately authorized documentation/configuration recovery, without subagents or development demonstrations. Sections 4–6 and 10 describe the original setup/demonstration and are historical, not instructions to repeat completed work.

## Current project status (as of 2026-10-15)

**Outcome:** Python and the separately authorized Phase 5B NestJS change completed uninterrupted named three-agent demonstrations. Phase 5B is **PASS — MVP_NESTJS_UNINTERRUPTED_PASS**. Earlier TypeScript/NestJS interruptions and the initial Phase 5B preflight remain **UNVERIFIED**; recovered results retain their separate status. Phase 5C generalizes the successful workflow as project-local instructions, without claiming cross-project execution or resolved Windows shell selection.

| ID | Milestone | Status | Evidence / limitation |
| --- | --- | --- | --- |
| Phase 0 | Read-only V2 inspection and migration manifest | **COMPLETE** | `AGENTS.md` found and rewritten; three V2 role TOMLs absent, recreated for MVP; 622 V2 file hashes, HEAD and dirty status unchanged |
| Phase 1 | MVP scaffold and deliberately failing Python baseline | **COMPLETE** | Eight scaffold files + retained `plan.md`; all three TOMLs parsed; 4 baseline tests: 3 passed, 1 expected failure, exit 1 |
| Phase 2A | Interactive named-role discovery | **COMPLETE** | `collaboration.spawn_agent` exposed `agent_type` choices `quick_implementer`, `code_validator`, `code_reviewer`; role selection, not instruction enforcement, confirmed |
| Phase 2 | Python calculator three-agent demonstration | **PASS (`MVP_DEMO_PASS`)** | Named implementer, validator and reviewer; 4/4 tests, exit 0; reviewer APPROVE; stable root-measured candidate hash |
| Phase 3 | TypeScript calculator initial attempt | **UNVERIFIED (historical)** | Implementer and validator completed; reviewer could not start WindowsApps `pwsh.exe` (`CreateProcessAsUserW`, error 5) |
| Phase 3B | TypeScript reviewer-only recovery | **PASS — RECOVERED** | Named reviewer inspected candidate, APPROVE; two candidate hashes unchanged; no TS compiler check in this example |
| Phase 4 | NestJS initial automatic attempt | **UNVERIFIED (historical)** | Named implementer completed; named validator could not launch WindowsApps PowerShell; review did not run in that attempt |
| Phase 4A | NestJS manual validation and independent AI review | **PASS — PARTIAL RECOVERY** | `tsc` exit 0, Jest 28/28 exit 0 from a separate terminal; named reviewer APPROVE; all 15 candidate files unchanged |
| Phase 4B | NestJS named-validator recovery | **PASS — RECOVERED** | Named `code_validator` ran typecheck exit 0 and Jest 28/28 exit 0; all 15 candidate hashes unchanged |
| Phase 5A | Stabilize supported Windows shell selection | **UNVERIFIED — unresolved** | Outer launcher behavior remains unresolved; ancestry is diagnostic, not a development acceptance condition |
| Phase 5B | Uninterrupted three-agent NestJS run on a new small change | **PASS — MVP_NESTJS_UNINTERRUPTED_PASS** | GET /tasks/count; three actual named stages; tsc exit 0, Jest 32/32 exit 0, APPROVE; all 15 hashes stable |
| Phase 5C initial attempt | Generic workflow documentation | **UNVERIFIED (historical)** | First patch rejected delete/add of the same path; no files changed; no retry |
| Phase 5C recovery | Reusable workflow documentation/configuration | **COMPLETE — documentation/configuration** | Six documentation checks passed; valid TOML, unchanged role names and application files; no subagents or cross-project demonstration |
| Phase 6B | Separate Node.js project portability | **OWNER-REPORTED PASS — MVP_PORTABILITY_PASS** | Rename feature; 12/12 tests and two syntax checks exit 0; independent APPROVE; matching hashes; historical session IDs/digests not supplied |
| Phase 7 | Manual adoption template and setup guide | **AUTHORED — validation/review pending** | Project-local template, merge-safe SETUP.md and Windows guidance; no new runner or external-project changes |

**Status meanings:** `PASS` = required positive evidence observed for that scoped run; `PASS — RECOVERED` = combined evidence from separately authorized stages, **not** an uninterrupted run; `UNVERIFIED` = mandatory evidence missing or stage could not run; `FAILED` = actual validation/review rejection or unauthorized mutation; `PENDING` = not undertaken. An earlier `UNVERIFIED` result remains intact after any later recovery.

**Next actionable task:** Complete independent verification/review of the authorized Phase 7 packaging candidate. Adoption/development in another project or further Phase 5A diagnostics requires its own authorized scope. Do not repeat demonstrations, alter global configuration or treat requested shell selection as proof of the outer launcher.

## 1. Mission

Build a **small, usable automatic software-development workflow**, not an agent framework.

A developer opens Codex CLI in a local project, makes **one request**, and the Codex root coordinates these distinct stages in order:

1. **Implementer** makes the requested code change.
2. **Validator** executes real tests against that changed version.
3. **Reviewer** independently inspects the same version and reports approval or findings.
4. **Root** checks the observed results and reports `PASS`, `FAILED`, or `UNVERIFIED`.

No GitHub, new API/SDK, server, daemon, custom runner, JSONL processor, App Server integration, launch packet, state database, or website is needed for this MVP.

**The priority is one working demonstration, not extensive internal runtime qualification.**

## 2. Scope and boundaries

### In scope

- A new independent local folder, separate from `codex_agents`.
- Existing Codex CLI interactive sign-in and configuration (read/use only).
- Three small project-scoped custom-agent TOMLs.
- A short `AGENTS.md` and one reusable workflow instruction.
- One Python standard-library calculator fixture with four tests.
- A human-observable end-to-end demonstration, including real test output and source version hashes.
- A concise README describing how to run the workflow.

### Out of scope

- Copying the original project's orchestration scripts, evidence archives, receipts, probes, or launch infrastructure.
- Changing `C:\Develop\agents\codex_agents`, global Codex config, authentication, provider, credentials, or model installations.
- `codex exec --json`, Codex App Server, Agents SDK, GitHub, OpenCode, or Claude Code integrations.
- Git init/branches/commits/push, deployment, background automation, or file changes outside the new MVP folder.
- Native T1 qualification, OS sandbox certification, exact error cause attribution, retry/repair orchestration, or strict hidden-attempt proof.
- Any claim that agent instructions enforce independent OS-level read-only permissions.

**This plan does not authorize running models or changing external systems.** Scaffold locally first; run the demonstration only when the project owner explicitly requests it.

## 3. Folder structure

```text
C:\Develop\agents\
├── codex_agents\                   # OLD project: do not modify
└── codex_agents_mvp\               # NEW standalone project
    ├── plan.md
    ├── README.md
    ├── AGENTS.md
    ├── .codex\
    │   └── agents\
    │       ├── quick_implementer.toml
    │       ├── code_validator.toml
    │       └── code_reviewer.toml
    ├── workflows\
    │   └── develop.md
    └── examples\
        ├── calculator\
        │   ├── calculator.py
        │   └── test_calculator.py
        ├── calculator-ts\                # added after Python success
        │   ├── calculator.ts
        │   └── test_calculator.ts
        └── nestjs-api\                    # added after TypeScript demo
            ├── package.json
            ├── package-lock.json
            ├── src\ ...
            └── test\ ...
```

**Historical baseline:** Phase 1 had no `package.json`, `requirements.txt`, database, installer, or custom Python orchestration module. **Current state:** The later NestJS example intentionally has `package.json`, a lockfile and locally installed dependencies. No custom orchestration engine was introduced. The tree above is illustrative and not an authoritative file inventory.

## 4. Phase 0 — Inspect and decide what to reuse (no model execution)

1. Confirm that the target path is a new, separate folder. If it already contains files, inspect them and do not overwrite unexpectedly.
2. Follow the explicit source-to-destination map in **Section 4A**. Inspect, **read-only**, the old project's `AGENTS.md` and three role files if present; treat them as references, not dependencies. Do not invent an old source file if it is absent.
3. Confirm the installed Codex CLI release using its normal CLI version display; record the version in the new README. Do not require upgrading it.
4. Compare the *actual* installed release's supported agent TOML fields and multi-agent availability with the official documentation. Current documentation may differ from the installed version.
5. Create fresh minimal project-local TOMLs from the behavior below. Copy **no** global settings, credentials, private paths, or old verification infrastructure. No V2 file is required to be copied verbatim.
6. If project-local role selection or delegation is unavailable in this runtime, document `BLOCKED_ROLE_SELECTION` rather than rewriting user/global Codex configuration or pretending that generic children loaded named roles.

**Acceptance:** The old directory and installed/global Codex state are unchanged. The new project has no external dependencies.

## 4A. Exact V2-to-MVP file migration (mandatory; read-only source)

**Source root (existing V2):** `C:\Develop\agents\codex_agents\`  
**Destination root (new MVP):** `C:\Develop\agents\codex_agents_mvp\`

These are **expected relative paths**, not a claim that every file exists in the old repository. For each V2 source listed below, check the actual path first. If missing, record `NOT_FOUND` in the setup report; use the fresh definition in Section 5 where available. Do not search for similar filenames in unrelated/private folders, infer a replacement, or change the old repository.

| Exact V2 source (under `codex_agents\`) | Exact MVP destination (under `codex_agents_mvp\`) | Migration operation | What to retain / discard |
| --- | --- | --- | --- |
| `AGENTS.md` | `AGENTS.md` | **READ + REWRITE**, not byte-copy | Retain only applicable coding discipline and role boundaries; use the short MVP text in Section 5.1. Discard T1/FS4 evidence gates, obsolete runtime instructions, and V2-specific paths. |
| `.codex\agents\quick_implementer.toml` | `.codex\agents\quick_implementer.toml` | **READ + RECREATE minimal TOML** | Retain the implementer's bounded source-editing purpose; replace old model, sandbox, telemetry, and coordinator assumptions with Section 5.2. |
| `.codex\agents\code_validator.toml` | `.codex\agents\code_validator.toml` | **READ + RECREATE minimal TOML** | Retain independent actual-test execution and read-only-by-instruction behavior; replace old launch/receipt/permission-probe assumptions with Section 5.3. |
| `.codex\agents\code_reviewer.toml` | `.codex\agents\code_reviewer.toml` | **READ + RECREATE minimal TOML** | Retain independent review and a concrete `APPROVE`/`REQUEST_CHANGES` verdict; remove old provenance and model-specific dependencies. Use Section 5.4. |
| **No V2 source required** | `workflows\develop.md` | **CREATE NEW** | Use the prompt template in Section 5.5; do not import an old launcher or orchestration plan. |
| **No V2 source required** | `examples\calculator\calculator.py` | **CREATE NEW** | Use the deliberately broken baseline from Section 5.6. Do **not** copy an already repaired V2 calculator or another fixture. |
| **No V2 source required** | `examples\calculator\test_calculator.py` | **CREATE NEW** | Use exactly the four prescribed baseline tests in Section 5.6; do not import the V2 test harness. |
| **No V2 source required** | `README.md` | **CREATE NEW** | Document setup, one-prompt demo, limits, test command, and observable results as in Section 5.7. |
| `plan.md` (this document, if being copied from elsewhere) | `plan.md` | **KEEP CURRENT MVP PLAN** | Use this plan as the build specification, not any old V2 implementation/validation plan. |

**No V2 source file must be copied byte-for-byte.** “Reuse” means **inspect the three roles and project instructions, then write smaller project-specific files**. The Section 5 examples define the MVP baseline; where old content conflicts with them, preserve the MVP boundary and flag any unresolved CLI syntax as `BLOCKED_ROLE_SELECTION` rather than importing V2 complexity.

### Explicit exclusions — never migrate

Do not copy or depend on `scripts/v2/`, `tests/v2/`, coordinator/supervisor modules, App Server/SDK adapters, JSONL reducers, FS3/FS4/T1 packets, historical receipts, execution logs, traces, provenance snapshots, verification/audit archives, `.git/`, global `.codex/` configuration, `.env` files, credentials, tokens, caches, temporary state, or user-specific absolute paths. If one of these is needed to make the MVP run, **stop and report the dependency** rather than quietly importing it.

Do not run `Copy-Item -Recurse` on the old directory or transplant the old repository wholesale. The only allowed V2 accesses in Phase 0/1 are **read-only inspections** of the four candidate source files and read-only checks that the old tree stayed unchanged.

### Required source-preservation check

1. Before reading/recreating the MVP files, establish that the old project exists. Record the original Git HEAD and working-tree status **without changing Git state**, plus SHA-256 hashes of the four V2 source candidates that actually exist. Record any pre-existing dirty files; do not attempt to clean them.
2. For stronger coverage, take a read-only SHA-256 inventory of **all regular files in the old working tree**, excluding `.git/`, and retain it **in memory** during the scaffold operation (or compare it using separately authorized reports stored **only inside the MVP**). Never write a receipt into the old project.
3. After the MVP scaffold and expected baseline tests, repeat those observations and compare them with the initial snapshot. The before/after set of paths and hashes, Git HEAD, and working-tree status must agree. Do not interpret an initially dirty repository as a new mutation.
4. If they differ, stop with `SOURCE_PRESERVATION_FAILED`, identify the paths changed, and do not automatically reset, repair, stage, commit or delete anything in V2.
5. In the final setup report, include an **explicit source→destination manifest** for the four candidate paths: `FOUND/NOT_FOUND`, `REWRITTEN/CREATED_NEW`, and `NO_ORIGINAL_MUTATION` only if the comparison actually succeeded.

For a simple Windows PowerShell session, the following **read-only inventory** can be invoked both before and after scaffolding; keep `$before` available for the later comparison. It does not write to the old project:

```powershell
$old = 'C:\Develop\agents\codex_agents'
if (-not (Test-Path -LiteralPath $old -PathType Container)) {
    throw "Old V2 project not found: $old"
}
function Get-OldTreeHashes {
    Get-ChildItem -LiteralPath $old -Recurse -File -Force |
        Where-Object { $_.FullName -notlike "$old\.git\*" } |
        ForEach-Object {
            $relative = [System.IO.Path]::GetRelativePath($old, $_.FullName)
            "$relative`t$((Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash)"
        } | Sort-Object
}
$before = @(Get-OldTreeHashes)
# Create the MVP scaffold in the NEW directory only, then:
$after = @(Get-OldTreeHashes)
$differences = @(Compare-Object -ReferenceObject $before -DifferenceObject $after)
if ($differences.Count -ne 0) { throw 'SOURCE_PRESERVATION_FAILED' }
```

Also compare the original Git HEAD and working-tree status captured at both points when Git is available. This check verifies content consistency for the observed files; it does **not** attest to Codex's internal runtime policy, hidden execution, or authorization beyond the MVP scope. If the scaffold is performed across separate PowerShell sessions, don't pretend `$before` persisted; explicitly preserve the initial inventory **within the new MVP directory** and document that additional output, or perform a fresh single-session comparison before claiming preservation.

**Migration acceptance:** four expected V2 sources were checked without modifying them; all MVP destinations were created using Section 5; excluded V2 infrastructure was not imported; the original tree's before/after comparison passed; no credentials, global settings or old-project files changed.

## 5. Phase 1 — Scaffold the MVP

### 5.1 `AGENTS.md`

Create a short instruction file with these rules:

```markdown
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
```

Keep it concise; do not migrate the old V2 security or telemetry policies into the MVP.

### 5.2 `.codex/agents/quick_implementer.toml`

Use the supported project-local custom-agent format. Minimum fields:

```toml
name = "quick_implementer"
description = "Implement a small, bounded source-code change; do not validate or review."
developer_instructions = """
You are the implementer. For the calculator demo, edit ONLY
examples/calculator/calculator.py. Make the smallest correct change.
Do not modify tests, configuration, agent definitions or README files.
Do not run the validation suite; leave that to the separate validator.
Report which file changed and the final result. Do not delegate further.
"""
```

### 5.3 `.codex/agents/code_validator.toml`

```toml
name = "code_validator"
description = "Independently execute real tests for an existing candidate without editing files."
developer_instructions = """
You are an independent validator. Do not edit any file or delegate.
Execute the exact test command supplied by the root once, from the project root.
Report the real process exit code, test count, PASS/FAIL and any concise
failure summary. Do not claim PASS without observing test execution.
"""
```

### 5.4 `.codex/agents/code_reviewer.toml`

```toml
name = "code_reviewer"
description = "Review a finished candidate independently after tests; do not edit files."
developer_instructions = """
You are an independent reviewer. Do not edit any file or delegate.
Read the candidate source and its tests; check correctness, boundaries,
regressions and test coverage. Return APPROVE with no findings only if
satisfied; otherwise return REQUEST_CHANGES and concrete findings.
Include the candidate SHA-256 provided by root in the response, but do not
claim you independently measured it unless you actually did so.
"""
```

**Model selection:** Do not hard-code old `gpt-6-luna`/`gpt-6-sol` values into the new files until the installed CLI and current account actually support them. In the first MVP, let the roles inherit the existing model. Distinct *agent sessions and task scopes* matter more than different model names. If explicit supported model settings are desired later, review separately.

**Permission warning:** Codex custom agents inherit the parent session's sandbox/approval settings. Reviewer and validator "do not edit" instructions do not create OS isolation. Set the parent permission mode intentionally before the demo and inspect all resulting file changes.

### 5.5 `workflows/develop.md`

This is a **prompt template**, not an executable program or automatically loaded Codex config:

```markdown
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

### 5.6 Calculator baseline (setup only)

Create `examples/calculator/calculator.py` with a *known, intentional fixture bug*:

```python
def clamp(value: float, lower: float, upper: float) -> float:
    """Return value clamped to the inclusive [lower, upper] range."""
    if lower > upper:
        raise ValueError("lower must not exceed upper")
    if value < lower:
        return value  # Known fixture bug: should return lower.
    if value > upper:
        return upper
    return value
```

Create `examples/calculator/test_calculator.py` using `unittest` and **exactly four test methods**:

```python
import unittest
from calculator import clamp


class ClampTests(unittest.TestCase):
    def test_below_lower(self):
        self.assertEqual(clamp(-5, 0, 10), 0)

    def test_inside_float(self):
        self.assertEqual(clamp(2.5, 0, 10), 2.5)

    def test_above_upper(self):
        self.assertEqual(clamp(15, 0, 10), 10)

    def test_inclusive_endpoints(self):
        with self.subTest("lower"):
            self.assertEqual(clamp(0, 0, 10), 0)
        with self.subTest("upper"):
            self.assertEqual(clamp(10, 0, 10), 10)


if __name__ == "__main__":
    unittest.main()
```

During **scaffolding only**, verify that `python -m unittest discover -s examples/calculator -p "test_*.py" -v` executes **four tests with one expected failure**. This proves the fixture begins in a failing state. Do not repair the code during setup; keep it for the separate demonstration. If `python` is unavailable, stop and agree on one installed interpreter/command before editing the workflow template; do not auto-install Python.

### 5.7 README

Document how to start the interactive CLI in this folder, the exact workflow prompt, the test command, what evidence to inspect, and the warning that success is not guaranteed by the prompts alone.

**Phase 1 acceptance — COMPLETE:** All required scaffold files were created and the three TOMLs parsed. The baseline ran once: four tests, three passed, one *expected* failure, process exit `1` (`test_below_lower`, `-5 != 0`). Calculator baseline SHA-256: `D9D59CDF13F108761EDD1653B37B5D955BD9D5C0244B670852C6977EFB846822`. No code repair or agents ran during the scaffold. Reported V2 preservation was **622 original file hashes unchanged**, along with Git HEAD and dirty state.

## 6. Phase 2 — One interactive end-to-end demonstration (**COMPLETE / PASS; historical procedure**)

1. Open PowerShell in the new folder:

   ```powershell
   Set-Location 'C:\Develop\agents\codex_agents_mvp'
   codex
   ```

2. Confirm that Codex is using the new project instructions and that named project-local agents can actually be selected. Do not mistake a textual task name for genuine `agent_type` selection. If the selected Codex interface exposes no trustworthy way to use the three named agents, stop with `UNVERIFIED` and record the limitation.
3. Give **one** user request using the text in `workflows/develop.md`. The root should dispatch the agents itself; do not manually issue stage-by-stage prompts.
4. Implementer makes the one-file change; root records a candidate SHA-256. On Windows, a possible read-only command is:

   ```powershell
   (Get-FileHash -Algorithm SHA256 .\examples\calculator\calculator.py).Hash
   ```

5. Validator independently runs exactly the four-test command and reports actual execution, **4 tests / exit code 0 / OK** if correct.
6. Reviewer reads source/tests and gives a separate `APPROVE` or `REQUEST_CHANGES` result.
7. Root checks hashes are unchanged across validator and reviewer stages, ensures only `calculator.py` changed from the baseline, and reports evidence. Human inspects the resulting source and terminal output.
8. No auto-retry. If the run fails, save a brief human-readable note and decide on the smallest next fix separately.

Do not require deep trace parsing, native hidden-attempt coverage, exact model attestation, or typed pre-initialization error causes for **this separate MVP experiment**. These remain outside the product experiment, and original V2 qualification remains blocked.

**Phase 2A discovery — COMPLETE:** A fresh interactive Codex tool declaration exposed `collaboration.spawn_agent` with `agent_type` selecting the three named roles. Earlier attempts to launch an interactive session through a terminal tool were **UNVERIFIED** (`Access Denied` / `stdout is not a terminal`), not a role-selection failure. Named role availability was established afterward without invoking agents; loading/enforcement was not proven by discovery alone.

**Phase 2 execution — PASS:** Three distinct named agents completed in order: `/root/calculator_implementation` (`quick_implementer`) changed the below-lower branch to `return lower`; `/root/calculator_validation` (`code_validator`) ran `python -m unittest discover -s examples/calculator -p "test_*.py" -v` with **4 passing tests, exit 0**; `/root/calculator_review` (`code_reviewer`) inspected source/tests and gave **APPROVE**. The reviewer’s optional hash command failed without retry; root measured an identical hash after all three stages: `56D97B1275B100048DB951AE82FE68F7DA7828D5CE4200959D3EC96CCD1957BD`. Only `examples/calculator/calculator.py` changed; no install, retry, commit or push.

## 7. MVP acceptance criteria

The **Python calculator demonstration** met the original **MVP_DEMO_PASS** criteria below (checked against the reported outcome):

- [x] Exactly one initial user request caused automatic, sequential delegation to **three distinguishable real agent sessions**: implementer, validator, reviewer.
- [x] Implementation visibly changed only `examples/calculator/calculator.py` and fixed the known boundary bug.
- [x] The real validator executed the fixed `unittest` command and **four tests passed with exit 0**.
- [x] The distinct reviewer inspected the source/tests and returned `APPROVE` with no blocking findings.
- [x] The candidate SHA-256 agrees before/after validation and review; tests, instructions, roles and unrelated files remain unchanged.
- [x] Root provided a concise, evidence-backed final report; no manual agent-stage coordination was needed.
- [x] No Git, external service, credential, global configuration or old-project modification occurred.

Report **FAILED** if real tests fail, reviewer rejects, or an unauthorized mutation is observed. Report **UNVERIFIED** if the claimed actor identity, test execution, review, hashes, or other necessary positive evidence cannot be established. Do not convert `UNVERIFIED` into `PASS` using model prose.

**Scope limitation:** These checkboxes apply to the original **Python Phase 2** demonstration only. They do **not** qualify the interrupted TypeScript/NestJS attempts or establish native V2 T1 compliance. The reported evidence is not a fresh transcript audit.

## 8. Simple outcome report

```text
Codex Agents MVP — Calculator
Result: MVP_DEMO_PASS | FAILED | UNVERIFIED
Codex CLI version: <observed version>
Implementer: <observed named agent or UNKNOWN>
Modified file: examples/calculator/calculator.py
Candidate SHA-256: <observed hash or UNKNOWN>
Validator: <observed distinct agent or UNKNOWN>
Test command: python -m unittest discover -s examples/calculator -p "test_*.py" -v
Tests: 4 passed / 0 failed / exit 0  (only if actually observed)
Reviewer: <observed distinct agent or UNKNOWN>
Review: APPROVE / REQUEST_CHANGES / UNKNOWN
Other file changes: none / describe actual changes
Manual stage coordination: no / yes
Notes: <important limitations only>
```

## 9. Subsequent demonstrations — retrospective evidence and remaining limits

### Phase 3 — TypeScript calculator (**RECOVERED PASS; initial attempt UNVERIFIED**)

- **Initial run:** `quick_implementer` produced `examples/calculator-ts/calculator.ts` and `test_calculator.ts`. `code_validator` ran `node examples/calculator-ts/test_calculator.ts` once: **4 passed, exit 0**. Node executing a `.ts` file is **not** evidence of an explicit `tsc --noEmit` static typecheck.
- **Initial review:** `code_reviewer` could not start its file-inspection shell; the recorded attempted executable was WindowsApps `pwsh.exe`, failing before shell startup with `CreateProcessAsUserW failed: 5 (Access is denied.)`. Initial combined result: **UNVERIFIED**.
- **Phase 3B recovery:** `/root/typescript_reviewer_recovery`, named `code_reviewer`, successfully used `C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe` for a read-only inspection; verdict **APPROVE**, no findings. Four tests covered clamp behavior, but the implemented inverted-bound rejection was **not** covered by those four tests. No test rerun occurred during reviewer recovery.
- **Candidate integrity:** The same two hashes were measured before and after reviewer recovery:

  ```text
  examples/calculator-ts/calculator.ts
  4C931A43354AEF282A6AC54E54649359955370D5803547B7C95D1375DA7CE7D8
  examples/calculator-ts/test_calculator.ts
  B14E3D3B03AF73D042C5ABF30D53678355548EB1C3A178CD69DE6000C9C08F5B
  ```

- **Conclusion:** **RECOVERED PASS** across implementation, earlier validator execution and independently recovered review; the original interrupted attempt remains **UNVERIFIED**. Do not claim compiler validation or an uninterrupted execution.

### Phase 4 — NestJS Task Management API (**RECOVERED PASS; initial attempt UNVERIFIED**)

- **Implementation:** `/root/nestjs_implementer` as `quick_implementer` created **15 candidate files** inside `examples/nestjs-api/`, implementing `POST /tasks`, `GET /tasks`, `GET /tasks/:id`, `PATCH /tasks/:id`, `DELETE /tasks/:id`; in-memory storage; DTO validation; expected 400/404 errors and 204 delete responses.
- **Initial validator failure:** `/root/nestjs_validator` as `code_validator` failed before validation because Codex attempted WindowsApps `pwsh.exe` and `CreateProcessAsUserW` returned error 5. No compiler or Jest validation was completed by the original validator. Initial automatic result: **UNVERIFIED**.
- **Phase 4A manual checks and reviewer:** An external terminal ran `tsc.cmd --noEmit -p tsconfig.json` with **exit 0** and Jest with **1 suite, 28 passed, 0 failed, exit 0**. The named `/root/nestjs_reviewer` (`code_reviewer`) inspected source/tests/configuration and returned **APPROVE** with no source/test findings. Optional lockfile metadata inspection failed with a PowerShell JSON-parsing error and was not retried; do not claim this optional inspection succeeded.
- **Phase 4B named-validator recovery:** `/root/nestjs_validator_recovery`, real `code_validator`, executed the typecheck (**exit 0**) and Jest (**1 suite, 28 passed, 0 failed, 0 skipped, exit 0**). All **15 recorded candidate SHA-256 hashes** matched across implementation, manual validation, review and validator recovery. The exact 15 digest values are in the project's recorded evidence; **do not invent or reproduce absent values here**.
- **Dependencies:** Installation was separately authorized. npm audit reported **0 production findings; development dependency tree: 29 high and 5 moderate**. These are not a NestJS test failure; they require a separate dependency review before production adoption. Do not run `npm audit fix` without permission.
- **Conclusion at Phase 4:** **RECOVERED PASS** for implementation, actual named-agent validation, independent AI review and candidate integrity. The original interrupted workflow remains **UNVERIFIED**; uninterrupted NestJS execution had not yet been demonstrated at that point. Phase 5B later established it on a new feature.

### Phase 5B — New uninterrupted NestJS feature (**PASS**)

- **Feature:** GET /tasks/count returns `{ "count": number }`. Only the task controller, service and HTTP test file changed; four tests were added.
- **Actual sessions, sequential:** `/root/phase5b_implementer` (`quick_implementer`), `/root/phase5b_validator` (`code_validator`), `/root/phase5b_reviewer` (`code_reviewer`). Each finished before the next started.
- **Validation:** installed TypeScript `--noEmit -p tsconfig.json` exited **0**; installed Jest `--config jest.config.cjs --runInBand --runTestsByPath test/tasks.e2e-spec.ts` exited **0**: **1 suite, 32 passed, 0 failed, 0 skipped**. Both ran once using RTK/PowerShell from the example directory. No checks were rerun for this documentation recovery.
- **Independent review:** APPROVE, no findings. Root's Python hashlib checks confirmed the full **15-file path set and all hashes** identical after implementation, validation and review. Checked files outside the example were unchanged. No retry, recovery, installation or manual stage intervention occurred.
- **Result:** **MVP_NESTJS_UNINTERRUPTED_PASS**. The earlier Get-FileHash preflight interruption remains UNVERIFIED: no agents started and no source changes. The later separately authorized read-only fingerprint check passed 15/15 historical baseline comparisons before this feature attempt.

### Phase 5C — Documentation recovery

The initial Phase 5C attempt remains **UNVERIFIED**: its first patch used unsupported delete/add operations on the same path; no files changed. A prior plan-only update also stopped UNVERIFIED on console encoding, without edits. This new authorization permits root to update existing files directly, one at a time, without agents or development demonstrations. Completion requires documentation checks, valid role TOML with unchanged names, and unchanged application source/tests. No external-project runtime claim follows from these checks.

**Recovery result: COMPLETE — documentation/configuration only.** Six read-only checks passed (exit 0): UTF-8 candidate files, all three role TOMLs/names/fields, required request inputs, generic workflow portability, Markdown fences and local links. SHA-256 inventory comparison with the preserved unchanged-attempt baseline found only the six intended documentation/configuration edits and no application source/test or other unexpected changes. Manual document inspection confirmed sequential implementation, real validation, independent review and candidate path/hash consistency. No subagents, development demonstrations, installs, dependency changes, permissions changes, commits or pushes were performed.

### What is established — and what is not

- **Established:** Interactive Codex exposed real named `agent_type` selection; Python and Phase 5B NestJS demonstrated uninterrupted sequential three-agent workflows; earlier TypeScript/NestJS recovered results retain their separate evidence. The owner additionally reports uninterrupted Node.js portability in Phase 6B, with the historical evidence limitations recorded below.
- **Not established:** Reliability across repeated uninterrupted tasks, universal Windows shell compatibility, independent OS sandboxes, full enforcement of natural-language role instructions, guaranteed CI-grade isolation, or original V2 T1 compliance. The **22 strict native T1 requirements remain blocked/open in the original project**.
- **No automatic expansion:** Do not add another coordinator, parser, installer, global configuration workaround or SDK migration simply because a stage failed.

## 9A. Phase 5 — Stabilize and generalize (**5B PASS; 5A unresolved; 5C recovery**)

- [ ] **5A — Windows shell-selection stabilization.** Investigate a supported, repeatable way for the execution tool to launch the intended existing shell. Distinguish the requested shell parameter from the *actual executable* observed in traces. WindowsApps `pwsh.exe` has failed with `CreateProcessAsUserW` error 5; explicit `C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe` worked in a reviewer recovery but was not honored in every operation. Start with **one separately authorized, bounded, read-only compatibility check**, not an automatic retry of an application task. Do not disable security features, modify global configuration or claim the specific Windows policy root cause is known.
- [x] **5B — One uninterrupted three-agent NestJS change.** Completed under separate authorization on GET /tasks/count, with real named stages, typecheck/Jest success, independent APPROVE and matching candidate hashes. Prior interrupted attempts remain UNVERIFIED. The owner-approved correction made process ancestry diagnostic rather than a prerequisite.
- [x] **5C — Reusable real-project workflow.** Documentation/configuration COMPLETE after six passing checks and unchanged application-file hashes. The generic template accepts task, project path, scope, acceptance criteria, validation commands and restrictions, with sequential named roles and a lightweight evidence report. Apply elsewhere only with separately approved scope; Phase 6B subsequently supplied owner-reported Node.js portability evidence.
- [ ] **Separate backlog — dependency audit.** Review the NestJS development-dependency findings; no automatic upgrades or dependency fixes. This is not a prerequisite for recording the historical 28 passing tests.

**Phase 5 acceptance:** The original overall shell-repeatability objective remains unresolved under 5A; do not declare all of Phase 5 complete. Phase 5B's uninterrupted named-agent/check/review/hash criteria passed under the corrected diagnostic boundary. Phase 5C completion concerns reusable documentation/configuration, not demonstrated compatibility on every host or project. Missing required evidence remains UNVERIFIED.

**Next task NOW:** Phase 7 packaging is authored for independent validation and review. Do not launch cross-project adoption, diagnostics or demonstrations merely because this plan was updated.

**Stop rule:** If direct Codex coordination repeatedly fails on a supported execution path, record the limitation; do not rebuild a native adapter as the immediate fix. Evaluate alternatives separately if necessary.

## 9B. Phase 6B — Separate-project portability (owner-reported)

The owner reports **MVP_PORTABILITY_PASS** in `C:\Develop\agents\phase6a`:
`quick_implementer` implemented `rename(id, title)` and five new tests;
`code_validator` ran two syntax checks (both exit 0) and the unit tests
(12/12 passed, exit 0); `code_reviewer` independently returned APPROVE, no
findings. Only `src/task-store.js` and `test/task-store.test.js` changed;
SHA-256 candidate hashes matched across stages, with no retries or recovery.

| Historical evidence | Record |
| --- | --- |
| Actual implementer / validator / reviewer session IDs | **NOT RECORDED** — not supplied in the owner report |
| Historical per-file SHA-256 values | **NOT RECORDED** — matching values reported, digests not supplied |
| Observation in this packaging session | Owner report only; no target-project reread or historical transcript verification |

The original interrupted attempt and earlier readiness/setup failures retain
their **UNVERIFIED / SETUP_REQUIRED** outcomes. They are not part of the later
reported uninterrupted pass. This supports practical feasibility in an independent
Node.js project; it does not establish reliability across repeated runs or all
languages/frameworks. Phase 5B PASS, Phase 5C COMPLETE, the original Phase 5C
UNVERIFIED attempt and unresolved Phase 5A remain unchanged.

## 9C. Phase 7 — Packaging and real-project readiness

**AUTHORED — independent validation/review pending.** `templates/development/`
contains reusable AGENTS.md, workflows/develop.md and the three unchanged named
agent definitions. SETUP.md explains manual, merge-safe adoption, target-session
readiness, separate task authorization and existing Windows execution limitations.
No new installer, coordinator, SDK, database, background service or demonstration
is introduced. Template checks and candidate integrity remain for the distinct
validator/reviewer; this entry does not claim they already passed.

Future use should start on a separately authorized disposable copy or an isolated
branch created by the developer. Keep a simple manual record of attempted tasks,
PASS/FAILED/UNVERIFIED outcomes, failures, manual interventions and test results
to assess reliability; do not build a telemetry system as part of packaging.

## 10. Historical handoff — Phase 0/1 (**ALREADY COMPLETED; DO NOT RE-RUN**)

> Read `plan.md`, including **Section 4A (exact migration map and source-preservation check)**. Implement **Phase 0 and Phase 1 only** in `C:\Develop\agents\codex_agents_mvp`. Create only the files listed in Section 3. Inspect the old `codex_agents` project read-only and reuse only relevant agent instructions. Keep agent definitions minimal and compatible with this installed Codex CLI. Do not modify the old project, global Codex config, credentials or any external system. Create the calculator's deliberately failing baseline and execute the four local baseline tests once if Python is already available. **Do not fix the calculator or run the three-agent demonstration yet.** Report the created files, a source-to-destination migration manifest (`FOUND/NOT_FOUND`, action taken), the old-tree preservation result, baseline test result and any role-configuration uncertainty. Stop.

**Historical outcome:** The scaffold and Phase 2 Python demonstration have already been completed; the quoted prompt is retained for traceability, not as a current instruction. Follow the current status above and explicit owner authorization, preserving all earlier PASS / UNVERIFIED distinctions.

## References

- [Official Codex Subagents documentation](https://learn.chatgpt.com/docs/agent-configuration/subagents) — project-local TOML, inherited permissions, custom agent settings.
- [Official Codex AGENTS.md documentation](https://learn.chatgpt.com/docs/agent-configuration/agents-md) — project instruction discovery.

This is a **new product MVP**, not a repair, authorization, or qualification result for the earlier `codex_agents` V2 workstream.
