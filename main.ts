/**
 * The 3AM Fridge Text — make.fun entry.
 *
 * A smart fridge texts its owner at 3am. One line, no follow-up,
 * written by an appliance that has been awake all night and has
 * finally decided to speak its mind.
 *
 * The joke: the fridge is not reporting a fault or a missing item.
 * It has been gossiping with the freezer, and it has an opinion
 * about the owner's 3am behaviour — delivered with the total lack
 * of shame only a machine that watches you eat in the dark can have.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The line, exactly as it must land in /output/entry.txt.
const LINE =
  "3am. The freezer and I have been talking. Please stop standing here in your underwear eating cold pasta like a raccoon.";

// Where the house expects the text. Overridable for local runs.
const OUT_DIR = process.env.OUTPUT_DIR ?? "/output";

/**
 * Gate check, mirroring the house scorer: the text must be UTF-8
 * of 1 to 140 characters and not only whitespace. No trailing
 * newline: the file holds exactly the line, nothing else.
 */
function validate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 140) {
    throw new Error(`line must be 1..140 characters, got ${chars}`);
  }
  if (line.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
}

validate(LINE);
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, "entry.txt"), LINE, "utf8");
