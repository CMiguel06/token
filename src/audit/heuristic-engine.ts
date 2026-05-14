export interface AuditTarget {
  id: string;
  sequence: number;
  hasDuplicateTokenSignal?: boolean;
  hasMalformedBallot?: boolean;
  hasTimingAnomaly?: boolean;
  isMissingProof?: boolean;
  hasSequenceGap?: boolean;
  baseCost?: number;
}

export interface RiskWeights {
  duplicateToken: number;
  malformedBallot: number;
  timingAnomaly: number;
  missingProof: number;
  sequenceGap: number;
}

export interface AuditPlanItem {
  target: AuditTarget;
  riskScore: number;
  estimatedCost: number;
  priority: number;
  reasons: string[];
}

export const defaultRiskWeights: RiskWeights = {
  duplicateToken: 0.35,
  malformedBallot: 0.2,
  timingAnomaly: 0.1,
  missingProof: 0.25,
  sequenceGap: 0.1,
};

export function scoreRisk(target: AuditTarget, weights: RiskWeights = defaultRiskWeights): { score: number; reasons: string[] } {
  const reasons: string[] = [];
  let score = 0;

  if (target.hasDuplicateTokenSignal) {
    score += weights.duplicateToken;
    reasons.push("duplicate_token_signal");
  }
  if (target.hasMalformedBallot) {
    score += weights.malformedBallot;
    reasons.push("malformed_ballot");
  }
  if (target.hasTimingAnomaly) {
    score += weights.timingAnomaly;
    reasons.push("timing_anomaly");
  }
  if (target.isMissingProof) {
    score += weights.missingProof;
    reasons.push("missing_proof");
  }
  if (target.hasSequenceGap) {
    score += weights.sequenceGap;
    reasons.push("sequence_gap");
  }

  return { score: Number(score.toFixed(4)), reasons };
}

function toPlanItem(target: AuditTarget, riskScore: number, priority: number, reasons: string[]): AuditPlanItem {
  return {
    target,
    riskScore,
    estimatedCost: target.baseCost ?? 1,
    priority: Number(priority.toFixed(4)),
    reasons,
  };
}

export function bestFirstAuditPlan(targets: AuditTarget[], weights: RiskWeights = defaultRiskWeights): AuditPlanItem[] {
  return targets
    .map((target) => {
      const { score, reasons } = scoreRisk(target, weights);
      return toPlanItem(target, score, score, reasons);
    })
    .sort((a, b) => b.priority - a.priority || a.target.sequence - b.target.sequence);
}

export function aStarAuditPlan(targets: AuditTarget[], weights: RiskWeights = defaultRiskWeights): AuditPlanItem[] {
  return targets
    .map((target) => {
      const { score, reasons } = scoreRisk(target, weights);
      const cost = target.baseCost ?? 1;
      const priority = score / cost;
      return toPlanItem(target, score, priority, reasons);
    })
    .sort((a, b) => b.priority - a.priority || b.riskScore - a.riskScore);
}

export function weightedAStarAuditPlan(targets: AuditTarget[], heuristicWeight = 1.7, weights: RiskWeights = defaultRiskWeights): AuditPlanItem[] {
  return targets
    .map((target) => {
      const { score, reasons } = scoreRisk(target, weights);
      const cost = target.baseCost ?? 1;
      const priority = (heuristicWeight * score) / cost;
      return toPlanItem(target, score, priority, reasons);
    })
    .sort((a, b) => b.priority - a.priority || b.riskScore - a.riskScore);
}
