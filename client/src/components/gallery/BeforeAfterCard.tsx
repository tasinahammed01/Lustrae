"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";

type BeforeAfterCardProps = {
  before: string;
  after: string;
  category?: string;
  className?: string;
};

export default function BeforeAfterCard({
  before,
  after,
  category,
  className,
}: BeforeAfterCardProps) {
  const id = useId();
  const [position, setPosition] = useState(0.5);
  const [isDragging, setIsDragging] = useState(false);

  const sliderLabel = useMemo(() => `before-after-${id}`, [id]);
  const percent = Math.round(position * 100);
  const min = 5;
  const max = 95;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-primary/10 bg-white/40 shadow-sm transition-shadow hover:shadow-lg ${
        className ?? ""
      }`}
      role="group"
      aria-label={category ? `${category} transformation` : "Before and after"}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={after}
          alt="After"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
          aria-hidden
        >
          <Image
            src={before}
            alt="Before"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div
          className="pointer-events-none absolute inset-y-0"
          style={{ left: `${percent}%` }}
          aria-hidden
        >
          <div className="absolute inset-y-0 -translate-x-1/2">
            <div className="h-full w-px bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.08)]" />
          </div>
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-black/15 backdrop-blur shadow-md transition-transform duration-200 ${
                isDragging ? "scale-95" : ""
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rotate-45 border-b-2 border-l-2 border-white" />
                <span className="h-2.5 w-2.5 -rotate-45 border-b-2 border-r-2 border-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center rounded-full bg-black/35 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur">
            Before
          </span>
        </div>
        <div className="absolute right-4 top-4">
          <span className="inline-flex items-center rounded-full bg-black/35 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur">
            After
          </span>
        </div>

        {category ? (
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur">
              {category}
            </span>
          </div>
        ) : null}

        <input
          aria-label={sliderLabel}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          style={{ touchAction: "none" }}
          type="range"
          min={min}
          max={max}
          value={percent}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          onPointerCancel={() => setIsDragging(false)}
          onChange={(e) => setPosition(Number(e.target.value) / 100)}
        />
      </div>
    </div>
  );
}
