import { sha256Hex } from "../shared/crypto.js";

export interface MerkleProofStep {
  position: "left" | "right";
  hash: string;
}

export interface MerkleTree {
  leaves: string[];
  levels: string[][];
  root: string;
}

function hashPair(left: string, right: string): string {
  return sha256Hex(`merkle:${left}:${right}`);
}

export function buildMerkleTree(leaves: string[]): MerkleTree {
  if (leaves.length === 0) {
    const root = sha256Hex("merkle:empty");
    return { leaves: [], levels: [[root]], root };
  }

  const levels: string[][] = [leaves.slice()];
  let current = leaves.slice();

  while (current.length > 1) {
    const next: string[] = [];
    for (let i = 0; i < current.length; i += 2) {
      const left = current[i];
      const right = current[i + 1] ?? left;
      next.push(hashPair(left, right));
    }
    levels.push(next);
    current = next;
  }

  return { leaves: leaves.slice(), levels, root: current[0] };
}

export function createMerkleProof(tree: MerkleTree, leafIndex: number): MerkleProofStep[] {
  if (leafIndex < 0 || leafIndex >= tree.leaves.length) throw new Error("Índice de folha inválido.");
  const proof: MerkleProofStep[] = [];
  let index = leafIndex;

  for (let level = 0; level < tree.levels.length - 1; level++) {
    const nodes = tree.levels[level];
    const siblingIndex = index % 2 === 0 ? index + 1 : index - 1;
    const sibling = nodes[siblingIndex] ?? nodes[index];
    proof.push({ position: index % 2 === 0 ? "right" : "left", hash: sibling });
    index = Math.floor(index / 2);
  }

  return proof;
}

export function verifyMerkleProof(leaf: string, proof: MerkleProofStep[], expectedRoot: string): boolean {
  let current = leaf;
  for (const step of proof) {
    current = step.position === "left" ? hashPair(step.hash, current) : hashPair(current, step.hash);
  }
  return current === expectedRoot;
}
