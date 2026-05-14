export type ProofStatus = "OK" | "FAIL" | "WARN";

export interface ProofLogEntry {
  status: ProofStatus;
  rule: string;
  evidence: string;
  timestamp: string;
}

export class ProofLog {
  private readonly entries: ProofLogEntry[] = [];

  add(status: ProofStatus, rule: string, evidence: string): void {
    this.entries.push({ status, rule, evidence, timestamp: new Date().toISOString() });
  }

  ok(rule: string, evidence: string): void {
    this.add("OK", rule, evidence);
  }

  fail(rule: string, evidence: string): void {
    this.add("FAIL", rule, evidence);
  }

  warn(rule: string, evidence: string): void {
    this.add("WARN", rule, evidence);
  }

  all(): ProofLogEntry[] {
    return this.entries.slice();
  }

  hasFailures(): boolean {
    return this.entries.some((entry) => entry.status === "FAIL");
  }
}
