export type PredicateName =
  | "Eligible"
  | "Issued"
  | "ValidToken"
  | "Spent"
  | "CanBeSpentAgain"
  | "Cast"
  | "Counted"
  | "Encrypted"
  | "ProofValid"
  | "InvalidState";

export interface Predicate {
  name: PredicateName;
  args: string[];
}

export function atom(predicate: Predicate): string {
  return `${predicate.name}(${predicate.args.join(",")})`;
}

export function negate(literal: string): string {
  return literal.startsWith("¬") ? literal.slice(1) : `¬${literal}`;
}

export function isNegated(literal: string): boolean {
  return literal.startsWith("¬");
}

export function literalAtom(literal: string): string {
  return isNegated(literal) ? literal.slice(1) : literal;
}
