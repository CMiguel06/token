export type CivitasEventType =
  | "ElectionCreated"
  | "TokenIssued"
  | "TokenRedeemed"
  | "BallotSubmitted"
  | "BallotRejected"
  | "BallotPublished"
  | "MerkleRootUpdated"
  | "TallyStarted"
  | "TallyCompleted"
  | "AuditFindingCreated";

export interface CivitasEvent<TPayload = Record<string, unknown>> {
  id: string;
  type: CivitasEventType;
  electionId: string;
  sequence: number;
  occurredAt: string;
  payload: TPayload;
  previousHash: string;
  eventHash: string;
}
