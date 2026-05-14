import { randomInt } from "node:crypto";
import { mod, modInverse } from "./modular-arithmetic.js";

export interface ShamirShare {
  x: bigint;
  y: bigint;
}

function randomBigIntBelow(modulus: bigint): bigint {
  if (modulus <= 2n) throw new Error("Módulo inválido.");
  // Implementação simples para demonstração. Para produção, usar amostragem robusta e biblioteca auditada.
  const max = Number(modulus - 1n);
  if (!Number.isSafeInteger(max)) throw new Error("Demo suporta apenas módulos compatíveis com Number seguro.");
  return BigInt(randomInt(1, max));
}

function evaluatePolynomial(coefficients: bigint[], x: bigint, prime: bigint): bigint {
  return coefficients.reduceRight((acc, coeff) => mod(acc * x + coeff, prime), 0n);
}

export function splitSecret(secret: bigint, threshold: number, shareCount: number, prime: bigint): ShamirShare[] {
  if (threshold < 2) throw new Error("O limiar deve ser pelo menos 2.");
  if (shareCount < threshold) throw new Error("shareCount deve ser >= threshold.");
  if (secret < 0n || secret >= prime) throw new Error("O segredo deve pertencer ao corpo finito.");

  const coefficients = [secret];
  for (let i = 1; i < threshold; i++) coefficients.push(randomBigIntBelow(prime));

  const shares: ShamirShare[] = [];
  for (let i = 1; i <= shareCount; i++) {
    const x = BigInt(i);
    shares.push({ x, y: evaluatePolynomial(coefficients, x, prime) });
  }
  return shares;
}

export function reconstructSecret(shares: ShamirShare[], prime: bigint): bigint {
  if (shares.length === 0) throw new Error("São necessárias partilhas.");

  let secret = 0n;
  for (let i = 0; i < shares.length; i++) {
    const xi = shares[i].x;
    const yi = shares[i].y;
    let numerator = 1n;
    let denominator = 1n;

    for (let j = 0; j < shares.length; j++) {
      if (i === j) continue;
      const xj = shares[j].x;
      numerator = mod(numerator * -xj, prime);
      denominator = mod(denominator * (xi - xj), prime);
    }

    const lagrange = mod(numerator * modInverse(denominator, prime), prime);
    secret = mod(secret + yi * lagrange, prime);
  }

  return secret;
}
