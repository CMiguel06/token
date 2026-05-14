import { buildMerkleTree, createMerkleProof, verifyMerkleProof, type MerkleProofStep } from "../crypto-edu/merkle-tree.js";
import { sha256Hex } from "../shared/crypto.js";
import { canonicalJson } from "../shared/canonical.js";
import type { BulletinBoardEntry } from "../shared/domain.js";

export interface BulletinBoardSnapshot {
  entries: BulletinBoardEntry[];
  merkleRoot: string;
}

export class BulletinBoard {
  private readonly entries: BulletinBoardEntry[] = [];

  append(entry: Omit<BulletinBoardEntry, "sequence">): BulletinBoardEntry {
    const withSequence: BulletinBoardEntry = { ...entry, sequence: this.entries.length + 1 };
    this.entries.push(withSequence);
    return withSequence;
  }

  list(): BulletinBoardEntry[] {
    return this.entries.slice();
  }

  leafHashes(): string[] {
    return this.entries.map((entry) => sha256Hex(canonicalJson(entry)));
  }

  merkleRoot(): string {
    return buildMerkleTree(this.leafHashes()).root;
  }

  snapshot(): BulletinBoardSnapshot {
    return { entries: this.list(), merkleRoot: this.merkleRoot() };
  }

  proofForSequence(sequence: number): { leaf: string; proof: MerkleProofStep[]; root: string } {
    const index = sequence - 1;
    const tree = buildMerkleTree(this.leafHashes());
    return { leaf: tree.leaves[index], proof: createMerkleProof(tree, index), root: tree.root };
  }

  verifyInclusion(sequence: number): boolean {
    const { leaf, proof, root } = this.proofForSequence(sequence);
    return verifyMerkleProof(leaf, proof, root);
  }
}
