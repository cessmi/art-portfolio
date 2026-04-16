import Image from "next/image";
import type { DockItem } from "./types";

type DesktopDockProps = {
  items: readonly DockItem[];
  activeItemId?: string | null;
  onOpenItem: (id: string) => void;
};

const activeIconFilter =
  "brightness(0) saturate(100%) invert(71%) sepia(35%) saturate(1108%) hue-rotate(287deg) brightness(95%) contrast(89%)";

export default function DesktopDock({
  items,
  activeItemId = null,
  onOpenItem,
}: DesktopDockProps) {
  return (
    <div className="absolute bottom-6 left-1/2 z-50 w-[min(calc(100%-2rem),472px)] -translate-x-1/2 rounded-[12px] border-[3px] border-[#1c5ca7] bg-white px-3 py-2">
      <div className="grid grid-cols-4 gap-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onOpenItem(item.id)}
            className={`font-hand flex flex-col items-center justify-center gap-1 rounded-[10px] px-2 py-2 text-center text-[12px] leading-4 transition hover:bg-[#eff6ff] ${
              activeItemId === item.id ? "bg-[#fff1f9] text-[#e08ac0]" : "text-[#1b5caa]"
            }`}
          >
            <Image
              src={item.src}
              alt=""
              width={30}
              height={30}
              className="h-[26px] w-[26px]"
              style={activeItemId === item.id ? { filter: activeIconFilter } : undefined}
            />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
