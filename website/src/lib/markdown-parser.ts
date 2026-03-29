import type {
  BiddingEntry,
  BiddingSection,
  ComparisonEntry,
  ComparisonSection,
  GenericTable,
  KeyDifference,
  SystemSection,
} from '../data/types';

// ============ Generic table parsing ============

interface ParsedTable {
  headers: string[];
  rows: string[][];
}

function parseTableRow(line: string): string[] {
  return line
    .split('|')
    .slice(1, -1)
    .map((cell) => cell.trim());
}

function isSeparator(line: string): boolean {
  return /^\|[\s\-:|]+\|$/.test(line.trim());
}

function cleanBold(s: string): string {
  return s.replace(/\*\*/g, '').trim();
}

function extractTables(content: string): ParsedTable[] {
  const lines = content.split('\n');
  const tables: ParsedTable[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (line.startsWith('|') && line.endsWith('|')) {
      const block: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        block.push(lines[i].trim());
        i++;
      }
      if (block.length >= 3) {
        const headers = parseTableRow(block[0]);
        let dataStart = 2;
        for (let j = 1; j < block.length; j++) {
          if (isSeparator(block[j])) {
            dataStart = j + 1;
            break;
          }
        }
        tables.push({ headers, rows: block.slice(dataStart).map(parseTableRow) });
      }
    } else {
      i++;
    }
  }
  return tables;
}

// ============ Table extraction with context headers ============

interface ParsedTableWithContext {
  subTitle?: string;
  table: ParsedTable;
}

/** Extract tables along with their nearest preceding h4 or bold label. */
function extractTablesWithContext(content: string): ParsedTableWithContext[] {
  const lines = content.split('\n');
  const results: ParsedTableWithContext[] = [];
  let i = 0;
  let currentH4: string | undefined;
  let currentLabel: string | undefined;

  while (i < lines.length) {
    const line = lines[i].trim();

    const h4 = line.match(/^####\s+(.+)/);
    if (h4) {
      currentH4 = h4[1].trim();
      currentLabel = undefined;
      i++;
      continue;
    }

    const bold = line.match(/^\*\*(.+?):\*\*$/);
    if (bold) {
      currentLabel = bold[1].trim();
      i++;
      continue;
    }

    if (line.startsWith('|') && line.endsWith('|')) {
      const block: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        block.push(lines[i].trim());
        i++;
      }
      if (block.length >= 3) {
        const headers = parseTableRow(block[0]);
        let dataStart = 2;
        for (let j = 1; j < block.length; j++) {
          if (isSeparator(block[j])) {
            dataStart = j + 1;
            break;
          }
        }

        let subTitle: string | undefined;
        if (currentH4 && currentLabel) {
          subTitle = `${currentH4}: ${currentLabel}`;
        } else {
          subTitle = currentH4 || currentLabel;
        }

        results.push({
          subTitle,
          table: { headers, rows: block.slice(dataStart).map(parseTableRow) },
        });
        currentLabel = undefined;
      }
    } else {
      i++;
    }
  }
  return results;
}

// ============ Section splitting ============

interface MdSection {
  title: string;
  level: number;
  page?: string;
  content: string;
}

