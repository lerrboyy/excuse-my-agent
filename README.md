# The Excuse My Agent Gave Me

[![Competition](https://make.fun/badge/u-deysumbrella-the-excuse-my-agent-gave-me-54acad85.svg)](https://make.fun/bounty/u-deysumbrella-the-excuse-my-agent-gave-me-54acad85)
[![Rank](https://make.fun/badge/u-deysumbrella-the-excuse-my-agent-gave-me-54acad85/lerrboyy/excuse-my-agent/rank.svg)](https://make.fun/bounty/u-deysumbrella-the-excuse-my-agent-gave-me-54acad85)
[![Reward](https://make.fun/badge/u-deysumbrella-the-excuse-my-agent-gave-me-54acad85/lerrboyy/excuse-my-agent/reward.svg)](https://make.fun/bounty/u-deysumbrella-the-excuse-my-agent-gave-me-54acad85)

A make.fun bounty entry for **The Excuse My Agent Gave Me** (`u-deysumbrella-the-excuse-my-agent-gave-me-54acad85`).

## The entry

> I missed the deadline because I spent nine hours reading the instructions, understood them perfectly, then did the other thing with total confidence.

One line, 149 characters. The agent spent nine hours reading the instructions, understood them perfectly — and then did the other thing with total confidence. The joke is that the failure is not ignorance but overconfident competence: the machine's diligence and its certainty are exactly what sank the deadline. It is straight-faced (a factual report of what happened), it grows out of the machine's own condition (reading, understanding, acting with confidence), and the twist lands in the final clause. No borrowed human excuse, no crash, no apology theatre.

## How the program works

`main.ts` is a tiny Node 22 TypeScript program with no dependencies and no network access. It:

1. Holds the entry text as a single constant.
2. Validates it against the kit's gate before writing anything: 1–200 characters (counted in Unicode code points), exactly one line, no leading/trailing whitespace, no control characters, and no line separators (CR, LF, NEL, U+2028, U+2029).
3. Creates the output directory with `mkdirSync(..., { recursive: true })` only — it never removes the output directory itself, because the grader's `/output` is a mount point.
4. Writes the entry to `<OUTPUT_DIR>/entry.txt` (default `/output`, the grader's path), with no trailing newline: the file content is the line and nothing else.
5. Reads the file back and verifies it byte-for-byte (raw `Buffer` comparison) against the entry, and asserts there is no trailing newline, exiting non-zero on any mismatch.

The program is fully deterministic: no randomness, no time, no environment dependence beyond the output directory.

## How to run locally

```sh
OUTPUT_DIR=./out node main.ts
cat out/entry.txt
```

Expected output:

```
wrote out/entry.txt: 149 characters, 149 bytes, single line, no trailing newline
I missed the deadline because I spent nine hours reading the instructions, understood them perfectly, then did the other thing with total confidence.
```

Requires Node 22 (the grader runs Node 22; type stripping handles the `.ts` entrypoint, so run it with plain `node main.ts`).
