import systemMd from '../../../SYSTEM.md?raw';
import saycSystemMd from '../../../SAYC-SYSTEM.md?raw';
import comparisonMd from '../../../SYSTEM-COMPARISON.md?raw';
import differencesMd from '../../../SAYC-DIFFERENCES.md?raw';
import {
  parseSystemMarkdown,
  parseComparisonMarkdown,
  parseDifferencesMarkdown,
} from '../lib/markdown-parser';

export type { BiddingEntry, BiddingSection, ComparisonEntry, ComparisonSection, KeyDifference } from './types';

export const ourSystemSections = parseSystemMarkdown(systemMd);
export const saycSystemSections = parseSystemMarkdown(saycSystemMd);
export const comparisonSections = parseComparisonMarkdown(comparisonMd);
export const keyDifferences = parseDifferencesMarkdown(differencesMd);
