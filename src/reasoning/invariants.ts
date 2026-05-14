import { atom } from "./predicates.js";
import { implicationToClause, type CnfFormula } from "./cnf.js";

export interface ReasoningSampleState {
  electionId: string;
  ballotId: string;
  tokenId: string;
}

export function buildCoreInvariants(state: ReasoningSampleState): CnfFormula {
  const b = state.ballotId;
  const t = state.tokenId;
  const e = state.electionId;

  const cast = atom({ name: "Cast", args: [b, t, e] });
  const validToken = atom({ name: "ValidToken", args: [t, e] });
  const counted = atom({ name: "Counted", args: [b, e] });
  const encrypted = atom({ name: "Encrypted", args: [b] });
  const spent = atom({ name: "Spent", args: [t, e] });
  const reusable = atom({ name: "CanBeSpentAgain", args: [t, e] });

  return [
    implicationToClause([cast], validToken),
    implicationToClause([counted], cast),
    implicationToClause([cast], encrypted),
    implicationToClause([spent], `¬${reusable}`),
  ];
}

export function buildContradictoryDoubleSpendFormula(state: ReasoningSampleState): CnfFormula {
  const t = state.tokenId;
  const e = state.electionId;
  const spent = atom({ name: "Spent", args: [t, e] });
  const reusable = atom({ name: "CanBeSpentAgain", args: [t, e] });
  return [...buildCoreInvariants(state), [spent], [reusable]];
}
