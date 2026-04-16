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
        className="h-[44px] w-[44px]"
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
        className="h-[50px] w-[50px]"
      />
    );
  }

  return (
    <Image
      src="/icons/folder.svg"
      alt=""
      width={56}
      height={56}
      className="h-[54px] w-[54px]"
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
      className={`desktop-shortcut font-hand absolute z-10 hidden w-[110px] cursor-grab touch-none select-none flex-col items-center gap-1.5 text-center text-[12px] leading-5 text-black lg:flex ${
        isDragging ? "cursor-grabbing" : ""
      }`}
      style={style}
      aria-label={label}
    >
      <ShortcutIcon kind={kind} />
      <span>{label}</span>
    </button>
  );
}
