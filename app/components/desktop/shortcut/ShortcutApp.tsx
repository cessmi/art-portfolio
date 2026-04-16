import Image from "next/image";
import DesktopWindow from "../DesktopWindow";
import {
  desktopShortcuts,
  shortcutDocuments,
  shortcutWindowContents,
  shortcutWindowDefinitions,
} from "../data";
import type {
  ShortcutDocument,
  DesktopWindowUiState,
  Position,
  ShortcutKind,
  ShortcutWindowItem,
} from "../types";

type ShortcutAppProps = {
  activeShortcutId: string | null;
  activeShortcutDocumentId: string | null;
  positions: Record<string, Position>;
  sizes: Record<string, { width: number; height: number }>;
  order: string[];
  windowStates: Record<string, DesktopWindowUiState>;
  draggingWindowId: string | null;
  onOpenDocument: (documentId: string) => void;
  onWindowDragStart: (
    id: string,
    event: React.PointerEvent<HTMLDivElement>,
  ) => void;
  onWindowResizeStart: (
    id: string,
    event: React.PointerEvent<HTMLButtonElement>,
  ) => void;
  onWindowFocus: (id: string) => void;
  onWindowClose: (id: string) => void;
  onWindowMinimize: (id: string) => void;
  onWindowMaximize: (id: string) => void;
};

function zIndexFor(order: string[], id: string) {
  const index = order.indexOf(id);
  return 40 + (index === -1 ? 0 : index);
}

function ShortcutItemIcon({ kind }: { kind: ShortcutKind }) {
  if (kind === "file") {
    return (
      <Image
        src="/icons/newspaper.svg"
        alt=""
        width={36}
        height={36}
        className="h-9 w-9"
      />
    );
  }

  return (
    <Image
      src="/icons/folder.svg"
      alt=""
      width={44}
      height={44}
      className="h-11 w-11"
    />
  );
}

function ShortcutWindowItemView({
  item,
  onOpenDocument,
}: {
  item: ShortcutWindowItem;
  onOpenDocument: (documentId: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        if (item.kind === "file" && item.documentId) {
          onOpenDocument(item.documentId);
        }
      }}
      className="font-hand flex w-[96px] flex-col items-center gap-1 text-center text-[11px] leading-5 text-black transition hover:-translate-y-0.5"
    >
      <ShortcutItemIcon kind={item.kind} />
      <span>{item.label}</span>
    </button>
  );
}

