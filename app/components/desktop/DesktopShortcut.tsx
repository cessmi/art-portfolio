import Image from "next/image";
import type { ShortcutKind } from "./types";

type DesktopShortcutProps = {
  kind: ShortcutKind;
  label: string;
  style: React.CSSProperties;
  isDragging?: boolean;
  onPointerDown: React.PointerEventHandler<HTMLButtonElement>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function ShortcutIcon({ kind }: { kind: ShortcutKind }) {
  if (kind === "file") {
    return (
      <Image
        src="/icons/newspaper.svg"
        alt=""
        width={45}
        height={45}
        className="h-[46px] w-[46px] drop-shadow-[0_5px_8px_rgba(61,92,132,0.14)]"
      />
    );
  }

  if (kind === "trash") {
    return (
      <Image
        src="/icons/trash-icon.svg"
        alt=""
        width={53}
        height={53}
        className="h-[52px] w-[52px] drop-shadow-[0_5px_8px_rgba(61,92,132,0.14)]"
      />
    );
  }

  return (
    <Image
      src="/icons/folder.svg"
      alt=""
      width={56}
      height={56}
      className="h-[56px] w-[56px] drop-shadow-[0_5px_8px_rgba(61,92,132,0.14)]"
    />
  );
}

export default function DesktopShortcut({
  kind,
  label,
  style,
  isDragging = false,
  onPointerDown,
  onClick,
}: DesktopShortcutProps) {
  return (
    <button
      type="button"
      onPointerDown={onPointerDown}
      onClick={onClick}
      className={`desktop-shortcut font-hand absolute z-20 hidden w-[104px] cursor-grab touch-none select-none flex-col items-center gap-1.5 text-center text-[12px] leading-[1.15] text-black lg:flex ${
        isDragging ? "cursor-grabbing" : ""
      }`}
      style={style}
      aria-label={label}
    >
      <ShortcutIcon kind={kind} />
      <span className="max-w-full rounded-[4px] border border-white/60 bg-white/55 px-1.5 py-0.5 shadow-[0_2px_6px_rgba(61,92,132,0.08)] backdrop-blur-[2px]">
        {label}
      </span>
    </button>
  );
}
