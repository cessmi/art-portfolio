import type { CSSProperties, PointerEventHandler, ReactNode } from "react";
import type { DesktopWindowTheme } from "./types";

type DesktopWindowProps = {
  title: string;
  theme: DesktopWindowTheme;
  style: CSSProperties;
  zIndex: number;
  isDragging?: boolean;
  isMaximized?: boolean;
  isResizable?: boolean;
  animationDelayMs?: number;
  onTitlePointerDown: PointerEventHandler<HTMLDivElement>;
  onResizeHandlePointerDown?: PointerEventHandler<HTMLButtonElement>;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  children: ReactNode;
};

export default function DesktopWindow({
  title,
  theme,
  style,
  zIndex,
  isDragging = false,
  isMaximized = false,
  isResizable = false,
  animationDelayMs = 0,
  onTitlePointerDown,
  onResizeHandlePointerDown,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  children,
}: DesktopWindowProps) {
  const isPaper = theme === "paper";

  return (
    <article
      data-desktop-window="true"
      className={`desktop-window-enter absolute overflow-hidden rounded-[14px] border-[3px] shadow-[0_16px_45px_rgba(74,111,154,0.18)] ${
        isPaper
          ? "border-[#e7e0d9] bg-[#fffdf9]"
          : "border-[#6fa6dc] bg-white"
      }`}
      style={{
        ...style,
        zIndex,
        animationDelay: `${animationDelayMs}ms`,
      }}
      onPointerDown={onFocus}
    >
      <div
        className={`flex h-[36px] touch-none items-center justify-between px-4 ${
          isPaper ? "bg-[#fffdf9]" : "bg-[#84b2df]"
        } ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={onTitlePointerDown}
      >
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={`Close ${title}`}
            data-ui-sound="bong"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="h-3 w-3 rounded-full bg-[#ff6156] transition hover:brightness-95"
          />
          <button
            type="button"
            aria-label={`Minimize ${title}`}
            onClick={(event) => {
              event.stopPropagation();
              onMinimize();
            }}
            className="h-3 w-3 rounded-full bg-[#ffc941] transition hover:brightness-95"
          />
          <button
            type="button"
            aria-label={`${isMaximized ? "Restore" : "Maximize"} ${title}`}
            onClick={(event) => {
              event.stopPropagation();
              onMaximize();
            }}
            className="h-3 w-3 rounded-full bg-[#56ca58] transition hover:brightness-95"
          />
        </div>
        <p
          className={`font-hand flex-1 text-center text-[13px] ${
            isPaper ? "text-[#706259]" : "text-white"
          }`}
        >
          {title}
        </p>
        <span className="w-[44px]" />
      </div>
      <div
        className={`h-[calc(100%-36px)] ${
          isPaper ? "bg-[#fffdf9]" : "bg-white"
        }`}
      >
        {children}
      </div>
      {isResizable && !isMaximized ? (
        <button
          type="button"
          aria-label={`Resize ${title}`}
          data-ui-sound="none"
          onPointerDown={onResizeHandlePointerDown}
          className={`absolute bottom-1.5 right-1.5 z-10 h-5 w-5 cursor-se-resize rounded-sm ${
            isPaper ? "bg-[rgba(120,106,92,0.08)]" : "bg-[rgba(111,166,220,0.12)]"
          }`}
        >
          <span
            className={`absolute bottom-[3px] right-[3px] h-[9px] w-[9px] border-b-2 border-r-2 ${
              isPaper ? "border-[#9b8b80]" : "border-[#7eaee1]"
            }`}
          />
        </button>
      ) : null}
    </article>
  );
}
