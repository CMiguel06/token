import { isNegated, literalAtom, negate } from "./predicates.js";

export type Literal = string;
export type Clause = Literal[];
export type CnfFormula = Clause[];

export function implicationToClause(antecedents: Literal[], consequent: Literal): Clause {
  return [...antecedents.map(negate), consequent];
}

export function exactlyOne(literals: Literal[]): CnfFormula {
  if (literals.length === 0) throw new Error("exactlyOne exige pelo menos um literal.");
  const cnf: CnfFormula = [literals.slice()];
  for (let i = 0; i < literals.length; i++) {
    for (let j = i + 1; j < literals.length; j++) cnf.push([negate(literals[i]), negate(literals[j])]);
  }
  return cnf;
}

export function variablesOf(formula: CnfFormula): string[] {
  const vars = new Set<string>();
  for (const clause of formula) for (const literal of clause) vars.add(literalAtom(literal));
  return [...vars].sort();
}

export function evaluateLiteral(literal: Literal, assignment: Record<string, boolean>): boolean | undefined {
  const variable = literalAtom(literal);
  const value = assignment[variable];
  if (value === undefined) return undefined;
  return isNegated(literal) ? !value : value;
}
