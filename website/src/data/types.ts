export interface BiddingEntry {
  bid: string;
  hcp: string;
  description: string;
}

export interface BiddingSection {
  title: string;
  page?: string;
  entries: BiddingEntry[];
}

export interface ComparisonEntry {
  bid: string;
  ourHcp: string;
  ourDescription: string;
  saycHcp: string;
  saycDescription: string;
  diffType: 'HCP' | 'DESC' | 'BOTH' | 'SAME' | 'NEW' | '';
}

export interface ComparisonSection {
  title: string;
  entries: ComparisonEntry[];
}

export interface KeyDifference {
  number: number;
  title: string;
  ourValue: string;
  saycValue: string;
  explanation: string;
}
