import test from "node:test";
import assert from "node:assert/strict";
import { bestFirstAuditPlan, scoreRisk, weightedAStarAuditPlan } from "../src/audit/heuristic-engine.js";

test("scoring de risco identifica razões", () => {
  const scored = scoreRisk({ id: "x", sequence: 1, hasDuplicateTokenSignal: true, isMissingProof: true });
  assert.ok(scored.score > 0.5);
  assert.deepEqual(scored.reasons, ["duplicate_token_signal", "missing_proof"]);
});

test("best-first prioriza maior risco", () => {
  const plan = bestFirstAuditPlan([
    { id: "low", sequence: 1 },
    { id: "high", sequence: 2, hasDuplicateTokenSignal: true, isMissingProof: true },
  ]);
  assert.equal(plan[0].target.id, "high");
});

test("weighted A* preserva prioridade de risco alto", () => {
  const plan = weightedAStarAuditPlan([
    { id: "low", sequence: 1, baseCost: 1 },
    { id: "high", sequence: 2, hasMalformedBallot: true, isMissingProof: true, baseCost: 1 },
  ]);
  assert.equal(plan[0].target.id, "high");
});
