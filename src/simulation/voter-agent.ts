export interface VoterAgent {
  id: string;
  selectedOption: string;
  behaviour: "honest" | "duplicate_attempt" | "malformed_ballot";
}

export function createVoters(count: number, options: string[]): VoterAgent[] {
  return Array.from({ length: count }, (_, index) => {
    const selectedOption = options[index % options.length];
    let behaviour: VoterAgent["behaviour"] = "honest";
    if (index % 97 === 0) behaviour = "duplicate_attempt";
    if (index % 131 === 0) behaviour = "malformed_ballot";
    return { id: `voter-${index + 1}`, selectedOption, behaviour };
  });
}
