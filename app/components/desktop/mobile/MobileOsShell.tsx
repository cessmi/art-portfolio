"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  desktopShortcuts,
  dockItems,
  noteItems,
  shortcutDocuments,
  shortcutWindowContents,
} from "../data";
import ContactContent from "../contact/ContactContent";
import LinksContent from "../links/LinksContent";
import ComicFlipbookViewer from "../projects/ComicFlipbookViewer";
import ProjectsContent from "../projects/ProjectsContent";
import type { ShortcutDocument, ShortcutKind, ShortcutWindowItem } from "../types";
import MobileAboutContent from "./MobileAboutContent";

type MobileOsShellProps = {
  activeAppId: "about" | "projects" | "links" | "contact" | "shortcut" | null;
  activeShortcutId: string | null;
  isMusicPlaying: boolean;
  onOpenApp: (id: string) => void;
  onOpenShortcut: (id: string) => void;
  onCloseApp: () => void;
  onToggleMusic: () => void | Promise<void>;
};

type MobileTile = {
  id: string;
  label: string;
  iconSrc: string;
  type: "shortcut";
  shortcutId?: string;
};

function formatTime(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(value);
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(value);
}

function chunkIntoPages<T>(items: T[], pageSize: number) {
  const pages: T[][] = [];

  for (let index = 0; index < items.length; index += pageSize) {
    pages.push(items.slice(index, index + pageSize));
  }

  return pages;
}

function ShortcutItemIcon({ kind }: { kind: ShortcutKind }) {
  if (kind === "file") {
    return (
      <Image
        src="/icons/newspaper.svg"
        alt=""
        width={34}
        height={34}
        className="h-[34px] w-[34px]"
      />
    );
  }

  return (
    <Image
      src="/icons/folder.svg"
      alt=""
      width={40}
      height={40}
      className="h-10 w-10"
    />
  );
}

function iconForShortcutKind(kind: ShortcutKind) {
  if (kind === "file") {
    return "/icons/newspaper.svg";
  }

  if (kind === "trash") {
    return "/icons/trash-icon.svg";
  }

  return "/icons/folder.svg";
}

function PageDots({
  pageCount,
  currentPage,
}: {
  pageCount: number;
  currentPage: number;
}) {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-1.5">
      {Array.from({ length: pageCount }, (_, index) => (
        <span
          key={index}
          className={`h-1.5 rounded-full transition-all ${
            index === currentPage ? "w-4 bg-[#1c5ca7]" : "w-1.5 bg-[#b9d1eb]"
          }`}
        />
      ))}
    </div>
  );
}

