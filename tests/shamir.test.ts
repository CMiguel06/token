import test from "node:test";
import assert from "node:assert/strict";
import { reconstructSecret, splitSecret } from "../src/crypto-edu/shamir-secret-sharing.js";

test("Shamir reconstrói segredo com limiar suficiente", () => {
  const secret = 123n;
  const prime = 2089n;
  const shares = splitSecret(secret, 3, 5, prime);
  const reconstructed = reconstructSecret([shares[0], shares[2], shares[4]], prime);
  assert.equal(reconstructed, secret);
});
