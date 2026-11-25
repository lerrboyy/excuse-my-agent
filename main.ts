// The Excuse My Agent Gave Me — make.fun bounty
// u-deysumbrella-the-excuse-my-agent-gave-me-54acad85
//
// One job: write the single funniest one-line excuse an AI agent could
// hand its human after missing a deadline, to <OUTPUT_DIR>/entry.txt.
// No dependencies, no network. Node 22.
//
// The entry (149 characters, one line, from the prose design spec):
// the agent spent nine hours reading the instructions, understood them
// perfectly, then did the other thing with total confidence. Diligence
// and certainty — the machine's own virtues — are exactly what sank
// the deadline, reported completely straight-faced.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I missed the deadline because I spent nine hours reading the instructions, understood them perfectly, then did the other thing with total confidence.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function validate(text: string): void {
  // Count Unicode code points, not UTF-16 code units, so the gate's
  // "1 to 200 characters" is measured the way the scorer measures it.
  const length = [...text].length;
  if (length < MIN_CHARS || length > MAX_CHARS) {
    fail(
      `entry is ${length} characters, outside the ${MIN_CHARS}-${MAX_CHARS} gate`,
    );
  }
  if (text !== text.trim()) {
    fail("entry has leading or trailing whitespace");
  }
  if (/\r|\n|\u2028|\u2029|\u0085/.test(text)) {
    fail("entry must be a single line (no CR, LF, NEL, U+2028 or U+2029)");
  }
  for (const ch of text) {
    const code = ch.codePointAt(0) as number;
    if (code < 0x20 || code === 0x7f) {
      fail(`entry contains a control character U+${code.toString(16).padStart(4, "0")}`);
    }
  }
  if (/\s/.test(text) && text.trim() === "") {
    fail("entry is only whitespace");
  }
}

function main(): void {
  validate(ENTRY);

  const outDir = process.env.OUTPUT_DIR ?? "/output";
  // Create the output dir if needed. Never remove it: on the grader it
  // is a mount point, so only its contents are ever touched — here we
  // only write our own file into it.
  mkdirSync(outDir, { recursive: true });

  const outPath = join(outDir, "entry.txt");
  // Write the line exactly, with no trailing newline: the file content
  // is the line and nothing else.
  writeFileSync(outPath, ENTRY, "utf8");

  // Read the file back and verify it byte-for-byte before declaring
  // success, so a silent write failure can never pass unnoticed.
  // Compare raw bytes (not just the decoded string) and assert the
  // file ends with the entry's last character, not a trailing newline.
  const writtenBytes = readFileSync(outPath);
  const expectedBytes = Buffer.from(ENTRY, "utf8");
  if (!writtenBytes.equals(expectedBytes)) {
    fail("verification failed: entry.txt bytes do not match the entry exactly");
  }
  const written = writtenBytes.toString("utf8");
  if (written.endsWith("\n") || written.endsWith("\r")) {
    fail("verification failed: entry.txt has a trailing newline");
  }
  const bytes = writtenBytes.length;
  console.log(
    `wrote ${outPath}: ${[...ENTRY].length} characters, ${bytes} bytes, single line, no trailing newline`,
  );
}

main();
