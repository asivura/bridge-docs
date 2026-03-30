export interface Revision {
  date: string;
  version: string;
  changes: string;
}

export const ourSystemRevisions: Revision[] = [
  { date: "2026-03-29", version: "1.0", changes: "Initial transcription from scanned convention cards" },
  { date: "2026-03-29", version: "1.1", changes: "Applied 20 transcription error corrections" },
  { date: "2026-03-29", version: "1.2", changes: "Completed scoring reference, added sequence prefixes" },
  { date: "2026-03-30", version: "1.3", changes: "Added 1NT interference section" },
];

export const saycRevisions: Revision[] = [
  { date: "2026-03-29", version: "1.0", changes: "Initial SAYC convention card" },
  { date: "2026-03-29", version: "1.1", changes: "Scoring reference, sequence prefixes" },
  { date: "2026-03-30", version: "1.2", changes: "Added 1NT interference section" },
];

export const transitionGuideRevisions: Revision[] = [
  { date: "2026-03-29", version: "1.0", changes: "Initial transition guide with 48 annotated differences" },
  { date: "2026-03-29", version: "1.1", changes: "Separated from SAYC convention card" },
];
