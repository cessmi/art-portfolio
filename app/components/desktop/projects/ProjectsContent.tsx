"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

const ComicFlipbookViewer = dynamic(() => import("./ComicFlipbookViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[58vh] items-center justify-center rounded-[16px] border border-dashed border-[#bfd5ef] bg-white/70 px-6 text-center">
      <div>
        <p className="font-hand text-[16px] text-[#1a5ea9]">
          opening comic reader...
        </p>
        <p className="font-ui mt-2 text-[13px] leading-6 text-[#5f7ba1]">
          putting the page-flip effect together.
        </p>
      </div>
    </div>
  ),
});

const toolTags = [
  "Clip Studio Point",
  "Affinity",
  "Canva",
  "Figma",
  "Adobe AFter EFFects",
] as const;

const developmentTags = [
  "C++",
  "Java",
  "React",
  "Python",
  "Next.Js",
  "JavaScript",
  "CSharp",
] as const;

type PlaceholderSize = "half" | "full";
type MediaKind = "image" | "video";

type ProjectMedia = {
  kind: MediaKind;
  src: string;
  alt: string;
  poster?: string;
};

type ProjectPlaceholder = {
  id: string;
  label: string;
  size: PlaceholderSize;
  href?: string;
  media?: ProjectMedia;
  documentSrc?: string;
  documentTitle?: string;
  flipbookSrc?: string;
  companionTitle?: string;
  companionText?: string;
  companionHref?: string;
  companionLabel?: string;
  previewFit?: "cover" | "contain";
  backgroundClassName?: string;
  tileClassName?: string;
};

type ProjectSection = {
  title: string;
  items: ProjectPlaceholder[];
  gridClassName?: string;
};

const primarySectionTitle = "UI/UX";