function ShortcutDocumentView({
  document,
  title,
}: {
  document: ShortcutDocument;
  title: string;
}) {
  if (document.kind === "pdf") {
    return (
      <div className="h-full bg-[#edf5ff] p-3 sm:p-4">
        <div className="mb-3 rounded-[14px] border border-[#d4e4f7] bg-white px-3 py-2">
          <p className="font-hand text-[12px] text-[#1a5ea9]">pdf viewer</p>
          <p className="font-ui text-[11px] text-[#5f7ba1]">
            scroll through the world file right here in the portfolio
          </p>
        </div>

        <div className="overflow-hidden rounded-[14px] border border-[#d4e4f7] bg-white">
          <embed
            src={document.documentSrc}
            type="application/pdf"
            aria-label={title}
            className="h-[68vh] min-h-[420px] w-full bg-white"
          />
          <object
            data={document.documentSrc}
            type="application/pdf"
            aria-label={title}
            className="hidden"
          >
            <div className="flex min-h-[320px] items-center justify-center bg-[#f7fbff] p-6 text-center">
              <div>
                <p className="font-hand text-[14px] text-[#1a5ea9]">
                  this pdf couldn&apos;t render here.
                </p>
                <p className="font-ui mt-2 text-[12px] text-[#5f7ba1]">
                  try another browser if the viewer still refuses to load.
                </p>
              </div>
            </div>
          </object>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-[#fffaf6] px-5 py-5">
      <article className="mx-auto max-w-[25rem]">
        <h2 className="font-hand mb-7 text-[23px] leading-none text-black">
          so about ide.a
        </h2>
        <pre className="font-hand whitespace-pre-wrap text-[13px] leading-[1.55] tracking-[0.01em] text-black">
          {document.content.replace(/^so about ide\.a\n\n/, "")}
        </pre>
      </article>
    </div>
  );
}

export default function ShortcutApp({
  activeShortcutId,
  activeShortcutDocumentId,
  positions,
  sizes,
  order,
  windowStates,
  draggingWindowId,
  onOpenDocument,
  onWindowDragStart,
  onWindowResizeStart,
  onWindowFocus,
  onWindowClose,
  onWindowMinimize,
  onWindowMaximize,
}: ShortcutAppProps) {
  const mainWindowDef = shortcutWindowDefinitions.find(
    (windowDef) => windowDef.id === "shortcut-main",
  )!;
  const textWindowDef = shortcutWindowDefinitions.find(
    (windowDef) => windowDef.id === "shortcut-text",
  )!;
  const mainPosition = positions[mainWindowDef.id];
  const textPosition = positions[textWindowDef.id];
  const textSize = sizes[textWindowDef.id];
  const mainState = windowStates[mainWindowDef.id];
  const textState = windowStates[textWindowDef.id];

  if (!mainState.isOpen || mainState.isMinimized || !activeShortcutId) {
    return null;
  }

  const shortcut =
    desktopShortcuts.find((item) => item.id === activeShortcutId) ?? null;
  const shortcutContent =
    shortcutWindowContents[activeShortcutId] ?? {
      title: shortcut?.label ?? mainWindowDef.title,
      items: [],
    };
  const activeDocument = activeShortcutDocumentId
    ? shortcutDocuments[activeShortcutDocumentId] ?? null
    : null;

  return (
    <>
      <DesktopWindow
        title={shortcutContent.title}
        theme={mainWindowDef.theme}
        zIndex={zIndexFor(order, mainWindowDef.id)}
        isDragging={draggingWindowId === mainWindowDef.id}
        isMaximized={mainState.isMaximized}
        animationDelayMs={mainWindowDef.animationDelayMs}
        onTitlePointerDown={(event) => onWindowDragStart(mainWindowDef.id, event)}
        onFocus={() => onWindowFocus(mainWindowDef.id)}
        onClose={() => onWindowClose(mainWindowDef.id)}
        onMinimize={() => onWindowMinimize(mainWindowDef.id)}
        onMaximize={() => onWindowMaximize(mainWindowDef.id)}
        style={
          mainState.isMaximized
            ? {
                left: "4%",
                top: "6%",
                width: "92%",
                height: "72%",
              }
            : {
                left: `${mainPosition.x}%`,
                top: `${mainPosition.y}%`,
                width: `${mainWindowDef.size.width}%`,
                height: `${mainWindowDef.size.height}%`,
              }
        }
      >
        <div className="h-full bg-white px-8 py-8">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(92px,92px))] gap-x-6 gap-y-4 content-start">
            {shortcutContent.items.map((item) => (
              <ShortcutWindowItemView
                key={item.id}
                item={item}
                onOpenDocument={onOpenDocument}
              />
            ))}
          </div>
        </div>
      </DesktopWindow>

      {activeDocument && textState.isOpen && !textState.isMinimized ? (
        <DesktopWindow
          title={activeDocument.title}
          theme={activeDocument.kind === "pdf" ? "blue" : textWindowDef.theme}
          zIndex={zIndexFor(order, textWindowDef.id)}
          isDragging={draggingWindowId === textWindowDef.id}
          isMaximized={textState.isMaximized}
          isResizable
          animationDelayMs={textWindowDef.animationDelayMs}
          onTitlePointerDown={(event) => onWindowDragStart(textWindowDef.id, event)}
          onResizeHandlePointerDown={(event) =>
            onWindowResizeStart(textWindowDef.id, event)
          }
          onFocus={() => onWindowFocus(textWindowDef.id)}
          onClose={() => onWindowClose(textWindowDef.id)}
          onMinimize={() => onWindowMinimize(textWindowDef.id)}
          onMaximize={() => onWindowMaximize(textWindowDef.id)}
          style={
            textState.isMaximized
              ? {
                  left: activeDocument.kind === "pdf" ? "8%" : "16%",
                  top: activeDocument.kind === "pdf" ? "8%" : "14%",
                  width: activeDocument.kind === "pdf" ? "80%" : "54%",
                  height: activeDocument.kind === "pdf" ? "80%" : "46%",
                }
              : {
                  left: `${textPosition.x}%`,
                  top: `${textPosition.y}%`,
                  width: `${textSize.width}%`,
                  height: `${textSize.height}%`,
                }
          }
        >
          <ShortcutDocumentView
            document={activeDocument}
            title={activeDocument.title}
          />
        </DesktopWindow>
      ) : null}
    </>
  );
}
