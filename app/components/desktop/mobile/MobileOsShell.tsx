"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  desktopShortcuts,
  dockItems,
  noteItems,
  shortcutWindowContents,
} from "../data";
import ContactContent from "../contact/ContactContent";
import LinksContent from "../links/LinksContent";
import ProjectsContent from "../projects/ProjectsContent";
import type { ShortcutKind } from "../types";
import MobileAboutContent from "./MobileAboutContent";

type MobileOsShellProps = {
  activeAppId: "about" | "projects" | "links" | "contact" | "shortcut" | null;
  activeShortcutId: string | null;
  onOpenApp: (id: string) => void;
  onOpenShortcut: (id: string) => void;
  onCloseApp: () => void;
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

function MobileShortcutContent({ shortcutId }: { shortcutId: string | null }) {
  if (!shortcutId) {
    return null;
  }

  const content = shortcutWindowContents[shortcutId];

  if (!content) {
    return null;
  }

  return (
    <div className="rounded-[28px] border border-[#d7e5f5] bg-white px-5 py-5 shadow-[0_12px_30px_rgba(92,130,181,0.08)]">
      <div className="grid grid-cols-3 gap-x-3 gap-y-5">
        {content.items.map((item) => (
          <button
            key={item.id}
            type="button"
            className="font-hand flex flex-col items-center gap-1 text-center text-[11px] leading-4 text-black"
          >
            <ShortcutItemIcon kind={item.kind} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function MobileOsShell({
  activeAppId,
  activeShortcutId,
  onOpenApp,
  onOpenShortcut,
  onCloseApp,
}: MobileOsShellProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const allTiles: MobileTile[] = desktopShortcuts
    .filter((shortcut) => shortcut.kind !== "trash")
    .map((shortcut) => ({
      id: shortcut.id,
      label: shortcut.label,
      iconSrc: iconForShortcutKind(shortcut.kind),
      type: "shortcut" as const,
      shortcutId: shortcut.id,
    }));

  const appTitle =
    activeAppId === "about"
      ? "About Me"
      : activeAppId === "projects"
        ? "Projects"
        : activeAppId === "links"
          ? "Links"
          : activeAppId === "contact"
            ? "Mail"
            : activeAppId === "shortcut" && activeShortcutId
              ? shortcutWindowContents[activeShortcutId]?.title ?? "Files"
              : "";

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
      return <MobileShortcutContent shortcutId={activeShortcutId} />;
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
                onClick={() => onOpenApp(item.id)}
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

        <div className="mt-2 flex items-center justify-between gap-3 overflow-hidden rounded-full border border-[#76afe8] bg-[#84b2df] px-3 py-2 text-[10px] text-[#24588f] shadow-[0_10px_24px_rgba(84,140,202,0.18)]">
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
              onClick={() => onOpenShortcut("resume")}
              className="font-hand shrink-0"
            >
              Resume
            </button>
          </div>

          <span className="font-hand shrink-0 whitespace-nowrap text-[9px] text-[#f5fbff]">
            {formatDate(now)}
          </span>
        </div>

        {activeAppId ? (
          <>
            <div className="mt-3 flex min-h-0 flex-1 flex-col rounded-[34px] border border-white/60 bg-white/55 p-3 shadow-[0_20px_50px_rgba(59,97,154,0.18)] backdrop-blur-xl">
              <div className="mb-3 flex items-center justify-between px-1">
                <button
                  type="button"
                  onClick={onCloseApp}
                  data-ui-sound="bong"
                  className="font-hand rounded-full bg-white px-3 py-1 text-[12px] text-[#1c5ca7] shadow-[0_8px_18px_rgba(75,113,166,0.14)]"
                >
                  Home
                </button>
                <p className="font-hand text-[15px] text-[#1c5ca7]">{appTitle}</p>
                <span className="font-hand text-[11px] text-[#7aa4d4]">
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

            <div className="mt-5 rounded-[28px] border border-white/70 bg-white/50 px-4 py-4 shadow-[0_16px_40px_rgba(75,113,166,0.14)] backdrop-blur-xl">
              <p className="font-hand text-[12px] uppercase tracking-[0.16em] text-[#2c649c]">
                to do
              </p>
              <div className="font-hand mt-3 space-y-1 text-[14px] leading-5 text-[#2f5078]">
                {noteItems.slice(0, 4).map((item) => (
                  <p key={item}>• {item}</p>
                ))}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-x-3 gap-y-5 px-1">
              {allTiles.map((tile) => (
                <button
                  key={tile.id}
                  type="button"
                  onClick={() => tile.shortcutId && onOpenShortcut(tile.shortcutId)}
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

            <div className="mt-5 rounded-[26px] border border-white/70 bg-white/55 px-4 py-4 shadow-[0_16px_40px_rgba(75,113,166,0.14)] backdrop-blur-xl">
              <p className="font-hand text-[12px] uppercase tracking-[0.16em] text-[#2c649c]">
                heads up
              </p>
              <p className="font-hand mt-2 text-[13px] leading-5 text-[#2f5078]">
                hey, this site is way better on desktop. the mobile view is
                still a little on the works since i coded this in one night.
              </p>
            </div>

            {renderDock()}
          </>
        )}
      </div>
    </section>
  );
}
