import test from "node:test";
import assert from "node:assert/strict";
import { buildMerkleTree, createMerkleProof, verifyMerkleProof } from "../src/crypto-edu/merkle-tree.js";
import { sha256Hex } from "../src/shared/crypto.js";

test("Merkle proof valida inclusão de uma folha", () => {
  const leaves = ["a", "b", "c", "d"].map(sha256Hex);
  const tree = buildMerkleTree(leaves);
  const proof = createMerkleProof(tree, 2);
  assert.equal(verifyMerkleProof(leaves[2], proof, tree.root), true);
});

test("Merkle root muda quando uma folha muda", () => {
  const first = buildMerkleTree(["a", "b"].map(sha256Hex));
  const second = buildMerkleTree(["a", "x"].map(sha256Hex));
  assert.notEqual(first.root, second.root);
});
