"use client";

import dynamic from "next/dynamic";
import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from "react";
import { getDocument } from "pdfjs-dist/webpack.mjs";

type HtmlFlipBookProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  width: number;
  height: number;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  size: "stretch" | "fixed";
  drawShadow?: boolean;
  flippingTime?: number;
  usePortrait?: boolean;
  startZIndex?: number;
  autoSize?: boolean;
  maxShadowOpacity?: number;
  showCover?: boolean;
  mobileScrollSupport?: boolean;
  clickEventForward?: boolean;
  useMouseEvents?: boolean;
  swipeDistance?: number;
  showPageCorners?: boolean;
  onFlip?: (event: { data: number }) => void;
  onInit?: (event: { data?: { page?: number; mode?: "portrait" | "landscape" } }) => void;
  onChangeOrientation?: (event: { data?: "portrait" | "landscape" }) => void;
  ref?: Ref<FlipBookHandle>;
};

const HTMLFlipBook = dynamic(() => import("react-pageflip"), {
  ssr: false,
}) as unknown as (props: HtmlFlipBookProps) => JSX.Element;

type ComicFlipbookViewerProps = {
  src: string;
  title: string;
};

type ComicPageAsset = {
  src: string;
  width: number;
  height: number;
  pageNumber: number;
};

type FlipBookHandle = {
  pageFlip: () => {
    flipNext: (corner?: "top" | "bottom") => void;
    flipPrev: (corner?: "top" | "bottom") => void;
  } | null;
};

const comicPageCache = new Map<string, Promise<ComicPageAsset[]>>();

async function canvasToImageUrl(canvas: HTMLCanvasElement) {
  return await new Promise<string>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Could not render this comic page."));
          return;
        }

        resolve(URL.createObjectURL(blob));
      },
      "image/webp",
      0.9,
    );
  });
}

async function loadComicPages(src: string) {
  const cached = comicPageCache.get(src);

  if (cached) {
    return await cached;
  }

  const promise = (async () => {
    const loadingTask = getDocument(src);
    const pdf = await loadingTask.promise;

    try {
      const pages: ComicPageAsset[] = [];

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = Math.min(1.35, 1100 / baseViewport.width);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d", { alpha: false });

        if (!context) {
          throw new Error("Could not prepare the comic canvas.");
        }

        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        pages.push({
          src: await canvasToImageUrl(canvas),
          width: canvas.width,
          height: canvas.height,
          pageNumber,
        });
      }

      return pages;
    } finally {
      await loadingTask.destroy();
    }
  })();

  comicPageCache.set(src, promise);

  try {
    return await promise;
  } catch (error) {
    comicPageCache.delete(src);
    throw error;
  }
}

const ComicPage = forwardRef<
  HTMLDivElement,
  {
    page: ComicPageAsset;
    totalPages: number;
    isCover: boolean;
  }
