export type ProjectCategory =
  | "Animatic Videos"
  | "Illustration"
  | "UI/UX"
  | "Graphic Design"
  | "Game Development"
  | "Other...";

export type ProjectItem = {
  id: string;
  title: string;
  category: ProjectCategory;
  year: string;
  summary: string;
  highlight: string;
  role: string;
  stack: string[];
  accent: string;
};

export const toolTags = [
  "Clip Studio Paint",
  "Affinity",
  "Canva",
  "Figma",
  "Adobe After Effects",
  "GIMP",
  "Blender",
  "Trello",
  "Notion",
  "Miro",
  "GODOT",
] as const;

export const developmentTags = [
  "C++",
  "React",
  "Python",
  "Next.js",
  "JavaScript",
  "Java",
  "C#",
  "Node.js",
  "Tailwind",
  "HTML/CSS",
  "TypeScript",
] as const;

export const projectItems: ProjectItem[] = [
  {
    id: "aws-community-event",
    title: "AWS Community Event",
    category: "UI/UX",
    year: "2025",
    summary:
      "A cheerful event microsite concept focused on clear schedules, speaker sections, and an easy registration flow.",
    highlight: "Built to feel lightweight, welcoming, and easy to scan during busy event days.",
    role: "UI/UX design, layout systems, interaction planning",
    stack: ["Figma", "Branding", "Responsive UI"],
    accent: "from-[#bde3ff] to-[#fef7fd]",
  },
  {
    id: "welllife",
    title: "WellLife",
    category: "UI/UX",
    year: "2025",
    summary:
      "A wellness app concept with soft onboarding, habit tracking ideas, and a more calming visual language.",
    highlight: "Designed to feel supportive instead of overwhelming for everyday use.",
    role: "Product design, user flows, visual direction",
    stack: ["Figma", "Mobile App", "Prototype"],
    accent: "from-[#d4f7ef] to-[#eef8ff]",
  },
  {
    id: "donmac",
    title: "DonMac",
    category: "UI/UX",
    year: "2024",
    summary:
      "A food ordering concept that organizes menu browsing, item customization, and quick checkout into a cleaner flow.",
    highlight: "Focused on reducing taps and making menu choices feel less messy.",
    role: "User flow mapping, interface design, component thinking",
    stack: ["UX", "UI Kit", "Ordering Flow"],
    accent: "from-[#ffe3c8] to-[#fff7ea]",
  },
  {
    id: "world-of-fotum",
    title: "World of Fotum",
    category: "Graphic Design",
    year: "2024",
    summary:
      "A branding-heavy visual concept with dreamy layouts, promotional graphics, and collectible-style assets.",
    highlight: "Centered on building a world that feels charming and memorable at first glance.",
    role: "Art direction, social assets, brand identity",
    stack: ["Affinity", "Canva", "Branding"],
    accent: "from-[#f8d7f0] to-[#fff4fb]",
  },
  {
    id: "gimi",
    title: "GIMI",
    category: "Illustration",
    year: "2024",
    summary:
      "A playful illustration set exploring character poses, pastel palettes, and expressive little details.",
    highlight: "Made to feel soft, cute, and instantly recognizable as part of one set.",
    role: "Illustration, color studies, asset creation",
    stack: ["Clip Studio Paint", "Illustration", "Character Work"],
    accent: "from-[#d6ecff] to-[#fff4fb]",
  },
  {
    id: "belen",
    title: "Belen",
    category: "Illustration",
    year: "2024",
    summary:
      "A personal illustration piece centered on atmosphere, styling, and a more polished portrait composition.",
    highlight: "An exercise in pushing softness, lighting, and storytelling through expression.",
    role: "Portrait illustration, composition, rendering",
    stack: ["Digital Art", "Portrait", "Color"],
    accent: "from-[#f7d9d0] to-[#fffaf5]",
  },
  {
    id: "zapac",
    title: "Qapac",
    category: "Graphic Design",
    year: "2024",
    summary:
      "A graphic design concept for promotional layouts and structured visual communication across multiple posts.",
    highlight: "Focused on keeping visuals polished while still feeling youthful and easy to read.",
    role: "Layout design, campaign graphics, typography",
    stack: ["Canva", "Poster Design", "Social Media"],
    accent: "from-[#dce7ff] to-[#f6f9ff]",
  },
  {
    id: "lament-of-departed",
    title: "Lament of the Departed",
    category: "Game Development",
    year: "2026",
    summary:
      "A Java narrative game about a lone character exploring a broken world, meeting NPCs, and uncovering memories through pixel maps and dialogue.",
    highlight: "A moody Part 1 story game built with custom movement, maps, and character art.",
    role: "Programming, game design, art, and story for Part 1",
    stack: ["Java", "Swing / AWT", "Pixel Art"],
    accent: "from-[#241b1b] to-[#d7aa68]",
  },
  {
    id: "idea",
    title: "IDE.a",
    category: "Other...",
    year: "2025",
    summary:
      "A collection of small experimental builds and interface studies used to test playful concepts quickly.",
    highlight: "Where tiny ideas get explored before they turn into more polished work.",
    role: "Creative coding, prototyping, concept testing",
    stack: ["Next.js", "React", "Experiments"],
    accent: "from-[#d4ecff] to-[#f8fbff]",
  },
  {
    id: "animatic-reel",
    title: "Animatic Reel",
    category: "Animatic Videos",
    year: "2024",
    summary:
      "A storyboard-to-motion reel that explores pacing, scene transitions, and emotional beats before final production.",
    highlight: "Made to quickly communicate story rhythm and visual direction.",
    role: "Storyboarding, timing, animatic editing",
    stack: ["After Effects", "Storyboarding", "Motion"],
    accent: "from-[#e6e0ff] to-[#fff9ff]",
  },
  {
    id: "resume-refresh",
    title: "Resume Refresh",
    category: "Graphic Design",
    year: "2025",
    summary:
      "A cleaner resume redesign balancing personality, structure, and readability for internships and applications.",
    highlight: "The goal was to feel polished without losing character.",
    role: "Typography, hierarchy, print-friendly layout",
    stack: ["Layout", "Branding", "Career Materials"],
    accent: "from-[#edf3ff] to-[#ffffff]",
  },
  {
    id: "portfolio-os",
    title: "Portfolio OS",
    category: "Other...",
    year: "2026",
    summary:
      "This desktop-inspired portfolio experience with draggable windows, playful icons, and an operating-system feel.",
    highlight: "Built to turn a portfolio into something you can explore, not just scroll through.",
    role: "Frontend development, interaction design, visual implementation",
    stack: ["Next.js", "Tailwind", "Interaction Design"],
    accent: "from-[#d8ecff] to-[#fff7fd]",
  },
  {
    id: "pubmat-set",
    title: "Pubmat Set",
    category: "Graphic Design",
    year: "2024",
    summary:
      "A set of publication materials for announcements, promotions, and events with a cohesive visual identity.",
    highlight: "Designed for consistency across many formats without feeling repetitive.",
    role: "Campaign visuals, template systems, design production",
    stack: ["Pubmats", "Canva", "Visual System"],
    accent: "from-[#ffe0ef] to-[#fff8fb]",
  },
];

export const projectSections = [
  {
    id: "ui-ux",
    title: "UI/UX",
    description: "Interfaces and flows built to feel cute, calm, and understandable.",
  },
  {
    id: "animatic-videos",
    title: "Animatic Videos",
    description: "Motion-first pieces for story pacing, boards, and scene planning.",
  },
  {
    id: "illustration",
    title: "Illustration",
    description: "Character work, portraits, and soft visual experiments.",
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    description: "Layouts, branding, and promo materials with a playful polish.",
  },
  {
    id: "game-development",
    title: "Game Development",
    description: "Playable story worlds, custom engines, pixel maps, and character systems.",
  },
  {
    id: "other",
    title: "Other...",
    description: "Experiments, prototypes, and small ideas that grew into real work.",
  },
] as const;
