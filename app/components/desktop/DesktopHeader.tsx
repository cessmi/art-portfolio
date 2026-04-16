"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

function formatDateTime(value: Date) {
  const dateText = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(value);

  const timeText = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(value);

  return `${dateText} ${timeText}`;
}

export default function DesktopHeader() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <header className="font-hand relative z-20 flex h-[28px] items-center justify-between border-b border-[#76afe8] bg-[#84b2df] px-2 text-[10px] text-[#24588f] sm:px-3">
      <div className="flex items-center gap-4 overflow-hidden whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <Image
            src="/icons/crown-icon.svg"
            alt=""
            width={19}
            height={19}
            className="h-[14px] w-[14px]"
          />
          <span className="font-hand text-white">Princess&apos;s Portfolio</span>
        </div>
        {/* <span>Contact</span>
        <span>Resume</span> */}
      </div>

      <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <Image
            src="/icons/wifi-icon.svg"
            alt=""
            width={12}
            height={12}
            className="h-[10px] w-[10px]"
          />
          <Image
            src="/icons/whatsapp-icon.png"
            alt=""
            width={14}
            height={14}
            className="h-[11px] w-[11px] object-contain"
          />
          <Image
            src="/icons/battery-icon.png"
            alt=""
            width={20}
            height={9}
            className="h-[8px] w-[18px] object-contain"
          />
        </div>
        <span suppressHydrationWarning aria-live="polite">
          {formatDateTime(now)}
        </span>
      </div>
    </header>
  );
}
