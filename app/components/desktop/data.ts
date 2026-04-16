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
  "dont-look": {
    title: "i warned you!",
    items: [],
  },
  idea: {
    title: "IDE.a",
    items: [
      {
        id: "idea-mascot",
        label: "Deon iDEA Mascot.jpeg",
        kind: "file",
        documentId: "idea-mascot",
      },
      {
        id: "idea-deon-comic",
        label: "DEON Comic.pdf",
        kind: "file",
        documentId: "idea-deon-comic",
      },
      {
        id: "idea-logo",
        label: "iDEA Logo.jpg",
        kind: "file",
        documentId: "idea-logo",
      },
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
      {
        id: "aws-brand-guidelines",
        label: "Brand Guidelines.pdf",
        kind: "file",
        documentId: "aws-brand-guidelines",
      },
      {
        id: "aws-pubmat",
        label: "AWS Pubmat.png",
        kind: "file",
        documentId: "aws-pubmat",
      },
      {
        id: "aws-panel-template",
        label: "Panel Discussion Template.png",
        kind: "file",
        documentId: "aws-panel-template",
      },
      {
        id: "aws-txt",
        label: "AWS.txt",
        kind: "file",
        documentId: "aws-txt",
      },
    ],
  },
  belen: {
    title: "Belen",
    items: [
      {
        id: "belen-photo-1",
        label: "Animals Study.jpeg",
        kind: "file",
        documentId: "belen-photo-1",
      },
      {
        id: "belen-photo-2",
        label: "Night Setup.jpeg",
        kind: "file",
        documentId: "belen-photo-2",
      },
      {
        id: "belen-photo-3",
        label: "Making Belen.jpeg",
        kind: "file",
        documentId: "belen-photo-3",
      },
      {
        id: "belen-photo-4",
        label: "Sheep Detail.jpeg",
        kind: "file",
        documentId: "belen-photo-4",
      },
      {
        id: "belen-photo-5",
        label: "First Place.jpeg",
        kind: "file",
        documentId: "belen-photo-5",
      },
      {
        id: "belen-photo-6",
        label: "Main Angle.jpeg",
        kind: "file",
        documentId: "belen-photo-6",
      },
      {
        id: "belen-photo-7",
        label: "Judging Night.jpeg",
        kind: "file",
        documentId: "belen-photo-7",
      },
      {
        id: "belen-photo-8",
        label: "Village Night.jpeg",
        kind: "file",
        documentId: "belen-photo-8",
      },
      {
        id: "belen-txt",
        label: "Belen.txt",
        kind: "file",
        documentId: "belen-txt",
      },
    ],
  },
  donmac: {
    title: "DonMac",
    items: [
      {
        id: "donmac-ui",
        label: "DON MAC Full UI.pdf",
        kind: "file",
        documentId: "donmac-ui",
      },
      {
        id: "donmac-video",
        label: "Don Mackiez.mp4",
        kind: "file",
        documentId: "donmac-video",
      },
    ],
  },
  welllife: {
    title: "WellLife",
    items: [
      {
        id: "welllife-ui",
        label: "WELLLIFE Full UI.pdf",
        kind: "file",
        documentId: "welllife-ui",
      },
      {
        id: "welllife-txt",
        label: "WellLife.txt",
        kind: "file",
        documentId: "welllife-txt",
      },
    ],
  },
  Zapac: {
    title: "Zapac",
    items: [
      {
        id: "zapac-ui",
        label: "ZAPAC Full UI.pdf",
        kind: "file",
        documentId: "zapac-ui",
      },
      {
        id: "zapac-pdf",
        label: "Zapac.pdf",
        kind: "file",
        documentId: "zapac-pdf",
      },
      {
        id: "zapac-txt",
        label: "Zapac.txt",
        kind: "file",
        documentId: "zapac-txt",
      },
    ],
  },
  gimi: {
    title: "GIMI",
    items: [
      {
        id: "gimi-presentation",
        label: "GIMI_Presentation.pdf",
        kind: "file",
        documentId: "gimi-presentation",
      },
      {
        id: "gimi-poster",
        label: "GIMI Poster.png",
        kind: "file",
        documentId: "gimi-poster",
      },
      {
        id: "gimi-txt",
        label: "GIMI.txt",
        kind: "file",
        documentId: "gimi-txt",
      },
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
  "idea-mascot": {
    id: "idea-mascot",
    title: "deon-idea-mascot.jpeg",
    kind: "image",
    imageSrc: "/images/illustrations/deon-idea-mascot-concept-art.png",
    imageAlt: "Deon iDEA mascot concept art",
  },
  "idea-deon-comic": {
    id: "idea-deon-comic",
    title: "DEON Comic for iDEA.pdf",
    kind: "flipbook",
    documentSrc: "/pdfs/deon-comic-for-idea.pdf",
  },
  "idea-logo": {
    id: "idea-logo",
    title: "idea-logo.jpg",
    kind: "image",
    imageSrc: "/images/shortcut/idea-logo.jpg",
    imageAlt: "iDEA logo",
  },
  "aws-brand-guidelines": {
    id: "aws-brand-guidelines",
    title: "Brand Guidelines.pdf",
    kind: "pdf",
    documentSrc: "/pdfs/brand-guidelines.pdf",
  },
  "aws-pubmat": {
    id: "aws-pubmat",
    title: "AWS Pubmat.png",
    kind: "image",
    imageSrc: "/images/graphic-design/aws-pubmat.png",
    imageAlt: "AWS event pubmat",
  },
  "aws-panel-template": {
    id: "aws-panel-template",
    title: "AWS Panel Discussion Template.png",
    kind: "image",
    imageSrc: "/images/graphic-design/aws-panel-discussion-template.png",
    imageAlt: "AWS panel discussion template",
  },
  "aws-txt": {
    id: "aws-txt",
    title: "AWS.txt",
    kind: "text",
    content:
      "This event was honestly such a roller coaster. I was part of the graphic design team, and at first everyone was assigned to work on the brand guidelines. But I noticed no one had really started yet, which was kind of surprising since some of the other volunteers didn't even have classes at the time, while our group did because we were on a trimester schedule. So I decided to just take the initiative and start building the brand guidelines myself.\n\nThe heads already wanted blue and orange as the main colors, so I worked around that and created a visual direction they ended up really liking. My idea was to connect AWS with the sky and clouds, then push it further by bringing in the feeling of sunsets, the night sky, and space. Since it's the sky, blue and orange just made sense together. I also used glassmorphism because I wanted it to feel like looking through a telescope, something soft, modern, and a little dreamy.\n\nThe whole concept became this blend of science and art: astronomy, wonder, and the natural beauty of the sky. Looking back, it was really just a whim at first, but somehow that whim ended up shaping the whole vision and became part of why it worked so well.",
  },
  "belen-photo-1": {
    id: "belen-photo-1",
    title: "Animals Study.jpeg",
    kind: "image",
    imageSrc: "/images/shortcut/belen/belen-animals.jpeg",
    imageAlt: "Painted cardboard animals for the Belen project",
  },
  "belen-photo-2": {
    id: "belen-photo-2",
    title: "Night Setup.jpeg",
    kind: "image",
    imageSrc: "/images/shortcut/belen/belen-night-setup.jpeg",
    imageAlt: "The Belen installation at night",
  },
  "belen-photo-3": {
    id: "belen-photo-3",
    title: "Making Belen.jpeg",
    kind: "image",
    imageSrc: "/images/shortcut/belen/belen-making.jpeg",
    imageAlt: "Behind the scenes of making the Belen",
  },
  "belen-photo-4": {
    id: "belen-photo-4",
    title: "Sheep Detail.jpeg",
    kind: "image",
    imageSrc: "/images/shortcut/belen/belen-sheep-detail.jpeg",
    imageAlt: "Hand-painted sheep cutout for the Belen",
  },
  "belen-photo-5": {
    id: "belen-photo-5",
    title: "First Place.jpeg",
    kind: "image",
    imageSrc: "/images/shortcut/belen/belen-first-place.jpeg",
    imageAlt: "Princess standing with the finished Belen display",
  },
  "belen-photo-6": {
    id: "belen-photo-6",
    title: "Main Angle.jpeg",
    kind: "image",
    imageSrc: "/images/shortcut/belen/belen-main-angle.jpeg",
    imageAlt: "Main view of the Belen installation",
  },
  "belen-photo-7": {
    id: "belen-photo-7",
    title: "Judging Night.jpeg",
    kind: "image",
    imageSrc: "/images/shortcut/belen/belen-judging.jpeg",
    imageAlt: "Judges visiting the Belen display",
  },
  "belen-photo-8": {
    id: "belen-photo-8",
    title: "Village Night.jpeg",
    kind: "image",
    imageSrc: "/images/shortcut/belen/belen-village.jpeg",
    imageAlt: "Christmas village night photo",
  },
  "belen-txt": {
    id: "belen-txt",
    title: "Belen.txt",
    kind: "text",
    content:
      "This project is for an annual Christmas village contest in the Municipality of Liloan, which means every purok in Liloan is part of the contest.\n\nI decided to do the Belen and I made it with my mom. I conceptualized what it would look like, painted the animals, and painted the people, while my mom draped them with the clothes.\n\nThe Belen won first place, which helped secure our purok's Christmas village 4th place overall. So this project is probably my magnum opus.",
  },
  "donmac-ui": {
    id: "donmac-ui",
    title: "DON MAC Full UI.pdf",
    kind: "pdf",
    documentSrc: "/pdfs/don-mac-full-ui.pdf",
    companionTitle: "live version",
    companionText:
      "this one already has a live website, so if you want to see the full experience please check out the site version too!",
    companionHref: "https://donmac-web.vercel.app/landing",
    companionLabel: "open website",
  },
  "donmac-video": {
    id: "donmac-video",
    title: "Don Mackiez.mp4",
    kind: "video",
    videoSrc: "/videos/don-mackiez.mp4",
  },
  "welllife-ui": {
    id: "welllife-ui",
    title: "WELLLIFE Full UI.pdf",
    kind: "pdf",
    documentSrc: "/pdfs/welllife-full-ui.pdf",
    companionTitle: "little note",
    companionText:
      "the pdf compressor removed some colors on my designs :(! but i have a backup file so if you want to see the full experience please do check out the prototype link!",
    companionHref:
      "https://www.figma.com/proto/xRbPRvsklLenHHf1NvKF1D/WELLife-2025-Website-Rehaul?node-id=492-847&t=bB3jyE0zNlSA7mdX-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=492%3A847",
    companionLabel: "open prototype",
  },
  "welllife-txt": {
    id: "welllife-txt",
    title: "WellLife.txt",
    kind: "text",
    content:
      "Wellife was a commissioned redesign project assigned by my professor, who hired me and my friend to improve a company's existing website. The original site was outdated, had multiple dead links, and used blurry product images, which made the experience feel less credible and difficult to navigate. These issues became the main focus of our redesign.\n\nMy design approach is always human-centered. I believe good design should support people naturally and clearly, rather than make them work harder to understand it. With that in mind, I designed the new experience to feel more intuitive, visually updated, and easier to navigate so users could focus on what they needed without unnecessary friction.",
  },
  "zapac-ui": {
    id: "zapac-ui",
    title: "ZAPAC Full UI.pdf",
    kind: "pdf",
    documentSrc: "/pdfs/zapac-full-ui.pdf",
  },
  "zapac-pdf": {
    id: "zapac-pdf",
    title: "Zapac.pdf",
    kind: "pdf",
    documentSrc: "/pdfs/zapac.pdf",
  },
  "zapac-txt": {
    id: "zapac-txt",
    title: "Zapac.txt",
    kind: "text",
    content:
      "ZAPAC is a mobile app we created as our thesis project to help commuters in Cebu figure out how to get from one place to another more easily. It acts as a commuting guide designed around real local transportation struggles, with the goal of making everyday travel feel less confusing and more accessible.\n\nThis project is very personal to me because it's something my team and I poured so much thought, care, and effort into. It was successfully defended in our Software Engineering course, where we were awarded Best Project and received the highest score of 99.\n\nI worked on ZAPAC as the leader, product owner, and main UI/UX designer of the team. I was also responsible for developing the app's visual identity, helping shape both the user experience and the overall look and feel of the product.",
  },
  "gimi-presentation": {
    id: "gimi-presentation",
    title: "GIMI_Presentation.pdf",
    kind: "pdf",
    documentSrc: "/pdfs/gimi-presentation.pdf",
  },
  "gimi-poster": {
    id: "gimi-poster",
    title: "GIMI Poster.png",
    kind: "image",
    imageSrc: "/images/graphic-design/gimi.png",
    imageAlt: "GIMI poster art",
  },
  "gimi-txt": {
    id: "gimi-txt",
    title: "GIMI.txt",
    kind: "text",
    content:
      "GIMI is a student mental health support platform commissioned by our school's Guidance Department for the 3rd Year Software Engineering students. Even though it was an unpaid commission, it was a meaningful project because it was created for a real community and a real need.\n\nFor this project, I served as the Scrum Master while also working on documentation, design, and front-end design. I was also the one who created GIMI's mascot and built its visual identity, helping give the platform a more welcoming and approachable personality.",
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
