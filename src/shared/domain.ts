export type ElectionStatus = "draft" | "open" | "closed" | "tallied";

export interface ElectionPublicParameters {
  electionId: string;
  title: string;
  startsAt: string;
  endsAt: string;
  status: ElectionStatus;
  options: string[];
  encryptionPublicKey: string;
}

export interface DevVoteToken {
  electionId: string;
  tokenId: string;
  issuerSignatureBase64: string;
}

export interface EncryptedBallot {
  electionId: string;
  ciphertextBase64: string;
  algorithm: string;
}

export interface CastBallotRequest {
  electionId: string;
  token: DevVoteToken;
  encryptedBallot: EncryptedBallot;
}

export interface BulletinBoardEntry {
  sequence: number;
  electionId: string;
  ballotHash: string;
  tokenCommitment: string;
  encryptedBallot: EncryptedBallot;
  acceptedAt: string;
}
