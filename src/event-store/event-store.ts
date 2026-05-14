import { randomUUID } from "node:crypto";
import { sha256Hex } from "../shared/crypto.js";
import { canonicalJson } from "../shared/canonical.js";
import type { CivitasEvent, CivitasEventType } from "./events.js";

export class EventStore {
  private readonly events: CivitasEvent[] = [];

  append<TPayload extends Record<string, unknown>>(type: CivitasEventType, electionId: string, payload: TPayload): CivitasEvent<TPayload> {
    const previousHash = this.events.at(-1)?.eventHash ?? sha256Hex("genesis");
    const sequence = this.events.length + 1;
    const base = {
      id: randomUUID(),
      type,
      electionId,
      sequence,
      occurredAt: new Date().toISOString(),
      payload,
      previousHash,
    };
    const eventHash = sha256Hex(canonicalJson(base));
    const event = { ...base, eventHash } satisfies CivitasEvent<TPayload>;
    this.events.push(event);
    return event;
  }

  all(): CivitasEvent[] {
    return this.events.slice();
  }

  verifyChain(): boolean {
    let previousHash = sha256Hex("genesis");
    for (const event of this.events) {
      if (event.previousHash !== previousHash) return false;
      const { eventHash, ...base } = event;
      if (sha256Hex(canonicalJson(base)) !== eventHash) return false;
      previousHash = event.eventHash;
    }
    return true;
  }
}
