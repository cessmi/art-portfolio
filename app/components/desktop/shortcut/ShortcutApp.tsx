import Image from "next/image";
import DesktopWindow from "../DesktopWindow";
import ComicFlipbookViewer from "../projects/ComicFlipbookViewer";
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

function TrashWarningContent() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 overflow-hidden bg-white px-8 py-10 text-center">
      <div className="relative h-[min(46vh,340px)] w-[min(40vw,360px)] min-h-[220px] min-w-[220px]">
        <Image
          src="/images/shortcut/cesstarfish.svg"
          alt="Cess starfish"
          fill
          sizes="(max-width: 1024px) 45vw, 360px"
          className="object-contain"
        />
      </div>

      <div className="max-w-[720px]">
        <p className="font-hand text-[clamp(1rem,1.45vw,1.4rem)] leading-[1.55] text-black">
          this is still a work in progress unfortunately. you caught the
          cesstarfish too early...
        </p>
      </div>
    </div>
  );
}

function BelenFolderContent({
  items,
  onOpenDocument,
}: {
  items: ShortcutWindowItem[];
  onOpenDocument: (documentId: string) => void;
}) {
  const noteItem =
    items.find((item) => shortcutDocuments[item.documentId ?? ""]?.kind === "text") ??
    null;
  const imageItems = items.filter(
    (item) => shortcutDocuments[item.documentId ?? ""]?.kind === "image",
  );

  return (
    <div className="h-full overflow-auto bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_36%,#fffaf4_100%)] px-6 py-6">
      <div className="mx-auto max-w-[980px]">
        <div className="mb-5 flex flex-col gap-4 rounded-[22px] border border-[#dbe8f6] bg-white/85 px-5 py-4 shadow-[0_14px_34px_rgba(77,110,154,0.1)] backdrop-blur-sm sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-hand text-[12px] uppercase tracking-[0.18em] text-[#7a9dc5]">
              handmade christmas village piece
            </p>
            <h2 className="font-serif mt-2 text-[30px] leading-none text-[#20446f]">
              Belen
            </h2>
            <p className="font-ui mt-2 max-w-[58ch] text-[13px] leading-6 text-[#527197]">
              A little gallery of the making process, the finished installation,
              and the contest night that made this project feel extra special.
            </p>
          </div>

          {noteItem?.documentId ? (
            <button
              type="button"
              onClick={() => onOpenDocument(noteItem.documentId!)}
              className="font-hand inline-flex shrink-0 items-center justify-center rounded-full border border-[#f0b8d6] bg-[#fff4fb] px-4 py-2 text-[12px] text-[#d873b3] transition hover:-translate-y-0.5 hover:bg-[#fff0f8]"
            >
              open story note
            </button>
          ) : null}
        </div>

        <div className="grid auto-rows-[140px] grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {imageItems.map((item, index) => {
            const document =
              item.documentId ? shortcutDocuments[item.documentId] : undefined;

            if (!document || document.kind !== "image") {
              return null;
            }

            const isTall = index === 1 || index === 4 || index === 6;
            const isWide = index === 0 || index === 5;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onOpenDocument(item.documentId!)}
                className={`group relative overflow-hidden rounded-[22px] border border-[#d7e5f5] bg-white text-left shadow-[0_16px_34px_rgba(77,110,154,0.1)] transition hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(77,110,154,0.14)] ${
                  isTall
                    ? "md:row-span-2"
                    : isWide
                      ? "xl:col-span-2"
                      : ""
                }`}
              >
                <div className="absolute inset-0">
                  <Image
                    src={document.imageSrc}
                    alt={document.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,35,57,0.02)_18%,rgba(15,35,57,0.68)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-hand text-[14px] leading-none text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                    {item.label}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
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
      <div className="flex h-full min-h-0 flex-col overflow-auto bg-[#edf5ff] p-3 sm:p-4">
        <div className="mb-3 rounded-[14px] border border-[#d4e4f7] bg-white px-3 py-2">
          <p className="font-hand text-[12px] text-[#1a5ea9]">pdf viewer</p>
          <p className="font-ui text-[11px] text-[#5f7ba1]">
            scroll through the file right here in the portfolio
          </p>
        </div>

        {document.companionText ? (
          <div className="mb-3 rounded-[18px] border border-[#cfe0f4] bg-[linear-gradient(135deg,#ffffff_0%,#f5f9ff_100%)] p-4 shadow-[0_12px_28px_rgba(98,137,190,0.12)]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-[62ch]">
                <p className="font-hand text-[12px] uppercase tracking-[0.14em] text-[#6d93bf]">
                  {document.companionTitle ?? "note"}
                </p>
                <p className="font-ui mt-2 text-[13px] leading-6 text-[#32527a]">
                  {document.companionText}
                </p>
              </div>
              {document.companionHref ? (
                <a
                  href={document.companionHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-hand inline-flex shrink-0 items-center justify-center rounded-full border border-[#9ec0e7] bg-white px-4 py-2 text-[12px] text-[#1a5ea9] transition hover:-translate-y-0.5 hover:bg-[#f8fbff]"
                >
                  {document.companionLabel ?? "open link"}
                </a>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="min-h-0 flex-1 overflow-auto rounded-[14px] border border-[#d4e4f7] bg-white">
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

  if (document.kind === "flipbook") {
    return (
      <div className="h-full overflow-auto bg-[#edf5ff] p-3 sm:p-4">
        <ComicFlipbookViewer src={document.documentSrc} title={title} />
      </div>
    );
  }

  if (document.kind === "video") {
    return (
      <div className="h-full overflow-auto bg-[#edf5ff] p-3 sm:p-4">
        <div className="flex h-full min-h-[320px] min-w-[420px] flex-col overflow-hidden rounded-[18px] border border-[#d4e4f7] bg-white shadow-[0_16px_35px_rgba(40,64,99,0.12)]">
          <div className="border-b border-[#d4e4f7] bg-white px-4 py-3">
            <p className="font-hand text-[12px] text-[#1a5ea9]">video viewer</p>
            <p className="font-ui text-[11px] text-[#5f7ba1]">
              watch this clip without leaving the portfolio desktop
            </p>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center bg-black p-2">
            <video
              src={document.videoSrc}
              poster={document.posterSrc}
              controls
              playsInline
              className="max-h-full w-full rounded-[12px] bg-black object-contain"
            />
          </div>
        </div>
      </div>
    );
  }

  if (document.kind === "image") {
    return (
      <div className="h-full overflow-auto bg-[#edf5ff] p-3 sm:p-4">
        <div className="h-full min-h-[320px] min-w-[320px] overflow-hidden rounded-[18px] border border-[#d4e4f7] bg-white shadow-[0_16px_35px_rgba(40,64,99,0.12)]">
          <div className="relative h-full w-full min-h-[300px] min-w-[300px]">
            <Image
              src={document.imageSrc}
              alt={document.imageAlt}
              fill
              sizes="(max-width: 1024px) 80vw, 50vw"
              className="object-contain bg-white"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-[#fffaf6] px-5 py-5">
      <article className="mx-auto max-w-[25rem]">
        <h2 className="font-hand mb-7 text-[23px] leading-none text-black">
          {title}
        </h2>
        <pre className="font-hand whitespace-pre-wrap text-[13px] leading-[1.55] tracking-[0.01em] text-black">
          {document.content}
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
  const mainSize = sizes[mainWindowDef.id];
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
  const isTrashWarning = activeShortcutId === "dont-look";
  const isBelenGallery = activeShortcutId === "belen";
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
        isResizable
        animationDelayMs={mainWindowDef.animationDelayMs}
        onTitlePointerDown={(event) => onWindowDragStart(mainWindowDef.id, event)}
        onResizeHandlePointerDown={(event) =>
          onWindowResizeStart(mainWindowDef.id, event)
        }
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
                width: `${mainSize.width}%`,
                height: `${mainSize.height}%`,
              }
        }
      >
        <div className="h-full overflow-hidden bg-white">
          {isTrashWarning ? (
            <TrashWarningContent />
          ) : isBelenGallery ? (
            <BelenFolderContent
              items={shortcutContent.items}
              onOpenDocument={onOpenDocument}
            />
          ) : (
            <div className="h-full overflow-auto px-8 py-8 pb-10">
              <div className="grid min-h-full grid-cols-[repeat(auto-fit,minmax(92px,92px))] gap-x-6 gap-y-4 content-start">
                {shortcutContent.items.map((item) => (
                  <ShortcutWindowItemView
                    key={item.id}
                    item={item}
                    onOpenDocument={onOpenDocument}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </DesktopWindow>

      {activeDocument && textState.isOpen && !textState.isMinimized ? (
        <DesktopWindow
          title={activeDocument.title}
          theme={
            activeDocument.kind === "text" ? textWindowDef.theme : "blue"
          }
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
                  left: activeDocument.kind === "text" ? "16%" : "8%",
                  top: activeDocument.kind === "text" ? "14%" : "8%",
                  width: activeDocument.kind === "text" ? "54%" : "80%",
                  height: activeDocument.kind === "text" ? "46%" : "80%",
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
