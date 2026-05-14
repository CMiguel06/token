import type { CivitasEvent } from "./events.js";

export interface ElectionProjection {
  electionId: string;
  tokensIssued: number;
  tokensRedeemed: number;
  ballotsSubmitted: number;
  ballotsRejected: number;
  ballotsPublished: number;
  auditFindings: number;
}

export function projectElection(events: CivitasEvent[], electionId: string): ElectionProjection {
  const projection: ElectionProjection = {
    electionId,
    tokensIssued: 0,
    tokensRedeemed: 0,
    ballotsSubmitted: 0,
    ballotsRejected: 0,
    ballotsPublished: 0,
    auditFindings: 0,
  };

  for (const event of events.filter((item) => item.electionId === electionId)) {
    if (event.type === "TokenIssued") projection.tokensIssued++;
    if (event.type === "TokenRedeemed") projection.tokensRedeemed++;
    if (event.type === "BallotSubmitted") projection.ballotsSubmitted++;
    if (event.type === "BallotRejected") projection.ballotsRejected++;
    if (event.type === "BallotPublished") projection.ballotsPublished++;
    if (event.type === "AuditFindingCreated") projection.auditFindings++;
  }

  return projection;
}
