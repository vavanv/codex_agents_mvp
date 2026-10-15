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
