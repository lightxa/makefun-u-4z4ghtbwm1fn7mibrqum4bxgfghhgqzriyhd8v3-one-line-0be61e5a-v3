// One Line, One Laugh — variant 3.
//
// Design choice: the joke lives or dies on one concrete image, so the
// entry keeps a single scene and escalates it in one move. A phone
// charger that only works at one exact angle becomes an object of
// worship, and its owner becomes a believer with a daily ritual. No
// second character, no negotiation, no transaction: the absurdity is
// that devotion is the only fix on offer. The tone stays deadpan and
// the sentence stays tight, because a one-liner has no room for setup
// that does not pay off in the same breath.
//
// Structure: the entry text is a plain constant at the top, the gate
// validation lives in its own function below, and the output writing
// lives in a separate function after that, so each part can be read
// and checked on its own.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The judged entry. Kept as one literal so the output is exactly
// this string, with no joining, templating, or transformation applied.
const ENTRY =
  "My charger only works at one exact angle, so I now pray to it like a god with a single sacred position.";

// The competition gate for a one-line entry: at least 1 and at most
// 140 characters. These bounds are named here so the validation
// below reads as a rule rather than a pair of magic numbers.
const MIN_LENGTH = 1;
const MAX_LENGTH = 140;

// Gate validation, kept apart from writing: reject any entry that
// falls outside the allowed length before anything touches the disk,
// so a bad entry fails loudly instead of producing a bad file.
function validateEntry(text: string): void {
  if (text.length < MIN_LENGTH || text.length > MAX_LENGTH) {
    throw new Error(
      `entry is ${text.length} characters, must be ${MIN_LENGTH}-${MAX_LENGTH}`,
    );
  }
}

// Output writing, kept apart from validation: resolve the output
// directory from the harness environment (falling back to /output),
// create it if needed, then write the validated entry as UTF-8 text
// to entry.txt. Writing happens only after validation has passed.
function writeEntry(text: string): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
}

// Deterministic, stdlib only, no network. Validate first, then write.
validateEntry(ENTRY);
writeEntry(ENTRY);
