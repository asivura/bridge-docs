import type { SystemSection } from './types';

export interface TreeNode {
  title: string;
  sectionTitle?: string;
  defaultOpen: boolean;
  children?: TreeNode[];
}

/**
 * Tree definitions for collapsible auction groupings.
 * Nodes with `sectionTitle` render the matching section's table.
 * Nodes without `sectionTitle` are virtual grouping parents.
 * Nodes whose `sectionTitle` doesn't match any section are skipped.
 */
export const auctionTrees: TreeNode[] = [
  // 1NT System
  {
    title: '1NT Responses',
    sectionTitle: 'Responses to 1NT: Basic Responses',
    defaultOpen: true,
    children: [
      {
        title: 'After Stayman: 1NT - 2♣(!)',
        sectionTitle: 'After Stayman: 1NT - 2♣(!)',
        defaultOpen: false,
      },
      {
        title: 'After Heart Transfer: 1NT - 2♦(!) - 2♥',
        sectionTitle: 'After Heart Transfer: 1NT - 2♦(!) - 2♥',
        defaultOpen: false,
      },
      {
        title: 'After Spade Transfer: 1NT - 2♥(!) - 2♠',
        sectionTitle: 'After Spade Transfer: 1NT - 2♥(!) - 2♠',
        defaultOpen: false,
      },
      {
        title: 'Gerber (4♣ over 1NT/2NT)',
        sectionTitle: 'Gerber (4♣ over 1NT/2NT)',
        defaultOpen: false,
      },
      {
        title: 'Direct Minor Suit Sequences',
        sectionTitle: 'Responses to 1NT: Direct Minor Suit Sequences',
        defaultOpen: false,
      },
      {
        title: 'Slam Invitation Sequences',
        sectionTitle: 'Responses to 1NT: Slam Invitation Sequences',
        defaultOpen: false,
      },
      {
        title: 'After Interference Over 1NT',
        defaultOpen: false,
        children: [
          {
            title: 'After 1NT - Double (Penalty)',
            sectionTitle: 'After 1NT - Double (Penalty)',
            defaultOpen: true,
          },
          {
            title: 'After 1NT - 2♣/♦/♥/♠ (Overcall)',
            sectionTitle: 'After 1NT - 2♣/♦/♥/♠ (Overcall)',
            defaultOpen: true,
          },
        ],
      },
    ],
  },
  // 2♣ System
  {
    title: '2♣ Opening Responses',
    sectionTitle: 'Responses to 2♣(!)',
    defaultOpen: true,
    children: [
      {
        title: "Opener's Rebids After 2♣ - 2♦(!)",
        sectionTitle: "Opener's Rebids After 2♣ - 2♦(!)",
        defaultOpen: false,
        children: [
          {
            title: 'Continuations After 2♣ - 2♦ - 2NT',
            sectionTitle: 'Continuations After 2♣ - 2♦ - 2NT',
            defaultOpen: false,
          },
        ],
      },
      {
        title: 'Second Negative',
        sectionTitle: 'Strong 2♣ Opening: Second Negative',
        defaultOpen: false,
      },
    ],
  },
  // Opener's Rebids
  {
    title: "Opener's Rebids",
    defaultOpen: false,
    children: [
      {
        title: 'Strength Categories',
        sectionTitle: "Opener's Rebids: Strength Categories",
        defaultOpen: false,
      },
      { title: 'After 1♣ - 1♦', sectionTitle: 'After 1♣ - 1♦', defaultOpen: false },
      { title: 'After 1♣ - 1♥', sectionTitle: 'After 1♣ - 1♥', defaultOpen: false },
      { title: 'After 1♣ - 1♠', sectionTitle: 'After 1♣ - 1♠', defaultOpen: false },
      { title: 'After 1♣ - 1NT', sectionTitle: 'After 1♣ - 1NT', defaultOpen: false },
      { title: 'After 1♦ - 1♥', sectionTitle: 'After 1♦ - 1♥', defaultOpen: false },
      { title: 'After 1♦ - 1♠', sectionTitle: 'After 1♦ - 1♠', defaultOpen: false },
      { title: 'After 1♥ - 1♠', sectionTitle: 'After 1♥ - 1♠', defaultOpen: false },
      { title: 'After 1♥ - 1NT', sectionTitle: 'After 1♥ - 1NT', defaultOpen: false },
      { title: 'After 1♠ - 1NT', sectionTitle: 'After 1♠ - 1NT', defaultOpen: false },
      { title: 'After 1♦ - 2♣', sectionTitle: 'After 1♦ - 2♣', defaultOpen: false },
      { title: 'After 1♣ - 2♣', sectionTitle: 'After 1♣ - 2♣', defaultOpen: false },
      {
        title: 'Reverse Bids',
        sectionTitle: "Opener's Rebids: Reverse Bids",
        defaultOpen: false,
      },
    ],
  },
];

/** Collect all sectionTitles from a tree node recursively. */
function collectSectionTitles(node: TreeNode): string[] {
  const titles: string[] = [];
  if (node.sectionTitle) titles.push(node.sectionTitle);
  for (const child of node.children ?? []) {
    titles.push(...collectSectionTitles(child));
  }
  return titles;
}

/** Check if a tree node has any matching sections. */
export function nodeHasContent(
  node: TreeNode,
  sectionMap: Map<string, unknown>,
): boolean {
  if (node.sectionTitle && sectionMap.has(node.sectionTitle)) return true;
  return (node.children ?? []).some((child) => nodeHasContent(child, sectionMap));
}

export interface SectionInfo {
  section: SystemSection;
  tableNumber: number;
}

export type RenderItem =
  | { type: 'flat'; section: SystemSection; tableNumber: number }
  | { type: 'tree'; node: TreeNode; sectionMap: Map<string, SectionInfo> };

/**
 * Transform a flat section list into a render list with tree groupings.
 * Sections belonging to a tree are grouped under the tree's root.
 * Sections not in any tree render flat.
 */
export function buildRenderList(sections: SystemSection[]): RenderItem[] {
  const sectionByTitle = new Map<string, SectionInfo>();
  sections.forEach((s, i) => sectionByTitle.set(s.title, { section: s, tableNumber: i + 1 }));

  const consumed = new Set<string>();
  const triggerToTree = new Map<string, TreeNode>();

  for (const tree of auctionTrees) {
    const titles = collectSectionTitles(tree);
    const existingTitles = titles.filter((t) => sectionByTitle.has(t));
    if (existingTitles.length === 0) continue;

    for (const t of existingTitles) consumed.add(t);

    // Trigger on the first matching section in document order
    const firstTitle = sections.find((s) => existingTitles.includes(s.title))?.title;
    if (firstTitle) triggerToTree.set(firstTitle, tree);
  }

  const items: RenderItem[] = [];
  for (const section of sections) {
    if (triggerToTree.has(section.title)) {
      items.push({
        type: 'tree',
        node: triggerToTree.get(section.title)!,
        sectionMap: sectionByTitle,
      });
    } else if (!consumed.has(section.title)) {
      items.push({
        type: 'flat',
        section,
        tableNumber: sectionByTitle.get(section.title)!.tableNumber,
      });
    }
  }

  return items;
}
