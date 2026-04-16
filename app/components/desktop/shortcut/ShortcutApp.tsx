import Image from "next/image";
import DesktopWindow from "../DesktopWindow";
import {
  desktopShortcuts,
  shortcutTextDocuments,
  shortcutWindowContents,
  shortcutWindowDefinitions,
} from "../data";
import type {
  DesktopWindowUiState,
  Position,
  ShortcutKind,
  ShortcutWindowItem,
} from "../types";

type ShortcutAppProps = {
  activeShortcutId: string | null;
  activeShortcutTextDocumentId: string | null;
  positions: Record<string, Position>;
  sizes: Record<string, { width: number; height: number }>;
  order: string[];
  windowStates: Record<string, DesktopWindowUiState>;
  draggingWindowId: string | null;
  onOpenTextDocument: (documentId: string) => void;
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
  onOpenTextDocument,
}: {
  item: ShortcutWindowItem;
  onOpenTextDocument: (documentId: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        if (item.kind === "file" && item.documentId) {
          onOpenTextDocument(item.documentId);
        }
      }}
      className="font-hand flex w-[96px] flex-col items-center gap-1 text-center text-[11px] leading-5 text-black transition hover:-translate-y-0.5"
    >
      <ShortcutItemIcon kind={item.kind} />
      <span>{item.label}</span>
    </button>
  );
}

export default function ShortcutApp({
  activeShortcutId,
  activeShortcutTextDocumentId,
  positions,
  sizes,
  order,
  windowStates,
  draggingWindowId,
  onOpenTextDocument,
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
  const activeTextDocument = activeShortcutTextDocumentId
    ? shortcutTextDocuments[activeShortcutTextDocumentId] ?? null
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
                onOpenTextDocument={onOpenTextDocument}
              />
            ))}
          </div>
        </div>
      </DesktopWindow>

      {activeTextDocument && textState.isOpen && !textState.isMinimized ? (
        <DesktopWindow
          title={activeTextDocument.title}
          theme={textWindowDef.theme}
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
                  left: "16%",
                  top: "14%",
                  width: "54%",
                  height: "46%",
                }
              : {
                  left: `${textPosition.x}%`,
                  top: `${textPosition.y}%`,
                  width: `${textSize.width}%`,
                  height: `${textSize.height}%`,
                }
          }
        >
          <div className="h-full overflow-y-auto bg-[#fffaf6] px-5 py-5">
            <article className="mx-auto max-w-[25rem]">
              <h2 className="font-hand mb-7 text-[23px] leading-none text-black">
                so about ide.a
              </h2>
              <pre className="font-hand whitespace-pre-wrap text-[13px] leading-[1.55] tracking-[0.01em] text-black">
                {activeTextDocument.content.replace(/^so about ide\.a\n\n/, "")}
              </pre>
            </article>
          </div>
        </DesktopWindow>
      ) : null}
    </>
  );
}
