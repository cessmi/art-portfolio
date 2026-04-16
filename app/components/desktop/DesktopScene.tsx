"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AboutMeApp from "./about/AboutMeApp";
import DesktopDock from "./DesktopDock";
import DesktopHeader from "./DesktopHeader";
import DesktopShortcut from "./DesktopShortcut";
import StickyNote from "./StickyNote";
import {
  allWindowDefinitions,
  aboutWindowDefinitions,
  contactWindowDefinitions,
  desktopShortcuts,
  dockItems,
  linksWindowDefinitions,
  noteItems,
  projectsWindowDefinitions,
  shortcutExternalLinks,
  shortcutWindowDefinitions,
  stickyNotePosition,
} from "./data";
import type { DesktopWindowUiState, Position } from "./types";

type WindowSize = {
  width: number;
  height: number;
};
import ProjectsApp from "./projects/ProjectsApp";
import LinksApp from "./links/LinksApp";
import ContactApp from "./contact/ContactApp";
import ShortcutApp from "./shortcut/ShortcutApp";
import MobileOsShell from "./mobile/MobileOsShell";

type DragState =
  | {
      type: "note";
      offsetX: number;
      offsetY: number;
      width: number;
      height: number;
      pointerStartX: number;
      pointerStartY: number;
    }
  | {
      type: "shortcut";
      id: string;
      offsetX: number;
      offsetY: number;
      width: number;
      height: number;
      pointerStartX: number;
      pointerStartY: number;
    }
  | {
      type: "window";
      id: string;
      offsetX: number;
      offsetY: number;
      width: number;
      height: number;
      pointerStartX: number;
      pointerStartY: number;
    }
  | {
      type: "resize";
      id: string;
      startWidth: number;
      startHeight: number;
      startPosition: Position;
      minWidth: number;
      minHeight: number;
      pointerStartX: number;
      pointerStartY: number;
    };

function buildShortcutState() {
  return Object.fromEntries(
    desktopShortcuts.map((shortcut) => [shortcut.id, shortcut.position]),
  ) as Record<string, Position>;
}

function buildWindowState() {
  return Object.fromEntries(
    allWindowDefinitions.map((windowDef) => [windowDef.id, windowDef.position]),
  ) as Record<string, Position>;
}

function buildWindowSizeState() {
  return Object.fromEntries(
    allWindowDefinitions.map((windowDef) => [windowDef.id, windowDef.size]),
  ) as Record<string, WindowSize>;
}

function buildWindowUiState() {
  return Object.fromEntries(
    allWindowDefinitions.map((windowDef) => [
      windowDef.id,
      {
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
      } satisfies DesktopWindowUiState,
    ]),
  ) as Record<string, DesktopWindowUiState>;
}

