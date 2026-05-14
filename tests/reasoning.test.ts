import test from "node:test";
import assert from "node:assert/strict";
import { dpll } from "../src/reasoning/dpll.js";
import { buildContradictoryDoubleSpendFormula, buildCoreInvariants } from "../src/reasoning/invariants.js";
import { atom } from "../src/reasoning/predicates.js";

test("DPLL detecta contradição de token gasto e reutilizável", () => {
  const formula = buildContradictoryDoubleSpendFormula({ electionId: "E1", tokenId: "T1", ballotId: "B1" });
  const result = dpll(formula);
  assert.equal(result.satisfiable, false);
});

test("Invariantes básicos são satisfazíveis para estado coerente", () => {
  const state = { electionId: "E1", tokenId: "T1", ballotId: "B1" };
  const formula = [
    ...buildCoreInvariants(state),
    [atom({ name: "Cast", args: ["B1", "T1", "E1"] })],
    [atom({ name: "ValidToken", args: ["T1", "E1"] })],
    [atom({ name: "Encrypted", args: ["B1"] })],
  ];
  const result = dpll(formula);
  assert.equal(result.satisfiable, true);
});
