export function mod(value: bigint, modulus: bigint): bigint {
  if (modulus <= 0n) throw new Error("O módulo deve ser positivo.");
  const result = value % modulus;
  return result >= 0n ? result : result + modulus;
}

export function gcd(a: bigint, b: bigint): bigint {
  let x = a < 0n ? -a : a;
  let y = b < 0n ? -b : b;
  while (y !== 0n) {
    const r = x % y;
    x = y;
    y = r;
  }
  return x;
}

export function extendedGcd(a: bigint, b: bigint): { gcd: bigint; x: bigint; y: bigint } {
  let oldR = a;
  let r = b;
  let oldS = 1n;
  let s = 0n;
  let oldT = 0n;
  let t = 1n;

  while (r !== 0n) {
    const q = oldR / r;
    [oldR, r] = [r, oldR - q * r];
    [oldS, s] = [s, oldS - q * s];
    [oldT, t] = [t, oldT - q * t];
  }

  return { gcd: oldR, x: oldS, y: oldT };
}

export function modInverse(value: bigint, modulus: bigint): bigint {
  const { gcd: d, x } = extendedGcd(mod(value, modulus), modulus);
  if (d !== 1n) throw new Error(`Não existe inverso modular para ${value} mod ${modulus}.`);
  return mod(x, modulus);
}

export function modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
  if (exponent < 0n) throw new Error("Expoente negativo não suportado em modPow.");
  let result = 1n;
  let b = mod(base, modulus);
  let e = exponent;
  while (e > 0n) {
    if (e & 1n) result = mod(result * b, modulus);
    b = mod(b * b, modulus);
    e >>= 1n;
  }
  return result;
}
