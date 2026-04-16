import type {
  DesktopShortcut,
  DesktopWindowDefinition,
  DockItem,
  Position,
  ShortcutDocument,
  ShortcutWindowItem,
} from "./types";

export const noteItems = [
  "graduate",
  "land a job",
  "be successful",
  "travel the world",
  "make a difference(?)",
  "please draw",
] as const;

export const stickyNotePosition: Position = {
  x: 1.5,
  y: 4,
};

export const desktopShortcuts: DesktopShortcut[] = [
  {
    id: "aws-community-event",
    label: "AWS Community Event",
    kind: "folder",
    position: { x: 28, y: 16 },
  },
  {
    id: "world-of-fotum",
    label: "World of Fatum",
    kind: "folder",
    position: { x: 90, y: 11 },
  },
  {
    id: "belen",
    label: "Belen",
    kind: "folder",
    position: { x: 74, y: 31 },
  },
  {
    id: "resume",
    label: "Resume.pdf",
    kind: "file",
    position: { x: 11, y: 50 },
  },
  {
    id: "donmac",
    label: "DonMac",
    kind: "folder",
    position: { x: 21, y: 56 },
  },
  {
    id: "welllife",
    label: "WellLife",
    kind: "folder",
    position: { x: 87, y: 50 },
  },
  {
    id: "Zapac",
    label: "Zapac",
    kind: "folder",
    position: { x: 8, y: 71 },
  },
  {
    id: "gimi",
    label: "GIMI",
    kind: "folder",
    position: { x: 19, y: 80 },
  },
  {
    id: "idea",
    label: "IDE.a",
    kind: "folder",
    position: { x: 77, y: 72 },
  },
  {
    id: "dont-look",
    label: "Don't Look!",
    kind: "trash",
    position: { x: 90, y: 81 },
  },
] as const;

export const dockItems: DockItem[] = [
  { id: "about", label: "About Me", src: "/icons/about-me-icon.svg" },
  { id: "projects", label: "Projects", src: "/icons/projects-icon.svg" },
  { id: "links", label: "Links", src: "/icons/links-icon.svg" },
  { id: "contact", label: "Contact", src: "/icons/email-icon.svg" },
] as const;

export const aboutWindowDefinitions: DesktopWindowDefinition[] = [
  {
    id: "about-main",
    title: "about.me.txt",
    position: { x: 40, y: 3.5 },
    size: { width: 54, height: 42 },
    theme: "blue",
    animationDelayMs: 0,
  },
  {
    id: "about-photo",
    title: "IMGpmb.png",
    position: { x: 4, y: 15 },
    size: { width: 35, height: 60 },
    theme: "blue",
    animationDelayMs: 90,
  },
  {
    id: "about-doing",
    title: "whatimdoin'rn.txt",
    position: { x: 40, y: 56 },
    size: { width: 33, height: 30 },
    theme: "blue",
    animationDelayMs: 150,
  },
  {
    id: "about-likes",
    title: "thingsilike.txt",
    position: { x: 77, y: 56 },
    size: { width: 20, height: 31 },
    theme: "paper",
    animationDelayMs: 210,
  },
] as const;

export const projectsWindowDefinitions: DesktopWindowDefinition[] = [
  {
    id: "projects-main",
    title: "Projects",
    position: { x: 10, y: 2.5 },
    size: { width: 80, height: 80 },
    theme: "blue",
    animationDelayMs: 0,
  },
] as const;

export const linksWindowDefinitions: DesktopWindowDefinition[] = [
  {
    id: "links-main",
    title: "Links",
    position: { x: 10, y: 2.5 },
    size: { width: 80, height: 72 },
    theme: "blue",
    animationDelayMs: 0,
  },
] as const;

export const contactWindowDefinitions: DesktopWindowDefinition[] = [
  {
    id: "contact-main",
    title: "Mail",
    position: { x: 10, y: 2.5 },
    size: { width: 80, height: 72 },
    theme: "blue",
    animationDelayMs: 0,
  },
] as const;

export const shortcutWindowDefinitions: DesktopWindowDefinition[] = [
  {
    id: "shortcut-main",
    title: "Shortcut",
    position: { x: 10, y: 2.5 },
    size: { width: 80, height: 72 },
    theme: "blue",
    animationDelayMs: 0,
  },
  {
    id: "shortcut-text",
    title: "text file",
    position: { x: 24, y: 18 },
    size: { width: 36, height: 34 },
    theme: "paper",
    animationDelayMs: 60,
  },
] as const;

export const shortcutWindowContents: Record<
  string,
  { title: string; items: ShortcutWindowItem[] }
