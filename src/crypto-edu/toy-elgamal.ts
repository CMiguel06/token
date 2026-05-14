import { randomInt } from "node:crypto";
import { mod, modInverse, modPow } from "./modular-arithmetic.js";

export interface ToyElGamalPublicKey {
  p: bigint;
  g: bigint;
  y: bigint;
}

export interface ToyElGamalPrivateKey {
  x: bigint;
}

export interface ToyElGamalCiphertext {
  c1: bigint;
  c2: bigint;
}

export function generateToyElGamalKeyPair(p = 467n, g = 2n): { publicKey: ToyElGamalPublicKey; privateKey: ToyElGamalPrivateKey } {
  const x = BigInt(randomInt(2, Number(p - 2n)));
  const y = modPow(g, x, p);
  return { publicKey: { p, g, y }, privateKey: { x } };
}

export function encryptToy(message: bigint, publicKey: ToyElGamalPublicKey, nonce?: bigint): ToyElGamalCiphertext {
  const { p, g, y } = publicKey;
  if (message <= 0n || message >= p) throw new Error("Mensagem fora do grupo multiplicativo.");
  const k = nonce ?? BigInt(randomInt(2, Number(p - 2n)));
  const c1 = modPow(g, k, p);
  const c2 = mod(message * modPow(y, k, p), p);
  return { c1, c2 };
}

export function decryptToy(ciphertext: ToyElGamalCiphertext, publicKey: ToyElGamalPublicKey, privateKey: ToyElGamalPrivateKey): bigint {
  const shared = modPow(ciphertext.c1, privateKey.x, publicKey.p);
  return mod(ciphertext.c2 * modInverse(shared, publicKey.p), publicKey.p);
}

export function multiplyCiphertexts(a: ToyElGamalCiphertext, b: ToyElGamalCiphertext, p: bigint): ToyElGamalCiphertext {
  return {
    c1: mod(a.c1 * b.c1, p),
    c2: mod(a.c2 * b.c2, p),
  };
}
