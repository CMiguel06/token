import { createHash, generateKeyPairSync, randomBytes, sign, verify, type KeyObject } from "node:crypto";
import { canonicalJson } from "./canonical.js";

export function sha256Hex(input: string | Buffer): string {
  return createHash("sha256").update(input).digest("hex");
}

export function randomTokenId(): string {
  return randomBytes(32).toString("base64url");
}

export function createDevIssuerKeyPair() {
  return generateKeyPairSync("ed25519");
}

export function signCanonical(privateKey: KeyObject, payload: unknown): string {
  const message = Buffer.from(canonicalJson(payload), "utf8");
  return sign(null, message, privateKey).toString("base64");
}

export function verifyCanonical(
  publicKey: KeyObject,
  payload: unknown,
  signatureBase64: string,
): boolean {
  const message = Buffer.from(canonicalJson(payload), "utf8");
  return verify(null, message, publicKey, Buffer.from(signatureBase64, "base64"));
}