> = {
  idea: {
    title: "IDE.a",
    items: [
      { id: "idea-mascot", label: "Mascot", kind: "folder" },
      { id: "idea-deon-comic", label: "DEON Comic", kind: "folder" },
      { id: "idea-logo", label: "Logo", kind: "folder" },
      {
        id: "idea-txt",
        label: "IDE.a.txt",
        kind: "file",
        documentId: "idea-txt",
      },
    ],
  },
  "aws-community-event": {
    title: "AWS Community Event",
    items: [
      { id: "aws-community-event-1", label: "Brand Guidelines.pdf", kind: "file" },
      { id: "aws-community-event-2", label: "Website Announcment Pubmat.png", kind: "folder" },
      { id: "aws-community-event-3", label: "Panelist Template.png", kind: "folder" },
    ],
  },
  "world-of-fotum": {
    title: "World of Fatum",
    items: [
      {
        id: "world-of-fatum-main",
        label: "World of Fatum.pdf",
        kind: "file",
        documentId: "world-of-fatum-main",
      },
      {
        id: "world-of-fatum-beastiary",
        label: "Monster Beastiary.pdf",
        kind: "file",
        documentId: "world-of-fatum-beastiary",
      },
      {
        id: "world-of-fatum-preastres",
        label: "Preastres.pdf",
        kind: "file",
        documentId: "world-of-fatum-preastres",
      },
      {
        id: "world-of-fatum-lore",
        label: "World Lore & Compendium.pdf",
        kind: "file",
        documentId: "world-of-fatum-lore",
      },
      {
        id: "world-of-fatum-vvmi",
        label: "Vain, Valiant, and Very Much Inlove.pdf",
        kind: "file",
        documentId: "world-of-fatum-vvmi",
      },
      {
        id: "world-of-fatum-crown",
        label: "Crown Of Threads.pdf",
        kind: "file",
        documentId: "world-of-fatum-crown",
      },
      {
        id: "world-of-fatum-codex",
        label: "Codex Threadica.pdf",
        kind: "file",
        documentId: "world-of-fatum-codex",
      },
    ],
  },
};

export const shortcutDocuments: Record<string, ShortcutDocument> = {
  "idea-txt": {
    id: "idea-txt",
    title: "what.txt",
    kind: "text",
    content:
      "so about ide.a\n\nbasically i made a lot of projects in this club. most of them are the reason of my lack of sleep and frequent cramming due to announcements of events being literally so abrupt. however helping on building the visual identity of the club was fun especially since im one of the founding members of the club. i am rather grateful for the artistic opportunities this club has provided me as it really made me used to rushed projects and to think critically and mindfully.",
  },
  "world-of-fatum-main": {
    id: "world-of-fatum-main",
    title: "World of Fatum.pdf",
    kind: "pdf",
    documentSrc: "/pdfs/world-of-fatum/world-of-fatum.pdf",
  },
  "world-of-fatum-beastiary": {
    id: "world-of-fatum-beastiary",
    title: "Monster Beastiary.pdf",
    kind: "pdf",
    documentSrc: "/pdfs/world-of-fatum/monster-beastiary.pdf",
  },
  "world-of-fatum-preastres": {
    id: "world-of-fatum-preastres",
    title: "Preastres.pdf",
    kind: "pdf",
    documentSrc: "/pdfs/world-of-fatum/preastres.pdf",
  },
  "world-of-fatum-lore": {
    id: "world-of-fatum-lore",
    title: "World Lore & Compendium.pdf",
    kind: "pdf",
    documentSrc: "/pdfs/world-of-fatum/world-lore-and-compendium.pdf",
  },
  "world-of-fatum-vvmi": {
    id: "world-of-fatum-vvmi",
    title: "Vain, Valiant, and Very Much Inlove.pdf",
    kind: "pdf",
    documentSrc: "/pdfs/world-of-fatum/vain-valiant-and-very-much-inlove.pdf",
  },
  "world-of-fatum-crown": {
    id: "world-of-fatum-crown",
    title: "Crown Of Threads.pdf",
    kind: "pdf",
    documentSrc: "/pdfs/world-of-fatum/crown-of-threads.pdf",
  },
  "world-of-fatum-codex": {
    id: "world-of-fatum-codex",
    title: "Codex Threadica.pdf",
    kind: "pdf",
    documentSrc: "/pdfs/world-of-fatum/codex-threadica.pdf",
  },
};

export const shortcutExternalLinks: Record<string, string> = {
  resume: "/Resume-art.pdf",
};

export const allWindowDefinitions: DesktopWindowDefinition[] = [
  ...aboutWindowDefinitions,
  ...projectsWindowDefinitions,
  ...linksWindowDefinitions,
  ...contactWindowDefinitions,
  ...shortcutWindowDefinitions,
];
