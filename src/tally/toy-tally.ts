export interface TallyResult {
  option: string;
  votes: number;
}

export function tallyPlaintextDemo(options: string[], selections: string[]): TallyResult[] {
  const counts = new Map(options.map((option) => [option, 0]));
  for (const selection of selections) {
    if (!counts.has(selection)) throw new Error(`Opção inválida: ${selection}`);
    counts.set(selection, (counts.get(selection) ?? 0) + 1);
  }
  return options.map((option) => ({ option, votes: counts.get(option) ?? 0 }));
}
