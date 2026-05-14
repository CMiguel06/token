import { bestFirstAuditPlan } from "../audit/heuristic-engine.js";
import { BulletinBoard } from "../bulletin-board/bulletin-board.js";
import { createDevIssuerKeyPair, randomTokenId, sha256Hex, signCanonical, verifyCanonical } from "../shared/crypto.js";
import type { CastBallotRequest, DevVoteToken, ElectionPublicParameters, EncryptedBallot } from "../shared/domain.js";
import { canonicalJson } from "../shared/canonical.js";

/**
 * Demonstração local do ciclo Vote Token.
 *
 * Importante:
 * Este ficheiro prova integridade, assinatura, uso único, publicação append-only
 * e Merkle root em ambiente local. Não prova unlinkability real.
 * Em produção, substituir por Privacy Pass, blind signatures ou anonymous credentials auditadas.
 */

const election: ElectionPublicParameters = {
  electionId: "demo-madeira-2026",
  title: "Consulta Digital Experimental — Madeira 2026",
  startsAt: new Date(Date.now() - 60_000).toISOString(),
  endsAt: new Date(Date.now() + 3_600_000).toISOString(),
  status: "open",
  options: ["Sim", "Não", "Abstenção"],
  encryptionPublicKey: "demo-only-not-a-real-election-public-key",
};

const issuerKeys = createDevIssuerKeyPair();
const spentTokenCommitments = new Set<string>();
const bulletinBoard = new BulletinBoard();

function issueDevVoteToken(electionId: string): DevVoteToken {
  const tokenId = randomTokenId();
  const payload = { electionId, tokenId };
  const issuerSignatureBase64 = signCanonical(issuerKeys.privateKey, payload);
  return { electionId, tokenId, issuerSignatureBase64 };
}

function encryptBallotDemo(electionId: string, selectedOption: string): EncryptedBallot {
  if (!election.options.includes(selectedOption)) throw new Error("Opção inválida para esta eleição.");

  const plaintext = canonicalJson({ electionId, selectedOption, nonce: randomTokenId() });
  return {
    electionId,
    ciphertextBase64: Buffer.from(`ciphertext-demo:${plaintext}`).toString("base64"),
    algorithm: "DEMO-ONLY",
  };
}

function castBallot(request: CastBallotRequest) {
  if (election.status !== "open") throw new Error("A eleição não está aberta.");
  if (request.electionId !== election.electionId) throw new Error("Eleição inválida.");

  const tokenPayload = { electionId: request.token.electionId, tokenId: request.token.tokenId };
  const tokenIsValid = verifyCanonical(issuerKeys.publicKey, tokenPayload, request.token.issuerSignatureBase64);
  if (!tokenIsValid) throw new Error("Token inválido.");

  const tokenCommitment = sha256Hex(canonicalJson(tokenPayload));
  if (spentTokenCommitments.has(tokenCommitment)) throw new Error("TOKEN_INVALID_OR_ALREADY_USED");

  spentTokenCommitments.add(tokenCommitment);

  return bulletinBoard.append({
    electionId: request.electionId,
    ballotHash: sha256Hex(canonicalJson(request.encryptedBallot)),
    tokenCommitment,
    encryptedBallot: request.encryptedBallot,
    acceptedAt: new Date().toISOString(),
  });
}

function runDemo() {
  console.log("\n=== Civitas Vote Token — Formal & Heuristic Edition ===\n");
  console.log("Eleição:", election.title);

  const token = issueDevVoteToken(election.electionId);
  console.log("\nToken emitido:", { electionId: token.electionId, tokenIdPreview: `${token.tokenId.slice(0, 8)}...` });

  const encryptedBallot = encryptBallotDemo(election.electionId, "Sim");
  const accepted = castBallot({ electionId: election.electionId, token, encryptedBallot });

  console.log("\nBoletim aceite no bulletin board:");
  console.log(JSON.stringify(accepted, null, 2));

  console.log("\nMerkle root:", bulletinBoard.merkleRoot());
  console.log("Inclusão verificável:", bulletinBoard.verifyInclusion(accepted.sequence));

  console.log("\nTentativa de reutilizar o mesmo token:");
  try {
    castBallot({ electionId: election.electionId, token, encryptedBallot });
  } catch (error) {
    console.log("Rejeitado correctamente:", (error as Error).message);
  }

  const auditPlan = bestFirstAuditPlan([
    { id: "entry-1", sequence: 1, baseCost: 1 },
    { id: "duplicate-attempt-1", sequence: 2, hasDuplicateTokenSignal: true, baseCost: 1 },
    { id: "missing-proof-demo", sequence: 3, isMissingProof: true, baseCost: 1 },
  ]);

  console.log("\nTop auditoria heurística:");
  console.log(JSON.stringify(auditPlan, null, 2));
}

runDemo();