export default function DesktopScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<DragState | null>(null);
  const shortcutDragRef = useRef<string | null>(null);
  const bgmAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);
  const bongAudioRef = useRef<HTMLAudioElement | null>(null);
  const aboutWindowUiStateRef =
    useRef<Record<string, DesktopWindowUiState>>(buildWindowUiState());
  const [shortcutPositions, setShortcutPositions] =
    useState<Record<string, Position>>(buildShortcutState);
  const [windowPositions, setWindowPositions] =
    useState<Record<string, Position>>(buildWindowState);
  const [windowSizes, setWindowSizes] =
    useState<Record<string, WindowSize>>(buildWindowSizeState);
  const [windowOrder, setWindowOrder] = useState<string[]>(
    allWindowDefinitions.map((windowDef) => windowDef.id),
  );
  const [windowUiState, setWindowUiState] =
    useState<Record<string, DesktopWindowUiState>>(buildWindowUiState);
  const [notePosition, setNotePosition] = useState<Position>(stickyNotePosition);
  const [dragging, setDragging] = useState<DragState | null>(null);
  const [activeDockItemId, setActiveDockItemId] = useState<string | null>(null);
  const [activeShortcutId, setActiveShortcutId] = useState<string | null>(null);
  const [activeShortcutTextDocumentId, setActiveShortcutTextDocumentId] = useState<
    string | null
  >(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    draggingRef.current = dragging;
  }, [dragging]);

  useEffect(() => {
    aboutWindowUiStateRef.current = windowUiState;
  }, [windowUiState]);

  useEffect(() => {
    const bgm = new Audio("/audio/bgm2.mp3");
    bgm.loop = true;
    bgm.volume = 0.34;
    bgm.preload = "auto";

    const click = new Audio("/audio/click_002.ogg");
    click.volume = 0.35;
    click.preload = "auto";

    const bong = new Audio("/audio/bong_001.ogg");
    bong.volume = 0.45;
    bong.preload = "auto";

    bgmAudioRef.current = bgm;
    clickAudioRef.current = click;
    bongAudioRef.current = bong;

    return () => {
      bgm.pause();
      bgmAudioRef.current = null;
      clickAudioRef.current = null;
      bongAudioRef.current = null;
    };
  }, []);

  function playSound(audio: HTMLAudioElement | null) {
    if (!audio) {
      return;
    }

    audio.currentTime = 0;
    void audio.play().catch(() => {
      // Ignore blocked or interrupted playback attempts.
    });
  }

  function playClickSound() {
    playSound(clickAudioRef.current);
  }

  function playBongSound() {
    playSound(bongAudioRef.current);
  }

  async function toggleMusic() {
    const bgm = bgmAudioRef.current;

    if (!bgm) {
      return;
    }

    if (isMusicPlaying) {
      bgm.pause();
      setIsMusicPlaying(false);
      return;
    }

    try {
      await bgm.play();
      setIsMusicPlaying(true);
    } catch {
      setIsMusicPlaying(false);
    }
  }

  function getDockItemIdForWindow(windowId: string) {
    if (aboutWindowDefinitions.some((windowDef) => windowDef.id === windowId)) {
      return "about";
    }

    if (projectsWindowDefinitions.some((windowDef) => windowDef.id === windowId)) {
      return "projects";
    }

    if (linksWindowDefinitions.some((windowDef) => windowDef.id === windowId)) {
      return "links";
    }

    if (contactWindowDefinitions.some((windowDef) => windowDef.id === windowId)) {
      return "contact";
    }

    if (shortcutWindowDefinitions.some((windowDef) => windowDef.id === windowId)) {
      return null;
    }

    return null;
  }

  function windowDefinitionsForDockItem(id: string) {
    if (id === "about") {
      return aboutWindowDefinitions;
    }

    if (id === "projects") {
      return projectsWindowDefinitions;
    }

    if (id === "links") {
      return linksWindowDefinitions;
    }

    if (id === "contact") {
      return contactWindowDefinitions;
    }

    return [];
  }

  useEffect(() => {
    if (!dragging) {
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      const activeDrag = draggingRef.current;

      if (!activeDrag || !containerRef.current) {
        return;
      }

      const bounds = containerRef.current.getBoundingClientRect();
      if (activeDrag.type === "note") {
        const nextX = Math.min(
          Math.max(event.clientX - bounds.left - activeDrag.offsetX, 0),
          bounds.width - activeDrag.width,
        );
        const nextY = Math.min(
          Math.max(event.clientY - bounds.top - activeDrag.offsetY, 0),
          bounds.height - activeDrag.height,
        );
        const nextPosition = {
          x: (nextX / bounds.width) * 100,
          y: (nextY / bounds.height) * 100,
        };
        setNotePosition(nextPosition);
        return;
      }

      if (activeDrag.type === "window") {
        const nextX = Math.min(
          Math.max(event.clientX - bounds.left - activeDrag.offsetX, 0),
          bounds.width - activeDrag.width,
        );
        const nextY = Math.min(
          Math.max(event.clientY - bounds.top - activeDrag.offsetY, 0),
          bounds.height - activeDrag.height,
        );
        const nextPosition = {
          x: (nextX / bounds.width) * 100,
          y: (nextY / bounds.height) * 100,
        };
        const windowState = aboutWindowUiStateRef.current[activeDrag.id];

        if (!windowState || windowState.isMaximized) {
          return;
        }

        setWindowPositions((current) => ({
          ...current,
          [activeDrag.id]: nextPosition,
        }));
        return;
      }

      if (activeDrag.type === "resize") {
        const windowState = aboutWindowUiStateRef.current[activeDrag.id];

        if (!windowState || windowState.isMaximized) {
          return;
        }

        const deltaWidth =
          ((event.clientX - activeDrag.pointerStartX) / bounds.width) * 100;
        const deltaHeight =
          ((event.clientY - activeDrag.pointerStartY) / bounds.height) * 100;
        const maxWidth = 100 - activeDrag.startPosition.x;
        const maxHeight = 100 - activeDrag.startPosition.y;

        setWindowSizes((current) => ({
          ...current,
          [activeDrag.id]: {
            width: Math.min(
              Math.max(activeDrag.startWidth + deltaWidth, activeDrag.minWidth),
              maxWidth,
            ),
            height: Math.min(
              Math.max(activeDrag.startHeight + deltaHeight, activeDrag.minHeight),
              maxHeight,
            ),
          },
        }));
        return;
      }

      const movedEnough =
        Math.abs(event.clientX - activeDrag.pointerStartX) > 6 ||
        Math.abs(event.clientY - activeDrag.pointerStartY) > 6;

      const nextX = Math.min(
        Math.max(event.clientX - bounds.left - activeDrag.offsetX, 0),
        bounds.width - activeDrag.width,
      );
      const nextY = Math.min(
        Math.max(event.clientY - bounds.top - activeDrag.offsetY, 0),
        bounds.height - activeDrag.height,
      );
      const nextPosition = {
        x: (nextX / bounds.width) * 100,
        y: (nextY / bounds.height) * 100,
      };

      if (movedEnough) {
        shortcutDragRef.current = activeDrag.id;
      }

      setShortcutPositions((current) => ({
        ...current,
        [activeDrag.id]: nextPosition,
      }));
    }

    function handlePointerUp() {
      draggingRef.current = null;
      setDragging(null);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [dragging]);

  function startShortcutDrag(
    id: string,
    event: React.PointerEvent<HTMLButtonElement>,
  ) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    event.preventDefault();
    shortcutDragRef.current = null;

    const bounds = event.currentTarget.getBoundingClientRect();
    setDragging({
      type: "shortcut",
      id,
      offsetX: event.clientX - bounds.left,
      offsetY: event.clientY - bounds.top,
      width: bounds.width,
      height: bounds.height,
      pointerStartX: event.clientX,
      pointerStartY: event.clientY,
    });
  }

  function startNoteDrag(event: React.PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    event.preventDefault();

    const bounds = event.currentTarget.getBoundingClientRect();
    setDragging({
      type: "note",
      offsetX: event.clientX - bounds.left,
      offsetY: event.clientY - bounds.top,
      width: bounds.width,
      height: bounds.height,
      pointerStartX: event.clientX,
      pointerStartY: event.clientY,
    });
  }

  function bringWindowToFront(id: string) {
    setWindowOrder((current) => {
      const next = current.filter((windowId) => windowId !== id);
      next.push(id);
      return next;
    });

    const dockItemId = getDockItemIdForWindow(id);

    if (dockItemId) {
      setActiveDockItemId(dockItemId);
    }
  }

  function startWindowDrag(
    id: string,
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    bringWindowToFront(id);

    if (aboutWindowUiStateRef.current[id]?.isMaximized) {
      return;
    }

    const bounds = event.currentTarget.parentElement?.getBoundingClientRect();

    if (!bounds) {
      return;
    }

    setDragging({
      type: "window",
      id,
      offsetX: event.clientX - bounds.left,
      offsetY: event.clientY - bounds.top,
      width: bounds.width,
      height: bounds.height,
      pointerStartX: event.clientX,
      pointerStartY: event.clientY,
    });
  }

  function startWindowResize(
    id: string,
    event: React.PointerEvent<HTMLButtonElement>,
  ) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    bringWindowToFront(id);

    if (aboutWindowUiStateRef.current[id]?.isMaximized) {
      return;
    }

    const position = windowPositions[id];
    const size = windowSizes[id];

    if (!position || !size) {
      return;
    }

    setDragging({
      type: "resize",
      id,
      startWidth: size.width,
      startHeight: size.height,
      startPosition: position,
      minWidth: 24,
      minHeight: 22,
      pointerStartX: event.clientX,
      pointerStartY: event.clientY,
    });
  }

  function handleOpenShortcut(id: string) {
    if (shortcutDragRef.current === id) {
      shortcutDragRef.current = null;
      return;
    }

    shortcutDragRef.current = null;
    const externalLink = shortcutExternalLinks[id];

    if (externalLink) {
      closeAllWindows();
      window.open(externalLink, "_blank", "noopener,noreferrer");
      return;
    }

    setActiveShortcutId(id);
    setActiveShortcutTextDocumentId(null);
    setActiveDockItemId(null);
    setWindowUiState((current) => {
      const nextState = { ...current };

      for (const windowDef of allWindowDefinitions) {
        nextState[windowDef.id] = {
          ...current[windowDef.id],
          isOpen: false,
          isMinimized: false,
          isMaximized: false,
        };
      }

      nextState["shortcut-main"] = {
        ...current["shortcut-main"],
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
      };

      return nextState;
    });

    bringWindowToFront("shortcut-main");
    draggingRef.current = null;
    setDragging(null);
  }

  function handleOpenDockItem(id: string) {
    const selectedWindows = windowDefinitionsForDockItem(id);

    if (selectedWindows.length === 0) {
      return;
    }

    setActiveDockItemId(id);
    setActiveShortcutId(null);
    setActiveShortcutTextDocumentId(null);
    setWindowUiState((current) => {
      const nextState = { ...current };

      for (const windowDef of allWindowDefinitions) {
        nextState[windowDef.id] = {
          ...current[windowDef.id],
          isOpen: false,
          isMinimized: false,
          isMaximized: false,
        };
      }

      for (const windowDef of selectedWindows) {
        nextState[windowDef.id] = {
          ...current[windowDef.id],
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
        };
      }

      return nextState;
    });

    bringWindowToFront(selectedWindows[0].id);
    draggingRef.current = null;
    setDragging(null);
  }

  function handleWindowClose(id: string) {
    if (id === "shortcut-main") {
      setActiveShortcutId(null);
      setActiveShortcutTextDocumentId(null);
    }

    if (id === "shortcut-text") {
      setActiveShortcutTextDocumentId(null);
    }

    setWindowUiState((current) => ({
      ...current,
      [id]: {
        ...current[id],
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
      },
    }));
  }

  function handleWindowMinimize(id: string) {
    setWindowUiState((current) => ({
      ...current,
      [id]: {
        ...current[id],
        isMinimized: true,
        isMaximized: false,
      },
    }));
    draggingRef.current = null;
    setDragging(null);
  }

  function handleWindowMaximize(id: string) {
    setWindowUiState((current) => ({
      ...current,
      [id]: {
        ...current[id],
        isMaximized: !current[id].isMaximized,
        isMinimized: false,
      },
    }));
    bringWindowToFront(id);
    draggingRef.current = null;
    setDragging(null);
  }

  function closeAllWindows() {
    setWindowUiState((current) => {
      const nextState = { ...current };

      for (const windowDef of allWindowDefinitions) {
        nextState[windowDef.id] = {
          ...current[windowDef.id],
          isOpen: false,
          isMinimized: false,
          isMaximized: false,
        };
      }

      return nextState;
    });
    setActiveDockItemId(null);
    setActiveShortcutId(null);
    setActiveShortcutTextDocumentId(null);
    shortcutDragRef.current = null;
    draggingRef.current = null;
    setDragging(null);
  }

  const hasVisibleAboutWindow =
    aboutWindowDefinitions.some((windowDef) => {
      const state = windowUiState[windowDef.id];
      return state.isOpen && !state.isMinimized;
    });

  const hasVisibleProjectsWindow =
    projectsWindowDefinitions.some((windowDef) => {
      const state = windowUiState[windowDef.id];
      return state.isOpen && !state.isMinimized;
    });

  const hasVisibleLinksWindow =
    linksWindowDefinitions.some((windowDef) => {
      const state = windowUiState[windowDef.id];
      return state.isOpen && !state.isMinimized;
    });

  const hasVisibleContactWindow =
    contactWindowDefinitions.some((windowDef) => {
      const state = windowUiState[windowDef.id];
      return state.isOpen && !state.isMinimized;
    });

  const hasVisibleShortcutWindow =
    shortcutWindowDefinitions.some((windowDef) => {
      const state = windowUiState[windowDef.id];
      return state.isOpen && !state.isMinimized;
    });

  const hasVisibleWindow =
    hasVisibleAboutWindow ||
    hasVisibleProjectsWindow ||
    hasVisibleLinksWindow ||
    hasVisibleContactWindow ||
    hasVisibleShortcutWindow;

  const highlightedDockItemId =
    activeDockItemId === "about" && hasVisibleAboutWindow
      ? "about"
      : activeDockItemId === "projects" && hasVisibleProjectsWindow
        ? "projects"
        : activeDockItemId === "links" && hasVisibleLinksWindow
          ? "links"
          : activeDockItemId === "contact" && hasVisibleContactWindow
            ? "contact"
            : null;

  const activeMobileAppId =
    hasVisibleShortcutWindow && activeShortcutId
      ? "shortcut"
      : activeDockItemId === "about" && hasVisibleAboutWindow
        ? "about"
        : activeDockItemId === "projects" && hasVisibleProjectsWindow
          ? "projects"
          : activeDockItemId === "links" && hasVisibleLinksWindow
            ? "links"
            : activeDockItemId === "contact" && hasVisibleContactWindow
              ? "contact"
              : null;

  function handleOpenShortcutTextDocument(documentId: string) {
    setActiveShortcutTextDocumentId(documentId);
    setWindowUiState((current) => ({
      ...current,
      "shortcut-text": {
        ...current["shortcut-text"],
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
      },
    }));
    bringWindowToFront("shortcut-text");
  }

  function handleDesktopPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!hasVisibleWindow) {
      return;
    }

    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.closest("[data-desktop-window='true']")) {
      return;
    }

    if (target.closest("[data-desktop-keep-open='true']")) {
      return;
    }

    if (!target.closest("button, a")) {
      playBongSound();
    }

    closeAllWindows();
  }

  function handleGlobalClickCapture(event: React.MouseEvent<HTMLElement>) {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const soundTarget = target.closest<HTMLElement>("[data-ui-sound], button, a");

    if (!soundTarget) {
      return;
    }

    if (soundTarget.dataset.uiSound === "none") {
      return;
    }

    if (soundTarget.dataset.uiSound === "bong") {
      playBongSound();
      return;
    }

    if (soundTarget.matches("button, a")) {
      playClickSound();
    }
  }

  return (
    <main className="min-h-screen bg-white" onClickCapture={handleGlobalClickCapture}>
      <MobileOsShell
        activeAppId={activeMobileAppId}
        activeShortcutId={activeShortcutId}
        onOpenApp={handleOpenDockItem}
        onOpenShortcut={handleOpenShortcut}
        onCloseApp={closeAllWindows}
      />

      <section className="desktop-shell relative hidden h-screen min-h-[760px] w-full overflow-hidden bg-[#fcfcfd] lg:block">
        <div className="desktop-grid absolute inset-0" />
        <DesktopHeader />

        <div
          ref={containerRef}
          className="relative h-[calc(100%-28px)] px-4 pb-24 pt-6 sm:px-6 lg:px-8"
          onPointerDown={handleDesktopPointerDown}
        >
          <StickyNote
            items={noteItems}
            isDragging={dragging?.type === "note"}
            onPointerDown={startNoteDrag}
            style={{
              left: `${notePosition.x}%`,
              top: `${notePosition.y}%`,
              transform: "rotate(-4deg)",
            }}
          />

          {desktopShortcuts.map((shortcut) => {
            const position = shortcutPositions[shortcut.id];

            return (
              <DesktopShortcut
                key={shortcut.id}
                kind={shortcut.kind}
                label={shortcut.label}
                isDragging={
                  dragging?.type === "shortcut" && dragging.id === shortcut.id
                }
                onPointerDown={(event) => startShortcutDrag(shortcut.id, event)}
                onClick={() => handleOpenShortcut(shortcut.id)}
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                }}
              />
            );
          })}

          {hasVisibleWindow ? (
            <div className="desktop-overlay-enter pointer-events-none absolute inset-0 z-30 bg-[#284e7c]/10 backdrop-blur-[1.5px]" />
          ) : null}

          <AboutMeApp
            positions={windowPositions}
            order={windowOrder}
            windowStates={windowUiState}
            draggingWindowId={
              dragging?.type === "window" ? dragging.id : null
            }
            onWindowDragStart={startWindowDrag}
            onWindowFocus={bringWindowToFront}
            onWindowClose={handleWindowClose}
            onWindowMinimize={handleWindowMinimize}
            onWindowMaximize={handleWindowMaximize}
          />

          <ProjectsApp
            positions={windowPositions}
            order={windowOrder}
            windowStates={windowUiState}
            draggingWindowId={
              dragging?.type === "window" ? dragging.id : null
            }
            onWindowDragStart={startWindowDrag}
            onWindowFocus={bringWindowToFront}
            onWindowClose={handleWindowClose}
            onWindowMinimize={handleWindowMinimize}
            onWindowMaximize={handleWindowMaximize}
          />

          <LinksApp
            positions={windowPositions}
            order={windowOrder}
            windowStates={windowUiState}
            draggingWindowId={
              dragging?.type === "window" ? dragging.id : null
            }
            onWindowDragStart={startWindowDrag}
            onWindowFocus={bringWindowToFront}
            onWindowClose={handleWindowClose}
            onWindowMinimize={handleWindowMinimize}
            onWindowMaximize={handleWindowMaximize}
          />

          <ContactApp
            positions={windowPositions}
            order={windowOrder}
            windowStates={windowUiState}
            draggingWindowId={
              dragging?.type === "window" ? dragging.id : null
            }
            onWindowDragStart={startWindowDrag}
            onWindowFocus={bringWindowToFront}
            onWindowClose={handleWindowClose}
            onWindowMinimize={handleWindowMinimize}
            onWindowMaximize={handleWindowMaximize}
          />

          <ShortcutApp
            activeShortcutId={activeShortcutId}
            activeShortcutTextDocumentId={activeShortcutTextDocumentId}
            positions={windowPositions}
            sizes={windowSizes}
            order={windowOrder}
            windowStates={windowUiState}
            draggingWindowId={
              dragging?.type === "window" ? dragging.id : null
            }
            onOpenTextDocument={handleOpenShortcutTextDocument}
            onWindowDragStart={startWindowDrag}
            onWindowResizeStart={startWindowResize}
            onWindowFocus={bringWindowToFront}
            onWindowClose={handleWindowClose}
            onWindowMinimize={handleWindowMinimize}
            onWindowMaximize={handleWindowMaximize}
          />

          <div className="absolute left-1/2 top-[50%] z-10 w-full max-w-[560px] -translate-x-1/2 -translate-y-1/2 px-4 text-center">
            <h1 className="font-mono-ui text-[clamp(3.1rem,6.2vw,5.9rem)] leading-[0.94] tracking-[-0.08em] text-black">
              Welcome to my
            </h1>
            <p className="font-ui text-[clamp(5.2rem,10vw,8.35rem)] font-medium leading-[0.8] tracking-[-0.08em] text-[#e08ac0]">
              portfolio
            </p>
          </div>

          <button
            type="button"
            onClick={toggleMusic}
            data-desktop-keep-open="true"
            aria-pressed={isMusicPlaying}
            aria-label={isMusicPlaying ? "Pause background music" : "Play background music"}
            className={`absolute bottom-5 right-5 z-20 rounded-[10px] p-1 transition duration-200 ${
              isMusicPlaying ? "desktop-music-button-playing" : ""
            }`}
          >
            <Image
              src="/icons/music-icon.png"
              alt=""
              width={59}
              height={82}
              className={`h-[58px] w-[42px] object-contain transition duration-200 ${
                isMusicPlaying ? "desktop-music-icon-playing" : "hover:-translate-y-0.5"
              }`}
            />
          </button>

          <DesktopDock
            items={dockItems}
            activeItemId={highlightedDockItemId}
            onOpenItem={handleOpenDockItem}
          />

          <div className="absolute inset-x-4 top-14 z-10 space-y-3 lg:hidden">
            <StickyNote items={noteItems.slice(0, 4)} isMobile />
          </div>
        </div>
      </section>
    </main>
  );
}