const projectSections: ProjectSection[] = [
  {
    title: "Game Development",
    items: [
      {
        id: "game-dev-1",
        label: "Lament of the Departed",
        size: "full",
        previewFit: "cover",
        backgroundClassName: "bg-[#171111]",
        tileClassName: "aspect-[16/9] sm:col-span-2",
        media: {
          kind: "image",
          src: "/images/projects/game-development/lament-of-departed.png",
          alt: "Lament of the Departed title screen",
        },
      },
    ] as ProjectPlaceholder[],
  },
  {
    title: "Animatic Videos",
    items: [
      {
        id: "animatic-1",
        label: "Lovely Night (Xiaolumi Animatic)",
        size: "half",
        media: {
          kind: "video",
          src: "/videos/lovely-night-xiaolumi-animatic.mp4",
          alt: "Lovely Night Xiaolumi animatic",
        },
      },
      {
        id: "animatic-2",
        label: "Masyado Pang Maaga (Genshin Impact Animatic)",
        size: "half",
        media: {
          kind: "video",
          src: "/videos/masyado-pang-maaga-genshin-impact-animatic.mp4",
          alt: "Masyado Pang Maaga Genshin Impact animatic",
        },
      },
      {
        id: "animatic-3",
        label: "VVVMIL Animatic",
        size: "full",
        media: {
          kind: "video",
          src: "/videos/vvvmil-animatic.mp4",
          alt: "VVVMIL animatic",
        },
      },
    ] as ProjectPlaceholder[],
  },
  {
    title: "Illustration",
    gridClassName:
      "grid grid-cols-2 auto-rows-[72px] gap-3 sm:grid-cols-4 sm:auto-rows-[88px] sm:gap-4 lg:auto-rows-[104px]",
    items: [
      {
        id: "illustration-1",
        label: "Anteros and Seraphina",
        size: "full",
        previewFit: "contain",
        backgroundClassName: "bg-[#f6f1eb]",
        tileClassName: "col-span-2 row-span-2 sm:col-span-2 sm:row-span-3",
        media: {
          kind: "image",
          src: "/images/illustrations/anteros-and-seraphina.png",
          alt: "Anteros and Seraphina illustration",
        },
      },
      {
        id: "illustration-2",
        label: "CESS Concept Art 2",
        size: "full",
        previewFit: "contain",
        backgroundClassName: "bg-[#fcf8fb]",
        tileClassName: "col-span-2 row-span-2 sm:col-span-2 sm:row-span-3",
        media: {
          kind: "image",
          src: "/images/illustrations/cess-concept-art-2.png",
          alt: "CESS concept art with pink bike",
        },
      },
      {
        id: "illustration-3",
        label: "CESS Concept Arts",
        size: "full",
        previewFit: "contain",
        backgroundClassName: "bg-[#fdf9fc]",
        tileClassName: "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2",
        media: {
          kind: "image",
          src: "/images/illustrations/cess-concept-arts.png",
          alt: "CESS concept art sheet",
        },
      },
      {
        id: "illustration-4",
        label: "CW 2025 Poster Art",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#f6f6f0]",
        tileClassName: "col-span-1 row-span-2 sm:row-span-3",
        media: {
          kind: "image",
          src: "/images/illustrations/cw-2025-poster-art.jpg",
          alt: "CW 2025 poster art illustration",
        },
      },
      {
        id: "illustration-5",
        label: "Deon iDEA Mascot Concept Art",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#f6f3f1]",
        tileClassName: "col-span-1 row-span-2 sm:row-span-3",
        media: {
          kind: "image",
          src: "/images/illustrations/deon-idea-mascot-concept-art.png",
          alt: "Deon iDEA mascot concept art",
        },
      },
      {
        id: "illustration-6",
        label: "Dimitri Character Ref",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#f8f7f2]",
        tileClassName: "col-span-1 row-span-2 sm:row-span-3",
        media: {
          kind: "image",
          src: "/images/illustrations/dimitri-character-ref.png",
          alt: "Dimitri character reference illustration",
        },
      },
      {
        id: "illustration-7",
        label: "Iris",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#f2f6f1]",
        tileClassName: "col-span-1 row-span-2 sm:row-span-3",
        media: {
          kind: "image",
          src: "/images/illustrations/iris.png",
          alt: "Iris portrait illustration",
        },
      },
      {
        id: "illustration-8",
        label: "Mermaid",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#f4f4ef]",
        tileClassName: "col-span-1 row-span-2 sm:row-span-3",
        media: {
          kind: "image",
          src: "/images/illustrations/mermaid.jpeg",
          alt: "Mermaid illustration",
        },
      },
      {
        id: "illustration-9",
        label: "Phoibus Character Ref",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#f8f4e9]",
        tileClassName: "col-span-1 row-span-2 sm:row-span-3",
        media: {
          kind: "image",
          src: "/images/illustrations/phoibus-character-ref.png",
          alt: "Phoibus character reference illustration",
        },
      },
      {
        id: "illustration-10",
        label: "Power of Preastres",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#f8f0ea]",
        tileClassName: "col-span-1 row-span-2 sm:row-span-2",
        media: {
          kind: "image",
          src: "/images/illustrations/power-of-preastres.png",
          alt: "Power of Preastres illustration",
        },
      },
      {
        id: "illustration-11",
        label: "Fanart 02",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#f7f3eb]",
        tileClassName: "col-span-1 row-span-2 sm:row-span-2",
        media: {
          kind: "image",
          src: "/images/illustrations/fanart-02.jpeg",
          alt: "Fanart 02 illustration",
        },
      },
      {
        id: "illustration-12",
        label: "Fanart 05",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#f4f1ed]",
        tileClassName: "col-span-1 row-span-2 sm:row-span-2",
        media: {
          kind: "image",
          src: "/images/illustrations/fanart-05.jpeg",
          alt: "Fanart 05 illustration",
        },
      },
      {
        id: "illustration-13",
        label: "Deon 2",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#f2efeb]",
        tileClassName: "col-span-1 row-span-2 sm:row-span-2",
        media: {
          kind: "image",
          src: "/images/illustrations/deon2-1.png",
          alt: "Deon character illustration",
        },
      },
      {
        id: "illustration-14",
        label: "Fanart 06",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#f1efea]",
        tileClassName: "col-span-1 row-span-2 sm:row-span-2",
        media: {
          kind: "image",
          src: "/images/illustrations/fanart-06.png",
          alt: "Fanart 06 illustration",
        },
      },
      {
        id: "illustration-15",
        label: "Fanart 10",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#17130f]",
        tileClassName: "col-span-1 row-span-2 sm:row-span-2",
        media: {
          kind: "image",
          src: "/images/illustrations/fanart-10.png",
          alt: "Fanart 10 illustration",
        },
      },
      {
        id: "illustration-16",
        label: "Fanart 11",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#16110f]",
        tileClassName: "col-span-1 row-span-2 sm:row-span-2",
        media: {
          kind: "image",
          src: "/images/illustrations/fanart-11.png",
          alt: "Fanart 11 illustration",
        },
      },
      {
        id: "illustration-17",
        label: "Fanart 13",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#0f1012]",
        tileClassName: "col-span-1 row-span-2 sm:row-span-2",
        media: {
          kind: "image",
          src: "/images/illustrations/fanart-13.jpg",
          alt: "Fanart 13 illustration",
        },
      },
      {
        id: "illustration-18",
        label: "Fanart 14",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#0f0d10]",
        tileClassName: "col-span-1 row-span-2 sm:row-span-2",
        media: {
          kind: "image",
          src: "/images/illustrations/fanart-14.png",
          alt: "Fanart 14 illustration",
        },
      },
      {
        id: "illustration-19",
        label: "Fanart 15",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#131112]",
        tileClassName: "col-span-1 row-span-2 sm:row-span-2",
        media: {
          kind: "image",
          src: "/images/illustrations/fanart-15.png",
          alt: "Fanart 15 illustration",
        },
      },
      {
        id: "illustration-20",
        label: "Gahilak na Anghel",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#121011]",
        tileClassName: "col-span-1 row-span-2 sm:row-span-2",
        media: {
          kind: "image",
          src: "/images/illustrations/gahilak-na-anghel.jpeg",
          alt: "Gahilak na Anghel illustration",
        },
      },
      {
        id: "illustration-21",
        label: "Girl with a Pearl Earring",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#0f0d0d]",
        tileClassName: "col-span-1 row-span-2 sm:row-span-3",
        media: {
          kind: "image",
          src: "/images/illustrations/girl-with-a-pearl-earring.jpg",
          alt: "Girl with a Pearl Earring study illustration",
        },
      },
      {
        id: "illustration-22",
        label: "Superman",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#f8f7f3]",
        tileClassName: "col-span-1 row-span-2 sm:row-span-3",
        media: {
          kind: "image",
          src: "/images/illustrations/superman.jpg",
          alt: "Superman portrait illustration",
        },
      },
    ] as ProjectPlaceholder[],
  },
  {
    title: "UI/UX",
    items: [
      {
        id: "uiux-1",
        label: "JSE Full UI",
        size: "full",
        documentTitle: "JSE Full UI.pdf",
        documentSrc: "/pdfs/jse-full-ui.pdf",
        companionTitle: "little note",
        companionText:
          "the pdf compressor removed some colors on my designs :(! but i have a backup file so if you want to see the full experience please do check out the prototype link!",
        companionHref:
          "https://www.figma.com/proto/48XYfob3ZFhAGh5gPUfaAI/JSE-Portfolio?node-id=282-126&t=AQgq0NRAWygEFbgK-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=98%3A2&show-proto-sidebar=1",
        companionLabel: "open prototype",
        previewFit: "cover",
        backgroundClassName: "bg-black",
        tileClassName: "aspect-[16/9] sm:col-span-2",
        media: {
          kind: "image",
          src: "/images/projects/jse-thumbnail.jpg",
          alt: "JSE UI thumbnail preview",
        },
      },
      {
        id: "uiux-2",
        label: "DON MAC Full UI",
        size: "half",
        documentTitle: "DON MAC Full UI.pdf",
        documentSrc: "/pdfs/don-mac-full-ui.pdf",
        companionTitle: "live version",
        companionText:
          "this one already has a live website, so if you want to see the full experience please check out the site version too!",
        companionHref: "https://donmac-web.vercel.app/landing",
        companionLabel: "open website",
        previewFit: "cover",
        backgroundClassName: "bg-[#2c221d]",
        tileClassName: "aspect-[16/9]",
        media: {
          kind: "image",
          src: "/images/projects/don-mac-thumbnail.jpg",
          alt: "DON MAC UI thumbnail preview",
        },
      },
      {
        id: "uiux-3",
        label: "WELLLIFE Full UI",
        size: "half",
        documentTitle: "WELLLIFE Full UI.pdf",
        documentSrc: "/pdfs/welllife-full-ui.pdf",
        companionTitle: "little note",
        companionText:
          "the pdf compressor removed some colors on my designs :(! but i have a backup file so if you want to see the full experience please do check out the prototype link!",
        companionHref:
          "https://www.figma.com/proto/xRbPRvsklLenHHf1NvKF1D/WELLife-2025-Website-Rehaul?node-id=492-847&t=bB3jyE0zNlSA7mdX-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=492%3A847",
        companionLabel: "open prototype",
        previewFit: "cover",
        backgroundClassName: "bg-[#d9e8d5]",
        tileClassName: "aspect-[16/9]",
        media: {
          kind: "image",
          src: "/images/projects/welllife-thumbnail.jpg",
          alt: "WELLLIFE UI thumbnail preview",
        },
      },
      {
        id: "uiux-4",
        label: "ZAPAC Full UI",
        size: "half",
        documentTitle: "ZAPAC Full UI.pdf",
        documentSrc: "/pdfs/zapac-full-ui.pdf",
        previewFit: "contain",
        backgroundClassName: "bg-white",
        tileClassName: "aspect-[16/9]",
        media: {
          kind: "image",
          src: "/images/projects/zapac-thumbnail.jpg",
          alt: "ZAPAC UI thumbnail preview",
        },
      },
    ] as ProjectPlaceholder[],
  },
  {
    title: "Graphic Design",
    items: [
      {
        id: "graphic-1",
        label: "Brochure 1",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#f3f6ff]",
        tileClassName: "aspect-[16/10]",
        media: {
          kind: "image",
          src: "/images/graphic-design/brochure-1.png",
          alt: "Brochure 1 graphic design piece",
        },
      },
      {
        id: "graphic-2",
        label: "Brochure 2",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#f3f6ff]",
        tileClassName: "aspect-[16/10]",
        media: {
          kind: "image",
          src: "/images/graphic-design/brochure-2.png",
          alt: "Brochure 2 graphic design piece",
        },
      },
      {
        id: "graphic-3",
        label: "Escape Room",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#0c1022]",
        tileClassName: "aspect-[4/5]",
        media: {
          kind: "image",
          src: "/images/graphic-design/escape-room.png",
          alt: "Escape Room pubmat",
        },
      },
      {
        id: "graphic-4",
        label: "GIMI",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#fff4fb]",
        tileClassName: "aspect-[4/5]",
        media: {
          kind: "image",
          src: "/images/graphic-design/gimi.png",
          alt: "GIMI pubmat",
        },
      },
      {
        id: "graphic-5",
        label: "Labanan sa Himig",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#2f1e2a]",
        tileClassName: "aspect-[4/5]",
        media: {
          kind: "image",
          src: "/images/graphic-design/labanan-sa-himig-pubmat.jpg",
          alt: "Labanan sa Himig pubmat",
        },
      },
      {
        id: "graphic-6",
        label: "Project Defense Pubmat",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#11284f]",
        tileClassName: "aspect-[4/5]",
        media: {
          kind: "image",
          src: "/images/graphic-design/project-defense-pubmat.png",
          alt: "Project Defense pubmat",
        },
      },
      {
        id: "graphic-7",
        label: "Semiclon Poster",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#080818]",
        tileClassName: "aspect-[4/5]",
        media: {
          kind: "image",
          src: "/images/graphic-design/semiclon-poster.png",
          alt: "Semiclon poster",
        },
      },
      {
        id: "graphic-8",
        label: "AWS Panel Discussion Template",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#eef3ff]",
        tileClassName: "aspect-[16/10]",
        media: {
          kind: "image",
          src: "/images/graphic-design/aws-panel-discussion-template.jpg",
          alt: "AWS panel discussion template",
        },
      },
      {
        id: "graphic-9",
        label: "AWS Pubmat",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#dfe9ff]",
        tileClassName: "aspect-[1/1]",
        media: {
          kind: "image",
          src: "/images/graphic-design/aws-pubmat.png",
          alt: "AWS pubmat",
        },
      },
      {
        id: "graphic-10",
        label: "Panel SOFENG Project Defense Certificates",
        size: "half",
        documentTitle: "Panel SOFENG Project Defense Certificates.pdf",
        documentSrc: "/pdfs/panel-sofeng-project-defense-certificates.pdf",
        previewFit: "contain",
        backgroundClassName: "bg-[#11284f]",
        tileClassName: "aspect-[4/5]",
        media: {
          kind: "image",
          src: "/images/graphic-design/project-defense-pubmat.png",
          alt: "Panel SOFENG Project Defense Certificates preview",
        },
      },
    ] as ProjectPlaceholder[],
  },
  {
    title: "Other...",
    items: [
      {
        id: "other-1",
        label: "Deon Cover",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#090911]",
        tileClassName: "aspect-[4/5]",
        flipbookSrc: "/pdfs/deon-comic-for-idea.pdf",
        documentTitle: "Deon Comic for iDEA",
        media: {
          kind: "image",
          src: "/images/other/deon-cover.jpg",
          alt: "Deon cover art",
        },
      },
      {
        id: "other-2",
        label: "Belen",
        size: "half",
        previewFit: "contain",
        backgroundClassName: "bg-[#0f1110]",
        tileClassName: "aspect-[4/3]",
        media: {
          kind: "image",
          src: "/images/other/belen-thumbnail.jpeg",
          alt: "Belen event photo",
        },
      },
    ] as ProjectPlaceholder[],
  },
] as const;

