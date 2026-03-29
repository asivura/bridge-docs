export interface BiddingEntry {
  bid: string;
  hcp: string;
  description: string;
}

export interface BiddingSection {
  title: string;
  page?: string;
  prefix?: string;
  entries: BiddingEntry[];
}

export interface GenericTableEntry {
  cells: string[];
}

export interface GenericTable {
  title: string;
  page?: string;
  headers: string[];
  rows: GenericTableEntry[];
}

export type SystemSection = BiddingSection | GenericTable;

export function isBiddingSection(s: SystemSection): s is BiddingSection {
  return 'entries' in s;
}

export function isGenericTable(s: SystemSection): s is GenericTable {
  return 'headers' in s && 'rows' in s;
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