function MobileShortcutDocumentView({
  document,
}: {
  document: ShortcutDocument;
}) {
  if (document.kind === "pdf") {
    return (
      <div className="space-y-3">
        <div className="rounded-[22px] border border-[#d7e5f5] bg-white px-4 py-3 shadow-[0_12px_30px_rgba(92,130,181,0.08)]">
          <p className="font-hand text-[12px] uppercase tracking-[0.12em] text-[#2c649c]">
            pdf viewer
          </p>
          <p className="font-ui mt-1 text-[12px] leading-5 text-[#5f7ba1]">
            browse the file right inside the phone view.
          </p>
        </div>
        <div className="overflow-hidden rounded-[24px] border border-[#d7e5f5] bg-white shadow-[0_12px_30px_rgba(92,130,181,0.08)]">
          <embed
            src={document.documentSrc}
            type="application/pdf"
            aria-label={document.title}
            className="h-[62vh] w-full bg-white"
          />
        </div>
      </div>
    );
  }

  if (document.kind === "flipbook") {
    return (
      <div className="overflow-hidden rounded-[24px] border border-[#d7e5f5] bg-white p-3 shadow-[0_12px_30px_rgba(92,130,181,0.08)]">
        <div className="max-h-[68vh] overflow-auto">
          <ComicFlipbookViewer src={document.documentSrc} title={document.title} />
        </div>
      </div>
    );
  }

  if (document.kind === "video") {
    return (
      <div className="overflow-hidden rounded-[24px] border border-[#d7e5f5] bg-white shadow-[0_12px_30px_rgba(92,130,181,0.08)]">
        <video
          src={document.videoSrc}
          poster={document.posterSrc}
          controls
          playsInline
          className="h-[58vh] w-full bg-black object-contain"
        />
      </div>
    );
  }

  if (document.kind === "image") {
    return (
      <div className="overflow-hidden rounded-[24px] border border-[#d7e5f5] bg-white shadow-[0_12px_30px_rgba(92,130,181,0.08)]">
        <div className="relative h-[58vh] w-full">
          <Image
            src={document.imageSrc}
            alt={document.imageAlt}
            fill
            sizes="100vw"
            className="object-contain bg-white"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[24px] border border-[#efe3ea] bg-[#fffdf9] px-5 py-5 shadow-[0_12px_30px_rgba(92,130,181,0.08)]">
      <h2 className="font-hand text-[22px] leading-none text-[#2f2f35]">
        {document.title}
      </h2>
      <pre className="font-hand mt-5 whitespace-pre-wrap text-[14px] leading-[1.55] text-[#46678c]">
        {document.content}
      </pre>
    </div>
  );
}

function MobileShortcutContent({
  shortcutId,
  activeDocumentId,
  onOpenDocument,
  onBackToFolder,
  pageIndex,
  onPageChange,
}: {
  shortcutId: string | null;
  activeDocumentId: string | null;
  onOpenDocument: (documentId: string) => void;
  onBackToFolder: () => void;
  pageIndex: number;
  onPageChange: (page: number) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerRef.current) {
      return;
    }

    scrollerRef.current.scrollTo({
      left: pageIndex * scrollerRef.current.clientWidth,
      behavior: "smooth",
    });
  }, [pageIndex]);

  if (!shortcutId) {
    return null;
  }

  const content = shortcutWindowContents[shortcutId];

  if (!content) {
    return null;
  }

  if (activeDocumentId) {
    const document = shortcutDocuments[activeDocumentId] ?? null;

    if (!document) {
      return null;
    }

    return (
      <div className="space-y-3">
        <button
          type="button"
          onClick={onBackToFolder}
          className="font-hand inline-flex items-center gap-2 rounded-full border border-white/75 bg-white/70 px-4 py-2 text-[12px] text-[#1c5ca7] shadow-[0_8px_18px_rgba(75,113,166,0.14)]"
        >
          <span>←</span>
          <span>Back To Files</span>
        </button>

        <MobileShortcutDocumentView document={document} />
      </div>
    );
  }

  const pages = chunkIntoPages(content.items, 6);

  return (
    <div className="space-y-3">
      <div className="rounded-[28px] border border-[#d7e5f5] bg-white px-4 py-4 shadow-[0_12px_30px_rgba(92,130,181,0.08)]">
        <div className="flex items-center justify-between gap-3">
          <p className="font-hand text-[12px] uppercase tracking-[0.14em] text-[#2c649c]">
            files
          </p>
          <PageDots pageCount={pages.length} currentPage={pageIndex} />
        </div>

        <div
          ref={scrollerRef}
          onScroll={(event) => {
            const target = event.currentTarget;
            const nextPage = Math.round(target.scrollLeft / target.clientWidth);
            onPageChange(nextPage);
          }}
          className="mt-4 flex snap-x snap-mandatory gap-0 overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
        >
          {pages.map((page, index) => (
            <div key={index} className="min-w-full snap-start">
              <div className="grid grid-cols-3 gap-x-3 gap-y-5">
                {page.map((item: ShortcutWindowItem) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => item.documentId && onOpenDocument(item.documentId)}
                    className="font-hand flex flex-col items-center gap-1 text-center text-[11px] leading-4 text-black"
                  >
                    <ShortcutItemIcon kind={item.kind} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {pages.length > 1 ? (
        <p className="font-hand text-center text-[11px] uppercase tracking-[0.12em] text-[#6f97c3]">
          swipe to the next screen
        </p>
      ) : null}
    </div>
  );
}

export default function MobileOsShell({
  activeAppId,
  activeShortcutId,
  isMusicPlaying,
  onOpenApp,
  onOpenShortcut,
  onCloseApp,
  onToggleMusic,
}: MobileOsShellProps) {
  const homeScrollerRef = useRef<HTMLDivElement>(null);
  const headerPullStartRef = useRef<number | null>(null);
  const [now, setNow] = useState(() => new Date());
  const [isNoticeVisible, setIsNoticeVisible] = useState(true);
  const [isTodoVisible, setIsTodoVisible] = useState(true);
  const [homePageIndex, setHomePageIndex] = useState(0);
  const [folderPageIndex, setFolderPageIndex] = useState(0);
  const [musicTrayOpen, setMusicTrayOpen] = useState(false);
  const [headerPullOffset, setHeaderPullOffset] = useState(0);
  const [activeShortcutDocumentId, setActiveShortcutDocumentId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!homeScrollerRef.current) {
      return;
    }

    homeScrollerRef.current.scrollTo({
      left: homePageIndex * homeScrollerRef.current.clientWidth,
      behavior: "smooth",
    });
  }, [homePageIndex]);

  const allTiles: MobileTile[] = desktopShortcuts
    .filter((shortcut) => shortcut.kind !== "trash")
    .map((shortcut) => ({
      id: shortcut.id,
      label: shortcut.label,
      iconSrc: iconForShortcutKind(shortcut.kind),
      type: "shortcut" as const,
      shortcutId: shortcut.id,
    }));

  const appPages = chunkIntoPages(allTiles, 6);
  const mobilePageCount = 1 + appPages.length;
  const currentShortcutDocument = activeShortcutDocumentId
    ? shortcutDocuments[activeShortcutDocumentId] ?? null
    : null;

  const appTitle =
    activeAppId === "about"
      ? "About Me"
      : activeAppId === "projects"
        ? "Projects"
        : activeAppId === "links"
          ? "Links"
          : activeAppId === "contact"
            ? "Mail"
            : activeAppId === "shortcut" && currentShortcutDocument
              ? currentShortcutDocument.title
              : activeAppId === "shortcut" && activeShortcutId
                ? shortcutWindowContents[activeShortcutId]?.title ?? "Files"
                : "";

  function handleOpenMobileApp(id: string) {
    setActiveShortcutDocumentId(null);
    setFolderPageIndex(0);
    onOpenApp(id);
  }

  function handleOpenMobileShortcut(id: string) {
    setActiveShortcutDocumentId(null);
    setFolderPageIndex(0);
    onOpenShortcut(id);
  }

  function handleCloseMobileApp() {
    setActiveShortcutDocumentId(null);
    setFolderPageIndex(0);
    onCloseApp();
  }

  function startHeaderPull(clientY: number) {
    headerPullStartRef.current = clientY;
  }

  function updateHeaderPull(clientY: number) {
    if (headerPullStartRef.current === null) {
      return;
    }

    const delta = Math.max(0, clientY - headerPullStartRef.current);
    setHeaderPullOffset(Math.min(delta, 88));
  }

  function finishHeaderPull() {
    if (headerPullStartRef.current === null) {
      return;
    }

    if (headerPullOffset > 32) {
      setMusicTrayOpen(true);
    }

    headerPullStartRef.current = null;
    setHeaderPullOffset(0);
  }

  function handleHeaderPointerDown(
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    startHeaderPull(event.clientY);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  function handleHeaderPointerMove(
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    updateHeaderPull(event.clientY);
  }

  function handleHeaderTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];

    if (!touch) {
      return;
    }

    startHeaderPull(touch.clientY);
  }

  function handleHeaderTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];

    if (!touch) {
      return;
    }

    updateHeaderPull(touch.clientY);

    if (headerPullStartRef.current !== null) {
      event.preventDefault();
    }
  }

  function handleHeaderTouchEnd() {
    finishHeaderPull();
  }

  const trayRevealOffset = musicTrayOpen ? 136 : headerPullOffset;
  const isTrayVisible = musicTrayOpen || headerPullOffset > 0;

  function renderActiveApp() {
    if (activeAppId === "about") {
      return <MobileAboutContent />;
    }

    if (activeAppId === "projects") {
      return (
        <div className="overflow-hidden rounded-[28px] border border-[#d7e5f5] bg-white shadow-[0_12px_30px_rgba(92,130,181,0.08)]">
          <ProjectsContent />
        </div>
      );
    }

    if (activeAppId === "links") {
      return (
        <div className="overflow-hidden rounded-[28px] border border-[#d7e5f5] bg-white shadow-[0_12px_30px_rgba(92,130,181,0.08)]">
          <LinksContent />
        </div>
      );
    }

    if (activeAppId === "contact") {
      return (
        <div className="overflow-hidden rounded-[28px] border border-[#d7e5f5] bg-white shadow-[0_12px_30px_rgba(92,130,181,0.08)]">
          <ContactContent />
        </div>
      );
    }

    if (activeAppId === "shortcut") {
      return (
        <MobileShortcutContent
          shortcutId={activeShortcutId}
          activeDocumentId={activeShortcutDocumentId}
          onOpenDocument={setActiveShortcutDocumentId}
          onBackToFolder={() => setActiveShortcutDocumentId(null)}
          pageIndex={folderPageIndex}
          onPageChange={setFolderPageIndex}
        />
      );
    }

    return null;
  }

  function renderDock() {
    return (
      <div className="mt-auto px-3">
        <div className="rounded-[28px] border border-white/70 bg-white/55 px-4 py-3 shadow-[0_16px_40px_rgba(75,113,166,0.14)] backdrop-blur-xl">
          <div className="grid grid-cols-4 gap-3">
            {dockItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleOpenMobileApp(item.id)}
                className="flex items-center justify-center rounded-[18px] bg-white/70 py-3 shadow-[0_8px_18px_rgba(75,113,166,0.12)]"
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  width={30}
                  height={30}
                  className="h-[28px] w-[28px] object-contain"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative h-dvh overflow-hidden bg-[#eaf4ff] lg:hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(196,225,255,0.75)_38%,_rgba(152,197,247,0.85)_100%)]" />
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(84,140,202,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(84,140,202,0.12)_1px,transparent_1px)] [background-size:36px_36px]" />
      <div className="pointer-events-none absolute -left-8 top-20 h-28 w-28 rounded-full bg-[radial-gradient(circle,_rgba(255,196,224,0.55),_rgba(255,196,224,0)_72%)] blur-xl" />
      <div className="pointer-events-none absolute right-[-14px] top-32 h-24 w-24 rounded-full bg-[radial-gradient(circle,_rgba(134,197,255,0.52),_rgba(134,197,255,0)_72%)] blur-xl" />
      <div className="pointer-events-none absolute bottom-28 left-3 h-16 w-16 rotate-[18deg] rounded-[20px] border border-white/45 bg-white/18 shadow-[0_10px_24px_rgba(75,113,166,0.08)] backdrop-blur-sm" />
      <div className="pointer-events-none absolute bottom-40 right-4 h-10 w-10 rounded-full border border-white/45 bg-white/18 shadow-[0_10px_24px_rgba(75,113,166,0.08)] backdrop-blur-sm" />

      <div className="relative z-10 flex h-full flex-col px-4 pb-6 pt-3">
        <div className="flex items-center justify-between text-[11px] text-[#1f4f80]">
          <div className="font-hand">{formatTime(now)}</div>
          <div className="flex items-center gap-1.5">
            <Image
              src="/icons/wifi-icon.svg"
              alt=""
              width={12}
              height={12}
              className="h-[10px] w-[10px]"
            />
            <Image
              src="/icons/whatsapp-icon.png"
              alt=""
              width={14}
              height={14}
              className="h-[11px] w-[11px] object-contain"
            />
            <Image
              src="/icons/battery-icon.png"
              alt=""
              width={20}
              height={9}
              className="h-[8px] w-[18px] object-contain"
            />
          </div>
        </div>

        <div
          className="mt-2 flex touch-none select-none items-center justify-between gap-3 overflow-hidden rounded-full border border-[#76afe8] bg-[#84b2df] px-3 py-2 text-[10px] text-[#24588f] shadow-[0_10px_24px_rgba(84,140,202,0.18)]"
          onPointerDown={handleHeaderPointerDown}
          onPointerMove={handleHeaderPointerMove}
          onPointerUp={finishHeaderPull}
          onPointerCancel={finishHeaderPull}
          onTouchStart={handleHeaderTouchStart}
          onTouchMove={handleHeaderTouchMove}
          onTouchEnd={handleHeaderTouchEnd}
        >
          <div className="flex min-w-0 items-center gap-3 overflow-x-auto whitespace-nowrap">
            <div className="flex shrink-0 items-center gap-1.5">
              <Image
                src="/icons/crown-icon.svg"
                alt=""
                width={16}
                height={16}
                className="h-[13px] w-[13px]"
              />
              <span className="font-hand text-white">
                Princess&apos;s Portfolio
              </span>
            </div>
            <button
              type="button"
              onClick={() => onOpenApp("contact")}
              className="font-hand shrink-0"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={() => handleOpenMobileShortcut("resume")}
              className="font-hand shrink-0"
            >
              Resume
            </button>
          </div>

          <span className="font-hand shrink-0 whitespace-nowrap text-[9px] text-[#f5fbff]">
            {formatDate(now)}
          </span>
        </div>

        {!musicTrayOpen ? (
          <div className="mt-1 flex justify-center">
            <button
              type="button"
              onClick={() => setMusicTrayOpen(true)}
              className="font-hand rounded-full bg-white/45 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-[#5b84b3] shadow-[0_8px_18px_rgba(75,113,166,0.1)] backdrop-blur"
            >
              slide down for music
            </button>
          </div>
        ) : null}

        <div
          className={`overflow-hidden transition-[max-height,opacity,margin,transform] duration-300 ${
            isTrayVisible ? "mt-3 opacity-100" : "mt-0 opacity-0"
          }`}
          style={{
            maxHeight: `${trayRevealOffset}px`,
            transform: `translateY(${isTrayVisible ? 0 : -10}px)`,
          }}
        >
          <div className="rounded-[24px] border border-white/75 bg-white/72 px-4 py-3 shadow-[0_16px_40px_rgba(75,113,166,0.16)] backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-[16px] bg-[#fff1f9] shadow-[0_8px_18px_rgba(226,136,192,0.14)] ${
                  isMusicPlaying ? "desktop-music-button-playing" : ""
                }`}
              >
                <Image
                  src="/icons/music-icon.png"
                  alt=""
                  width={26}
                  height={36}
                  className={`h-8 w-6 object-contain ${
                    isMusicPlaying ? "desktop-music-icon-playing" : ""
                  }`}
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-hand text-[12px] uppercase tracking-[0.14em] text-[#2c649c]">
                  play music
                </p>
                <p className="font-ui mt-1 text-[12px] leading-5 text-[#5f7ba1]">
                  {isMusicPlaying
                    ? "bgm is on. the soundtrack is playing."
                    : "pull down for a tiny surprise and tap to start the bgm."}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    void onToggleMusic();
                  }}
                  className="font-hand rounded-full border border-[#bfd5ef] bg-[#f7fbff] px-3 py-2 text-[11px] text-[#1c5ca7]"
                >
                  {isMusicPlaying ? "pause" : "play"}
                </button>
                <button
                  type="button"
                  onClick={() => setMusicTrayOpen(false)}
                  className="font-hand rounded-full bg-[#eef6ff] px-2.5 py-2 text-[10px] text-[#4672a0]"
                >
                  hide
                </button>
              </div>
            </div>
          </div>
        </div>

        {activeAppId ? (
          <>
            <div className="mt-3 flex min-h-0 flex-1 flex-col rounded-[34px] border border-white/60 bg-white/55 p-3 shadow-[0_20px_50px_rgba(59,97,154,0.18)] backdrop-blur-xl">
              <div className="mb-3 flex items-center justify-between gap-2 px-1">
                <button
                  type="button"
                  onClick={handleCloseMobileApp}
                  data-ui-sound="bong"
                  className="font-hand rounded-full bg-white px-3 py-1 text-[12px] text-[#1c5ca7] shadow-[0_8px_18px_rgba(75,113,166,0.14)]"
                >
                  Home
                </button>
                <p className="font-hand truncate text-[15px] text-[#1c5ca7]">
                  {appTitle}
                </p>
                <span className="font-hand shrink-0 text-[11px] text-[#7aa4d4]">
                  {formatDate(now)}
                </span>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto pb-2">
                {renderActiveApp()}
              </div>
            </div>
            <div className="pt-4">{renderDock()}</div>
          </>
        ) : (
          <>
            <div className="pt-6 text-center">
              <p className="font-hand text-[13px] uppercase tracking-[0.22em] text-[#3a6b9d]">
                Princess&apos;s Phone
              </p>
              <h1 className="font-serif mt-2 text-[40px] leading-none text-[#204f80]">
                {formatTime(now)}
              </h1>
              <p className="font-ui mt-1 text-sm text-[#4c6e92]">
                {formatDate(now)}
              </p>
            </div>

            <div className="mt-5 flex min-h-0 flex-1 flex-col">
              <div
                ref={homeScrollerRef}
                onScroll={(event) => {
                  const target = event.currentTarget;
                  const nextPage = Math.round(target.scrollLeft / target.clientWidth);
                  setHomePageIndex(nextPage);
                }}
                className="flex flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
              >
                <div className="min-w-full snap-start px-1">
                  <div className="flex h-full flex-col overflow-hidden rounded-[32px] border border-white/65 bg-white/28 px-1 py-1 shadow-[0_16px_40px_rgba(75,113,166,0.1)] backdrop-blur-sm">
                    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-1 pb-2 pt-1">
                      {isNoticeVisible ? (
                        <div className="rounded-[24px] border border-white/70 bg-white/72 px-4 py-4 shadow-[0_16px_40px_rgba(75,113,166,0.16)] backdrop-blur-xl">
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-[14px] bg-[#fff1f9]">
                              <Image
                                src="/icons/about-me-icon.svg"
                                alt=""
                                width={20}
                                height={20}
                                className="h-5 w-5 object-contain"
                              />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-3">
                                <p className="font-hand text-[12px] uppercase tracking-[0.14em] text-[#2c649c]">
                                  mobile notice
                                </p>
                                <button
                                  type="button"
                                  onClick={() => setIsNoticeVisible(false)}
                                  className="font-hand rounded-full bg-[#eef6ff] px-2.5 py-1 text-[10px] text-[#4672a0]"
                                >
                                  close
                                </button>
                              </div>
                              <p className="font-hand mt-2 text-[13px] leading-5 text-[#2f5078]">
                                hey, this site is way better on desktop. the mobile
                                view is still in the works since i coded this in one
                                night, but i still wanted it to feel playful and usable.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {isTodoVisible ? (
                        <div className="rounded-[28px] border border-white/70 bg-white/50 px-4 py-4 shadow-[0_16px_40px_rgba(75,113,166,0.14)] backdrop-blur-xl">
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-hand text-[12px] uppercase tracking-[0.16em] text-[#2c649c]">
                              to do
                            </p>
                            <button
                              type="button"
                              onClick={() => setIsTodoVisible(false)}
                              className="font-hand rounded-full bg-[#eef6ff] px-2.5 py-1 text-[10px] text-[#4672a0]"
                            >
                              close
                            </button>
                          </div>
                          <div className="font-hand mt-3 space-y-1 text-[14px] leading-5 text-[#2f5078]">
                            {noteItems.slice(0, 4).map((item) => (
                              <p key={item}>• {item}</p>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsTodoVisible(true)}
                          className="font-hand w-full rounded-[22px] border border-dashed border-white/75 bg-white/35 px-4 py-3 text-[12px] uppercase tracking-[0.14em] text-[#5b84b3] shadow-[0_8px_18px_rgba(75,113,166,0.08)] backdrop-blur"
                        >
                          show to do list
                        </button>
                      )}

                      <div className="rounded-[24px] border border-white/70 bg-white/40 px-4 py-4 text-center shadow-[0_16px_40px_rgba(75,113,166,0.1)] backdrop-blur-xl">
                        <p className="font-hand text-[11px] uppercase tracking-[0.18em] text-[#6f97c3]">
                          swipe for apps
                        </p>
                        <p className="font-ui mt-2 text-[12px] leading-5 text-[#4c6e92]">
                          more folders live on the next screen!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {appPages.map((page, index) => (
                  <div key={index} className="min-w-full snap-start px-1">
                    <div className="flex h-full flex-col rounded-[32px] border border-white/65 bg-white/28 px-4 py-5 shadow-[0_16px_40px_rgba(75,113,166,0.1)] backdrop-blur-sm">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <p className="font-hand text-[11px] uppercase tracking-[0.18em] text-[#6f97c3]">
                          app screen {index + 1}
                        </p>
                        <p className="font-hand text-[10px] uppercase tracking-[0.14em] text-[#8db2da]">
                          swipe
                        </p>
                      </div>

                      <div className="grid flex-1 grid-cols-3 content-start gap-x-3 gap-y-5">
                        {page.map((tile) => (
                          <button
                            key={tile.id}
                            type="button"
                            onClick={() =>
                              tile.shortcutId &&
                              handleOpenMobileShortcut(tile.shortcutId)
                            }
                            className="font-hand flex flex-col items-center gap-2 text-center text-[12px] text-[#17375e]"
                          >
                            <span className="grid h-[66px] w-[66px] place-items-center rounded-[20px] bg-white/70 shadow-[0_12px_30px_rgba(75,113,166,0.14)] backdrop-blur">
                              <Image
                                src={tile.iconSrc}
                                alt=""
                                width={44}
                                height={44}
                                className="h-11 w-11 object-contain"
                              />
                            </span>
                            <span className="leading-4">{tile.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                <PageDots
                  pageCount={mobilePageCount}
                  currentPage={homePageIndex}
                />
                {mobilePageCount > 1 ? (
                  <p className="font-hand text-center text-[11px] uppercase tracking-[0.12em] text-[#6f97c3]">
                    swipe to another app screen
                  </p>
                ) : null}
              </div>
            </div>

            {renderDock()}
          </>
        )}
      </div>
    </section>
  );
}
