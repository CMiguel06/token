import type { CivitasEvent } from "./events.js";
import { projectElection } from "./projections.js";

export function replayElection(events: CivitasEvent[], electionId: string) {
  return projectElection(events, electionId);
}
