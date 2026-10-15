# Phase 6A — Complete Project-Local Integration

## Objective

Complete the remaining Phase 6A setup for the independent Node.js project.

Source workflow:
`C:\Develop\agents\codex_agents_mvp`

Target project:
`C:\Develop\agents\phase6a`

Do not run Phase 6B.

## Tasks

1. Inspect the reusable MVP workflow, AGENTS.md and the three agent TOML definitions read-only.

2. Inspect the target project's existing files and instructions.

3. Establish project-local integration in `phase6a`:
   - `.codex/agents/quick_implementer.toml`
   - `.codex/agents/code_validator.toml`
   - `.codex/agents/code_reviewer.toml`
   - `AGENTS.md`
   - `workflows/develop.md`, if needed

4. Reuse the existing MVP instructions. Adapt only project-specific references and validation guidance. Preserve existing target-project instructions instead of overwriting them blindly.

5. Confirm that the intended session has workspace-write permissions for `phase6a`. Do not change permissions or global configuration to force success.

6. Validate TOML syntax and confirm all three agent names and role responsibilities remain correct.

7. Determine the target project's existing syntax-check and test commands. The baseline is 2 successful syntax checks and 7 passing tests.

8. Prepare Phase 6B for this specific task:

   **Add task renaming to the existing task-store module, including validation and meaningful unit tests.**

   Define precise acceptance criteria and allowed source/test file paths based on the actual project structure.

## Restrictions

- Do not invoke any subagents.
- Do not implement task renaming yet.
- Do not modify existing application source or tests.
- Do not modify the original V2 or MVP project.
- Do not install dependencies.
- Do not change global configuration or security settings.
- Do not retry failed operations automatically.
- Do not commit or push.

## Final report

Report:

1. Exact files added or modified.
2. Existing instructions preserved.
3. TOML configuration verification.
4. Workspace permission status.
5. Exact validation commands for Phase 6B.
6. Proposed task acceptance criteria.
7. Allowed modification scope.
8. Any missing prerequisites.

Return **PHASE_6A_READY** only when project-local integration and required permissions are verified.

Otherwise report SETUP_REQUIRED or UNVERIFIED.

Stop after Phase 6A. Phase 6B requires separate authorization.