function splitSections(md: string): MdSection[] {
  const lines = md.split('\n');
  const sections: MdSection[] = [];
  let cur: { title: string; level: number; lines: string[] } | null = null;

  for (const line of lines) {
    const m = line.match(/^(#{2,3})\s+(.+)/);
    if (m) {
      if (cur) sections.push(buildSection(cur));
      cur = { title: m[2].trim(), level: m[1].length, lines: [] };
    } else if (cur) {
      cur.lines.push(line);
    }
  }
  if (cur) sections.push(buildSection(cur));
  return sections;
}

function buildSection(raw: { title: string; level: number; lines: string[] }): MdSection {
  const content = raw.lines.join('\n');
  const pm = content.match(/\*\((Pages?\s+\d+(?:[–-]\d+)?)/);
  return { title: raw.title, level: raw.level, page: pm?.[1], content };
}

// ============ Column helpers ============

/** Find column whose header includes one of the patterns (case-insensitive). */
function colIdx(headers: string[], ...patterns: string[]): number {
  for (const p of patterns) {
    const i = headers.findIndex((h) => h.toLowerCase().includes(p.toLowerCase()));
    if (i !== -1) return i;
  }
  return -1;
}

/** Find column whose header exactly matches one of the names (case-insensitive). */
function exactColIdx(headers: string[], ...names: string[]): number {
  for (const n of names) {
    const i = headers.findIndex((h) => h.trim().toLowerCase() === n.toLowerCase());
    if (i !== -1) return i;
  }
  return -1;
}

// ============ System markdown parser ============

const SKIP_SYSTEM = new Set([
  'Table of Contents',
  'About This System',
]);

/** Extract auction prefix from section title for display context. */
function extractPrefix(title: string): string | undefined {
  // Blackwood responses — 4NT is already the bid context
  if (/Responses to 4NT/.test(title)) return undefined;

  // "Responses to 1♣", "Responses to 2♣(!)", "Responses to Weak 2♦/2♥/2♠"
  let m = title.match(/Responses to (?:Weak\s+)?(\d[^\s:]+)/);
  if (m) return m[1];

  // "After Stayman: 1NT - 2♣(!)", "After 1♣ - 1♦",
  // "Opener's Rebids After 2♣ - 2♦(!)", "Continuations After ...",
  // "Example: After 1♥ - 2NT(!)"
  // Requires bid sequence to start with a digit (excludes "After Opponent...")
  m = title.match(/After\s+(?:[^:]+:\s*)?(\d[^\s:]+(?:\s*-\s*[^\s:]+)*)/);
  if (m) return m[1].replace(/\s*-\s*/g, ' → ');

  return undefined;
}

function parseSystemTable(table: ParsedTable): BiddingEntry[] {
  const { headers, rows } = table;
  const hcpI = colIdx(headers, 'HCP');

  if (hcpI !== -1) {
    // Find where bid columns end — stop at descriptive columns before HCP
    let bidEnd = hcpI;
    for (let i = 0; i < hcpI; i++) {
      const h = headers[i].toLowerCase();
      if (h.includes('show') || h.includes('meaning') || h.includes('description')) {
        bidEnd = i;
        break;
      }
    }

    return rows.map((row) => {
      const bidParts = row.slice(0, bidEnd).filter(Boolean);
      const priorDesc = row.slice(bidEnd, hcpI).filter(Boolean);
      const afterDesc = row.slice(hcpI + 1).filter(Boolean);
      return {
        bid: cleanBold(bidParts.join(' → ') || row[0] || ''),
        hcp: cleanBold(row[hcpI] || '—'),
        description: cleanBold([...priorDesc, ...afterDesc].join(', ')),
      };
    });
  }

  // 2-column tables: bid | description (e.g., Stayman rebids, Blackwood aces)
  if (headers.length === 2) {
    return rows.map((row) => ({
      bid: cleanBold(row[0] || ''),
      hcp: '—',
      description: cleanBold(row[1] || ''),
    }));
  }

  return [];
}

/** Check if a subsection title is self-descriptive (contains bid context). */
function isSelfDescriptive(title: string): boolean {
  return /[♣♦♥♠]|NT|After|\d/.test(title);
}

export function parseSystemMarkdown(md: string): SystemSection[] {
  const sections = splitSections(md);
  const result: SystemSection[] = [];
  let parentPage: string | undefined;
  let parentTitle: string | undefined;
  let skipParent = false;

  for (const sec of sections) {
    if (sec.level === 2) {
      parentPage = sec.page;
      parentTitle = sec.title;
      skipParent = SKIP_SYSTEM.has(sec.title);
    }
    if (skipParent || SKIP_SYSTEM.has(sec.title)) continue;

    const tablesWithContext = extractTablesWithContext(sec.content);
    const biddingEntries: BiddingEntry[] = [];
    const genericTables: { subTitle?: string; table: ParsedTable }[] = [];

    for (const { subTitle, table } of tablesWithContext) {
      const entries = parseSystemTable(table);
      if (entries.length > 0) {
        biddingEntries.push(...entries);
      } else if (table.headers.length >= 3) {
        genericTables.push({ subTitle, table });
      }
    }

    let title = sec.title;
    if (sec.level === 3 && parentTitle && !isSelfDescriptive(title)) {
      title = `${parentTitle}: ${title}`;
    }
    const page = sec.page || parentPage;

    if (biddingEntries.length > 0) {
      const prefix = extractPrefix(title);
      result.push({ title, page, ...(prefix && { prefix }), entries: biddingEntries });
    }

    for (const { subTitle, table } of genericTables) {
      result.push({
        title: subTitle ? `${title}: ${subTitle}` : title,
        page,
        headers: table.headers,
        rows: table.rows.map((cells) => ({ cells })),
      } satisfies GenericTable);
    }
  }
  return result;
}

// ============ Comparison markdown parser ============

function parseComparisonTable(table: ParsedTable): ComparisonEntry[] {
  const { headers, rows } = table;

  const dtI = colIdx(headers, 'Diff Type');
  if (dtI === -1) return []; // Not a comparison table

  const ohI = colIdx(headers, 'Our HCP');
  const shI = colIdx(headers, 'SAYC HCP');
  const odI = colIdx(headers, 'Our Description', 'Our Meaning', 'Our System');
  const sdI = colIdx(headers, 'SAYC Description', 'SAYC Meaning');
  const soI = sdI === -1 ? exactColIdx(headers, 'SAYC') : -1;
  const ddI = odI === -1 && sdI === -1 && soI === -1 ? colIdx(headers, 'Description') : -1;

  const dataStart = Math.min(...[ohI, shI, odI, sdI, soI, ddI, dtI].filter((i) => i !== -1));

  return rows.map((row) => {
    const bidParts = row.slice(0, dataStart).filter(Boolean);
    const bid = cleanBold(bidParts.join(' → ') || '—');

    const ourHcp = ohI !== -1 ? cleanBold(row[ohI] || '—') : '—';
    const saycHcp = shI !== -1 ? cleanBold(row[shI] || '—') : '—';

    let ourDesc = '';
    let saycDesc = '';

    if (odI !== -1) ourDesc = cleanBold(row[odI] || '');
    if (sdI !== -1) saycDesc = cleanBold(row[sdI] || '');
    if (soI !== -1 && !saycDesc) saycDesc = cleanBold(row[soI] || '');
    if (ddI !== -1) {
      ourDesc = cleanBold(row[ddI] || '');
      saycDesc = ourDesc;
    }

    const raw = cleanBold(row[dtI] || '').toUpperCase();
    const diffType = (['HCP', 'DESC', 'BOTH', 'SAME', 'NEW'].includes(raw)
      ? raw
      : '') as ComparisonEntry['diffType'];

    return { bid, ourHcp, ourDescription: ourDesc, saycHcp, saycDescription: saycDesc, diffType };
  });
}

export function parseComparisonMarkdown(md: string): ComparisonSection[] {
  const sections = splitSections(md);
  const result: ComparisonSection[] = [];

  for (const sec of sections) {
    if (sec.title.toLowerCase().startsWith('summary')) continue;

    const tables = extractTables(sec.content);
    const entries: ComparisonEntry[] = [];
    for (const t of tables) entries.push(...parseComparisonTable(t));

    if (entries.length > 0) {
      result.push({ title: sec.title, entries });
    }
  }
  return result;
}

// ============ Differences markdown parser ============

function extractExplanation(content: string): string {
  const lines = content.split('\n');
  let capturing = false;
  const parts: string[] = [];

  for (const line of lines) {
    if (line.includes('**Explanation:**')) {
      capturing = true;
      const rest = line.replace(/.*\*\*Explanation:\*\*\s*/, '').trim();
      if (rest) parts.push(rest);
      continue;
    }
    if (!capturing) continue;
    if (line.startsWith('---') || line.startsWith('##')) break;

    const t = line.trim();
    if (!t || t.startsWith('|') || t.startsWith('**Reference:**')) continue;

    parts.push(t.replace(/^- /, '').replace(/\*\*/g, ''));
  }

  return parts
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function parseDifferencesMarkdown(md: string): KeyDifference[] {
  const allTables = extractTables(md);
  const sections = splitSections(md);

  // Find the summary table (has '#', 'Feature', 'Our System' columns)
  const summary = allTables.find(
    (t) =>
      t.headers.some((h) => h.trim() === '#') &&
      t.headers.some((h) => h.includes('Feature')) &&
      t.headers.some((h) => h.includes('Our System')),
  );
  if (!summary) return [];

  const nI = exactColIdx(summary.headers, '#');
  const fI = colIdx(summary.headers, 'Feature');
  const oI = colIdx(summary.headers, 'Our System');
  const sI = exactColIdx(summary.headers, 'SAYC');

  return summary.rows.map((row) => {
    const number = parseInt(row[nI] || '0', 10);
    const title = cleanBold(row[fI] || '');
    const ourValue = cleanBold(row[oI] || '');
    const saycValue = cleanBold(row[sI] || '');

    // Find matching detailed section for explanation text
    const detail = sections.find((s) => {
      const m = s.title.match(/^(\d+)\./);
      return m && parseInt(m[1], 10) === number;
    });

    const explanation = detail ? extractExplanation(detail.content) : '';

    return { number, title, ourValue, saycValue, explanation };
  });
}
