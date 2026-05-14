import { randomTokenId, sha256Hex } from "../shared/crypto.js";
import { canonicalJson } from "../shared/canonical.js";

export interface HashCommitment {
  commitment: string;
  nonce: string;
}

export function commit(value: unknown, nonce: string = randomTokenId()): HashCommitment {
  return {
    nonce,
    commitment: sha256Hex(canonicalJson({ value, nonce })),
  };
}

export function verifyCommitment(value: unknown, opening: HashCommitment): boolean {
  return commit(value, opening.nonce).commitment === opening.commitment;
}
