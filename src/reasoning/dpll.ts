import { evaluateLiteral, type CnfFormula, type Clause } from "./cnf.js";
import { isNegated, literalAtom, negate } from "./predicates.js";

export interface DpllResult {
  satisfiable: boolean;
  assignment: Record<string, boolean>;
  trace: string[];
}

function simplify(formula: CnfFormula, literal: string): CnfFormula {
  const neg = negate(literal);
  return formula
    .filter((clause) => !clause.includes(literal))
    .map((clause) => clause.filter((item) => item !== neg));
}

function findUnitClause(formula: CnfFormula): string | undefined {
  return formula.find((clause) => clause.length === 1)?.[0];
}

function findPureLiteral(formula: CnfFormula): string | undefined {
  const polarity = new Map<string, Set<boolean>>();
  for (const clause of formula) {
    for (const literal of clause) {
      const variable = literalAtom(literal);
      const positive = !isNegated(literal);
      const set = polarity.get(variable) ?? new Set<boolean>();
      set.add(positive);
      polarity.set(variable, set);
    }
  }
  for (const [variable, values] of polarity) {
    if (values.size === 1) return values.has(true) ? variable : `¬${variable}`;
  }
  return undefined;
}

function chooseLiteral(formula: CnfFormula): string {
  return formula[0][0];
}

function setLiteral(assignment: Record<string, boolean>, literal: string): Record<string, boolean> {
  return { ...assignment, [literalAtom(literal)]: !isNegated(literal) };
}

function dpllInternal(formula: CnfFormula, assignment: Record<string, boolean>, trace: string[]): DpllResult {
  if (formula.length === 0) return { satisfiable: true, assignment, trace: [...trace, "SAT: todas as cláusulas foram satisfeitas."] };
  if (formula.some((clause) => clause.length === 0)) return { satisfiable: false, assignment, trace: [...trace, "UNSAT: cláusula vazia encontrada."] };

  const unit = findUnitClause(formula);
  if (unit) {
    return dpllInternal(simplify(formula, unit), setLiteral(assignment, unit), [...trace, `Unit propagation: ${unit}`]);
  }

  const pure = findPureLiteral(formula);
  if (pure) {
    return dpllInternal(simplify(formula, pure), setLiteral(assignment, pure), [...trace, `Pure literal: ${pure}`]);
  }

  const literal = chooseLiteral(formula);
  const positive = dpllInternal(simplify(formula, literal), setLiteral(assignment, literal), [...trace, `Branch: ${literal}=true`]);
  if (positive.satisfiable) return positive;

  const negative = negate(literal);
  return dpllInternal(simplify(formula, negative), setLiteral(assignment, negative), [...trace, `Branch: ${literal}=false`]);
}

export function dpll(formula: CnfFormula): DpllResult {
  return dpllInternal(formula.map((clause) => clause.slice()), {}, []);
}

export function isFormulaSatisfied(formula: CnfFormula, assignment: Record<string, boolean>): boolean {
  return formula.every((clause: Clause) => clause.some((literal) => evaluateLiteral(literal, assignment) === true));
}
