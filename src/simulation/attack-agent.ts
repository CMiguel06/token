import type { AuditTarget } from "../audit/heuristic-engine.js";

export function injectSequenceGap(targets: AuditTarget[], sequence: number): AuditTarget[] {
  return targets.map((target) => target.sequence === sequence ? { ...target, hasSequenceGap: true } : target);
}

export function injectMissingProof(targets: AuditTarget[], every: number): AuditTarget[] {
  return targets.map((target) => target.sequence % every === 0 ? { ...target, isMissingProof: true } : target);
}
