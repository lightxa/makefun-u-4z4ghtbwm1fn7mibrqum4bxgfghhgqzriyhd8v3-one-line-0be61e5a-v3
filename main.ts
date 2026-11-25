// One Line, One Laugh — variant 3.
// A different angle from variants 1 and 2: no child, no retreat, no
// transaction. One concrete scene — a dying phone charger that only
// works at a single exact angle — escalated to absurd devotion. The
// turn is the worship: a frayed cable becomes a god with one sacred
// position, and the owner becomes its only believer. Deadpan, tight,
// no setup wasted.
const ENTRY =
  "My charger only works at one exact angle, so I now pray to it like a god with a single sacred position.";

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Deterministic, stdlib only, no network. The gate requires 1-140
// characters of UTF-8 text, so guard the length before writing.
if (ENTRY.length < 1 || ENTRY.length > 140) {
  throw new Error(`entry is ${ENTRY.length} characters, must be 1-140`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
