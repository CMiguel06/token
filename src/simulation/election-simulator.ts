import { bestFirstAuditPlan } from "../audit/heuristic-engine.js";
import { BulletinBoard } from "../bulletin-board/bulletin-board.js";
import { createVoters } from "./voter-agent.js";
import { injectMissingProof, injectSequenceGap } from "./attack-agent.js";
import { randomTokenId, sha256Hex } from "../shared/crypto.js";
import { canonicalJson } from "../shared/canonical.js";
import type { AuditTarget } from "../audit/heuristic-engine.js";
import type { EncryptedBallot } from "../shared/domain.js";

function encryptedBallot(electionId: string, selectedOption: string): EncryptedBallot {
  return {
    electionId,
    ciphertextBase64: Buffer.from(canonicalJson({ selectedOption, nonce: randomTokenId() })).toString("base64"),
    algorithm: "SIMULATED-CIPHERTEXT",
  };
}

export function runElectionSimulation(voterCount = 250) {
  const electionId = "simulation-2026";
  const options = ["A", "B", "C"];
  const voters = createVoters(voterCount, options);
  const board = new BulletinBoard();
  const spent = new Set<string>();
  let rejected = 0;

  const auditTargets: AuditTarget[] = [];

  for (const voter of voters) {
    const tokenCommitment = sha256Hex(`token:${voter.id}`);
    const duplicate = voter.behaviour === "duplicate_attempt" && spent.has(tokenCommitment);
    const malformed = voter.behaviour === "malformed_ballot";

    if (spent.has(tokenCommitment) || malformed) {
      rejected++;
      auditTargets.push({
        id: `rejected-${voter.id}`,
        sequence: auditTargets.length + 1,
        hasDuplicateTokenSignal: duplicate,
        hasMalformedBallot: malformed,
        baseCost: 1,
      });
      continue;
    }

    spent.add(tokenCommitment);
    const ballot = encryptedBallot(electionId, voter.selectedOption);
    const entry = board.append({
      electionId,
      ballotHash: sha256Hex(canonicalJson(ballot)),
      tokenCommitment,
      encryptedBallot: ballot,
      acceptedAt: new Date().toISOString(),
    });

    auditTargets.push({ id: `entry-${entry.sequence}`, sequence: entry.sequence, baseCost: 1 });

    if (voter.behaviour === "duplicate_attempt") {
      rejected++;
      auditTargets.push({
        id: `duplicate-${voter.id}`,
        sequence: auditTargets.length + 1,
        hasDuplicateTokenSignal: true,
        baseCost: 1,
      });
    }
  }

  const injected = injectSequenceGap(injectMissingProof(auditTargets, 53), 77);
  const auditPlan = bestFirstAuditPlan(injected).slice(0, 10);

  return {
    voterCount,
    accepted: board.list().length,
    rejected,
    merkleRoot: board.merkleRoot(),
    topAuditItems: auditPlan,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log("\n=== Civitas Vote Token — election simulator ===\n");
  console.log(JSON.stringify(runElectionSimulation(), null, 2));
}
