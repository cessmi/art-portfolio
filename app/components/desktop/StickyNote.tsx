import Image from "next/image";

type StickyNoteProps = {
  items: readonly string[];
  isMobile?: boolean;
  isDragging?: boolean;
  style?: React.CSSProperties;
  onPointerDown?: React.PointerEventHandler<HTMLButtonElement>;
};

export default function StickyNote({
  items,
  isMobile = false,
  isDragging = false,
  style,
  onPointerDown,
}: StickyNoteProps) {
  const sharedContent = (
    <>
      <Image
        src="/icons/sticky-note.svg"
        alt=""
        fill
        sizes="(max-width: 1024px) 220px, 248px"
        className="object-contain"
      />
      <div
        className={`absolute inset-0 text-[#1c2f4a] ${
          isMobile
            ? "px-10 pt-9 text-[13px] leading-6"
            : "px-[52px] pt-[46px] text-[14px] leading-[1.58]"
        }`}
      >
        <p className={`${isMobile ? "mb-1" : "mb-2 text-[15px]"} font-semibold`}>
          To do:
        </p>
        <ul>
          {items.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <div
        className="desktop-note font-hand relative mx-auto h-[220px] max-w-[220px] text-[13px] leading-6 text-[#1c2f4a]"
        style={{ transform: "rotate(-3deg)" }}
      >
        {sharedContent}
      </div>
    );
  }

  return (
    <button
      type="button"
      onPointerDown={onPointerDown}
      className={`desktop-note font-hand absolute z-10 hidden h-[248px] w-[248px] cursor-grab touch-none select-none text-left lg:block ${
        isDragging ? "cursor-grabbing" : ""
      }`}
      style={style}
      aria-label="Sticky note"
    >
      {sharedContent}
    </button>
  );
}
