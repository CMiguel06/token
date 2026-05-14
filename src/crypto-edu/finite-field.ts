import { mod, modInverse, modPow } from "./modular-arithmetic.js";

export class FiniteField {
  readonly p: bigint;

  constructor(primeModulus: bigint) {
    if (primeModulus <= 2n) throw new Error("O módulo primo deve ser superior a 2.");
    this.p = primeModulus;
  }

  element(value: bigint): bigint {
    return mod(value, this.p);
  }

  add(a: bigint, b: bigint): bigint {
    return mod(a + b, this.p);
  }

  sub(a: bigint, b: bigint): bigint {
    return mod(a - b, this.p);
  }

  mul(a: bigint, b: bigint): bigint {
    return mod(a * b, this.p);
  }

  div(a: bigint, b: bigint): bigint {
    return this.mul(a, modInverse(b, this.p));
  }

  pow(a: bigint, e: bigint): bigint {
    return modPow(a, e, this.p);
  }

  inv(a: bigint): bigint {
    return modInverse(a, this.p);
  }
}