const orderedProjectSections = [
  ...projectSections.filter((section) => section.title === primarySectionTitle),
  ...projectSections.filter((section) => section.title !== primarySectionTitle),
];

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="font-hand inline-flex rounded-[14px] border border-[#f39dcd] px-3 py-1.5 text-[12px] text-[#e68cc3] sm:px-4 sm:py-2 sm:text-[14px]">
      {children}
    </span>
  );
}

function MediaPreview({ item }: { item: ProjectPlaceholder }) {
  if (!item.media) {
    return <div className="h-full w-full bg-[#d9d9d9]" />;
  }

  if (item.media.kind === "video") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-black">
        <video
          src={item.media.src}
          poster={item.media.poster}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <div className="font-hand absolute bottom-3 left-3 rounded-full bg-white/85 px-2.5 py-1 text-[11px] text-[#16395f]">
          play preview
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${
        item.backgroundClassName ?? "bg-[#f5f2ee]"
      }`}
    >
      <Image
        src={item.media.src}
        alt={item.media.alt}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className={`transition duration-300 group-hover:scale-[1.02] ${
          item.previewFit === "contain"
            ? "object-contain p-2 sm:p-3"
            : "object-cover"
        }`}
      />
    </div>
  );
}

type PlaceholderBlockProps = {
  item: ProjectPlaceholder;
  isSelected: boolean;
  onSelect: (item: ProjectPlaceholder) => void;
};

function PlaceholderBlock({
  item,
  isSelected,
  onSelect,
}: PlaceholderBlockProps) {
  const sizeClass =
    item.size === "full"
      ? "h-[170px] sm:col-span-2 sm:h-[230px]"
      : "h-[150px] sm:h-[170px]";
  const bentoClassName = item.tileClassName ?? "";

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      title={item.label}
      onClick={() => onSelect(item)}
      className={`group relative overflow-hidden rounded-[20px] border border-[#efe3ee] bg-[#d9d9d9] shadow-[0_10px_24px_rgba(79,110,153,0.08)] transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e68cc3] ${
        isSelected ? "ring-2 ring-[#e68cc3]" : "hover:bg-[#d2d2d2]"
      } ${bentoClassName || sizeClass}`}
    >
      <MediaPreview item={item} />
      <span className="sr-only">{item.label}</span>
    </button>
  );
}

function PreviewOverlay({
  item,
  onClose,
}: {
  item: ProjectPlaceholder;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (
    typeof document === "undefined" ||
    (!item.media && !item.documentSrc && !item.flipbookSrc)
  ) {
    return null;
  }

  const media = item.media;

  return createPortal(
    <div
      className="fixed inset-0 z-[120] overflow-y-auto bg-black/55 p-6 backdrop-blur-[2px]"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={onClose}
    >
      <div
        className="relative mx-auto flex w-full max-w-[min(96vw,1120px)] flex-col items-center gap-4"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="font-hand self-end rounded-full bg-white/90 px-3 py-1 text-[12px] text-[#14345b]"
        >
          close
        </button>

        <div className="w-full overflow-hidden rounded-[10px] border border-white/30 bg-black shadow-[0_22px_60px_rgba(0,0,0,0.28)]">
          {item.flipbookSrc ? (
            <div className="overflow-hidden rounded-[18px] border-[3px] border-[#6fa6dc] bg-white shadow-[0_22px_60px_rgba(17,34,58,0.3)]">
              <div className="flex h-[38px] items-center justify-between bg-[#84b2df] px-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff6156]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffc941]" />
                  <span className="h-3 w-3 rounded-full bg-[#56ca58]" />
                </div>
                <p className="font-hand text-[13px] text-white">
                  {item.documentTitle ?? item.label}
                </p>
                <span className="w-[44px]" />
              </div>
              <div className="bg-[#edf5ff] p-3 sm:p-4">
                <ComicFlipbookViewer
                  src={item.flipbookSrc}
                  title={item.documentTitle ?? item.label}
                />
              </div>
            </div>
          ) : item.documentSrc ? (
            <div className="overflow-hidden rounded-[18px] border-[3px] border-[#6fa6dc] bg-white shadow-[0_22px_60px_rgba(17,34,58,0.3)]">
              <div className="flex h-[38px] items-center justify-between bg-[#84b2df] px-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff6156]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffc941]" />
                  <span className="h-3 w-3 rounded-full bg-[#56ca58]" />
                </div>
                <p className="font-hand text-[13px] text-white">
                  {item.documentTitle ?? item.label}
                </p>
                <span className="w-[44px]" />
              </div>
              <div className="bg-[#edf5ff] p-3 sm:p-4">
                <div className="mb-3 flex items-center justify-between rounded-[14px] border border-[#d4e4f7] bg-white px-3 py-2">
                  <div>
                    <p className="font-hand text-[12px] text-[#1a5ea9]">pdf viewer</p>
                    <p className="font-ui text-[11px] text-[#5f7ba1]">
                      scroll to browse the full UI deck
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="font-hand rounded-full border border-[#bfd5ef] bg-[#f7fbff] px-3 py-1 text-[11px] text-[#1a5ea9]"
                  >
                    done
                  </button>
                </div>
                {item.companionText ? (
                  <div className="mb-3 rounded-[18px] border border-[#cfe0f4] bg-[linear-gradient(135deg,#ffffff_0%,#f5f9ff_100%)] p-4 shadow-[0_12px_28px_rgba(98,137,190,0.12)]">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                      <div className="max-w-[62ch]">
                        <p className="font-hand text-[12px] uppercase tracking-[0.14em] text-[#6d93bf]">
                          {item.companionTitle ?? "note"}
                        </p>
                        <p className="font-ui mt-2 text-[13px] leading-6 text-[#32527a]">
                          {item.companionText}
                        </p>
                      </div>
                      {item.companionHref ? (
                        <a
                          href={item.companionHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-hand inline-flex shrink-0 items-center justify-center rounded-full border border-[#9ec0e7] bg-white px-4 py-2 text-[12px] text-[#1a5ea9] transition hover:-translate-y-0.5 hover:bg-[#f8fbff]"
                        >
                          {item.companionLabel ?? "open link"}
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : null}
                <div className="overflow-hidden rounded-[14px] border border-[#d4e4f7] bg-white">
                  <embed
                    src={item.documentSrc}
                    type="application/pdf"
                    aria-label={item.documentTitle ?? item.label}
                    className="h-[82vh] w-full bg-white"
                  />
                  <object
                    data={item.documentSrc}
                    type="application/pdf"
                    aria-label={item.documentTitle ?? item.label}
                    className="hidden"
                  >
                    <div className="flex min-h-[320px] items-center justify-center bg-[#f7fbff] p-6 text-center">
                      <div>
                        <p className="font-hand text-[14px] text-[#1a5ea9]">
                          this pdf couldn&apos;t render here.
                        </p>
                        <p className="font-ui mt-2 text-[12px] text-[#5f7ba1]">
                          try another browser if the preview still refuses to load.
                        </p>
                      </div>
                    </div>
                  </object>
                </div>
              </div>
            </div>
          ) : media?.kind === "video" ? (
            <video
              src={media.src}
              poster={media.poster}
              controls
              autoPlay
              playsInline
              className="max-h-[72vh] w-full bg-black object-contain"
            />
          ) : media ? (
            <div className="relative h-[72vh] w-full bg-black/80">
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
          ) : null}
        </div>

        {item.documentSrc || item.flipbookSrc ? null : (
          <p className="font-hand text-center text-[14px] text-white">
            {item.label}
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default function ProjectsContent() {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [activePreview, setActivePreview] = useState<ProjectPlaceholder | null>(null);

  function handleSelect(item: ProjectPlaceholder) {
    if (item.href) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

    setSelectedItemId(item.id);

    if (item.media || item.documentSrc || item.flipbookSrc) {
      setActivePreview(item);
    }
  }

  return (
    <>
      <div className="h-full overflow-y-auto bg-white">
        <div className="px-5 py-6 sm:px-8 sm:py-7">
          <div className="grid grid-cols-1 gap-x-14 gap-y-6 sm:grid-cols-2 sm:gap-y-8">
            <section>
              <h2 className="font-serif text-[24px] text-[#151515] sm:text-[28px]">
                Tools
              </h2>
              <div className="mt-3 flex flex-wrap gap-3">
                {toolTags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-serif text-[24px] text-[#151515] sm:text-[28px]">
                Development
              </h2>
              <div className="mt-3 flex flex-wrap gap-3">
                {developmentTags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-8 space-y-10 sm:mt-10 sm:space-y-12">
            {orderedProjectSections.map((section) => (
              <section key={section.title}>
                <h3 className="font-serif text-[24px] text-[#151515] sm:text-[28px]">
                  {section.title}
                </h3>
                <div
                  className={`mt-4 ${
                    section.gridClassName ??
                    "grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8"
                  }`}
                >
                  {section.items.map((item) => (
                    <PlaceholderBlock
                      key={item.id}
                      item={item}
                      isSelected={selectedItemId === item.id}
                      onSelect={handleSelect}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      {activePreview ? (
        <PreviewOverlay
          item={activePreview}
          onClose={() => setActivePreview(null)}
        />
      ) : null}
    </>
  );
}
