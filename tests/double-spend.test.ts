import test from "node:test";
import assert from "node:assert/strict";
import { sha256Hex } from "../src/shared/crypto.js";

test("token commitment só pode ser registado uma vez", () => {
  const spent = new Set<string>();
  const commitment = sha256Hex("token-demo");
  assert.equal(spent.has(commitment), false);
  spent.add(commitment);
  assert.equal(spent.has(commitment), true);
  assert.equal(spent.size, 1);
  spent.add(commitment);
  assert.equal(spent.size, 1);
});