>(function ComicPage({ page, totalPages, isCover }, ref) {
  return (
    <div
      ref={ref}
      data-density={isCover ? "hard" : "soft"}
      className="stf__item h-full w-full bg-transparent"
    >
      <div className="flex h-full w-full items-stretch justify-stretch rounded-[18px] bg-[linear-gradient(180deg,#fffdf9_0%,#f8f4ed_100%)] p-3 shadow-[inset_0_0_0_1px_rgba(182,205,232,0.6)] sm:p-4">
        <div className="relative flex h-full w-full overflow-hidden rounded-[14px] border border-[#d4e4f7] bg-[#fffdf9] shadow-[0_16px_35px_rgba(40,64,99,0.12)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={page.src}
            alt={`Comic page ${page.pageNumber} of ${totalPages}`}
            draggable={false}
            className="h-full w-full select-none object-contain"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[#fff8ef] via-[#fff8ef]/92 to-transparent px-4 pb-3 pt-8">
            <span className="font-hand text-[11px] uppercase tracking-[0.18em] text-[#6f8fb3]">
              {isCover ? "cover" : "page"}
            </span>
            <span className="font-hand text-[12px] text-[#1f4d7f]">
              {page.pageNumber} / {totalPages}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function ComicFlipbookViewer({
  src,
  title,
}: ComicFlipbookViewerProps) {
  const bookRef = useRef<FlipBookHandle | null>(null);
  const pageFlipAudioRef = useRef<HTMLAudioElement | null>(null);
  const [pages, setPages] = useState<ComicPageAsset[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [currentPage, setCurrentPage] = useState(0);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "landscape",
  );

  useEffect(() => {
    const audio = new Audio("/audio/page-flip-sfx.mp3");
    audio.preload = "auto";
    audio.volume = 0.35;
    pageFlipAudioRef.current = audio;

    return () => {
      pageFlipAudioRef.current = null;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    void loadComicPages(src)
      .then((nextPages) => {
        if (cancelled) {
          return;
        }

        setPages(nextPages);
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  const firstPage = pages[0];
  const pageRatio = firstPage ? firstPage.height / firstPage.width : 1.414;

  const bookSize = useMemo(() => {
    const width = 360;
    const height = Math.round(width * pageRatio);

    return {
      width,
      height,
      minWidth: 250,
      maxWidth: 420,
      minHeight: Math.round(250 * pageRatio),
      maxHeight: Math.round(420 * pageRatio),
    };
  }, [pageRatio]);

  function playPageFlipSound() {
    const audio = pageFlipAudioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = 0;
    void audio.play().catch(() => {
      // Ignore blocked playback attempts.
    });
  }

  const visiblePageLabel =
    orientation === "portrait"
      ? `${currentPage + 1}`
      : `${Math.min(currentPage + 1, pages.length)}-${Math.min(
          currentPage + 2,
          pages.length,
        )}`;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-[18px] border border-[#cfe0f4] bg-[linear-gradient(135deg,#ffffff_0%,#f5f9ff_100%)] p-4 shadow-[0_12px_28px_rgba(98,137,190,0.12)] sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-[62ch]">
          <p className="font-hand text-[12px] uppercase tracking-[0.14em] text-[#6d93bf]">
            comic reader
          </p>
          <p className="font-ui mt-2 text-[13px] leading-6 text-[#32527a]">
            Flip through <span className="font-hand text-[#1a5ea9]">{title}</span>{" "}
            like a little book. You can drag the corners, click the page, or use
            the buttons below.
          </p>
        </div>

        <div className="font-hand flex shrink-0 items-center gap-2 text-[12px] text-[#1a5ea9]">
          <span className="rounded-full border border-[#bfd5ef] bg-[#f7fbff] px-3 py-1">
            spread {visiblePageLabel}
          </span>
          <span className="rounded-full border border-[#bfd5ef] bg-[#f7fbff] px-3 py-1">
            {pages.length} pages
          </span>
        </div>
      </div>

      <div className="rounded-[18px] border border-[#d4e4f7] bg-[linear-gradient(180deg,#fafdff_0%,#edf5ff_100%)] p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.65)] sm:p-5">
        {status === "loading" ? (
          <div className="flex min-h-[58vh] items-center justify-center rounded-[16px] border border-dashed border-[#bfd5ef] bg-white/70 px-6 text-center">
            <div>
              <p className="font-hand text-[16px] text-[#1a5ea9]">
                rendering comic pages...
              </p>
              <p className="font-ui mt-2 text-[13px] leading-6 text-[#5f7ba1]">
                giving your PDF a book-like glow up for the portfolio.
              </p>
            </div>
          </div>
        ) : null}

        {status === "error" ? (
          <div className="flex min-h-[58vh] items-center justify-center rounded-[16px] border border-dashed border-[#bfd5ef] bg-white/70 px-6 text-center">
            <div>
              <p className="font-hand text-[16px] text-[#1a5ea9]">
                this comic could not load right now.
              </p>
              <p className="font-ui mt-2 text-[13px] leading-6 text-[#5f7ba1]">
                The PDF is there, but the page renderer had a rough moment. Try
                reopening it once more.
              </p>
            </div>
          </div>
        ) : null}

        {status === "ready" && pages.length > 0 ? (
          <div className="space-y-4">
            <div className="mx-auto w-full max-w-[920px]">
              <HTMLFlipBook
                ref={bookRef}
                width={bookSize.width}
                height={bookSize.height}
                minWidth={bookSize.minWidth}
                maxWidth={bookSize.maxWidth}
                minHeight={bookSize.minHeight}
                maxHeight={bookSize.maxHeight}
                size="stretch"
                drawShadow
                flippingTime={900}
                usePortrait
                startZIndex={10}
                autoSize
                maxShadowOpacity={0.24}
                showCover
                mobileScrollSupport={false}
                clickEventForward={false}
                useMouseEvents
                swipeDistance={24}
                showPageCorners
                className="mx-auto"
                style={{ margin: "0 auto" }}
                onFlip={(event: { data: number }) => {
                  setCurrentPage(event.data ?? 0);
                  playPageFlipSound();
                }}
                onInit={(event: {
                  data?: { page?: number; mode?: "portrait" | "landscape" };
                }) => {
                  setCurrentPage(event.data?.page ?? 0);
                  setOrientation(event.data?.mode ?? "landscape");
                }}
                onChangeOrientation={(event: {
                  data?: "portrait" | "landscape";
                }) => {
                  setOrientation(event.data ?? "landscape");
                }}
              >
                {pages.map((page, index) => (
                  <ComicPage
                    key={`${src}-${page.pageNumber}`}
                    page={page}
                    totalPages={pages.length}
                    isCover={index === 0 || index === pages.length - 1}
                  />
                ))}
              </HTMLFlipBook>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-ui text-[13px] leading-6 text-[#5f7ba1]">
                Tip: drag a corner for the full page-turn effect, or use the
                buttons if you just want to browse faster.
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => bookRef.current?.pageFlip()?.flipPrev()}
                  className="font-hand rounded-full border border-[#9ec0e7] bg-white px-4 py-2 text-[12px] text-[#1a5ea9] transition hover:-translate-y-0.5 hover:bg-[#f8fbff]"
                >
                  previous
                </button>
                <button
                  type="button"
                  onClick={() => bookRef.current?.pageFlip()?.flipNext()}
                  className="font-hand rounded-full border border-[#9ec0e7] bg-white px-4 py-2 text-[12px] text-[#1a5ea9] transition hover:-translate-y-0.5 hover:bg-[#f8fbff]"
                >
                  next
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
