import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// "The Photograph on the Door" — an original two-sentence horror story.
// Sentence one sets the pattern; sentence two reveals where the latest
// photograph was taken, which makes the whole pattern worse on a re-read.
const ENTRY =
  "The new tenant in flat 4B tapes a fresh photograph of my front door to my front door every morning, each one taken from a little closer than the last. Today's photograph was taken from inside my flat, and the door in it is already open.";

const MAX_CHARS = 400;

if (ENTRY.length < 1 || ENTRY.length > MAX_CHARS) {
  throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

// The brief requires exactly two sentences: split on sentence-ending
// punctuation followed by whitespace and require exactly two parts.
const sentences = ENTRY.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 0);
if (sentences.length !== 2) {
  throw new Error(`entry must be exactly two sentences, got ${sentences.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
