"use client";

import { useMemo, useState } from "react";
import BeforeAfterCard from "@/components/gallery/BeforeAfterCard";

type GalleryItem = {
  before: string;
  after: string;
  category: "Hair" | "Bridal" | "Skin";
};

const items: GalleryItem[] = [
  {
    category: "Hair",
    before:
      "/Hair Styling.png",
    after:
      "/Keratin Restore.png",
  },
  {
    category: "Bridal",
    before:
      "/Bridal Makeup.png",
    after:
      "/Bridal Makeup Kit.png",
  },
  {
    category: "Skin",
    before:
      "/Skincare Treatment.png",
    after:
      "/Glow Serum.png",
  },
  {
    category: "Hair",
    before:
      "/Lash & Brow.png",
    after:
      "/Matte Lip Collection.png",
  },
  {
    category: "Bridal",
    before:
      "/Bridal Makeup Kit.png",
    after:
      "/Bridal Makeup.png",
  },
  {
    category: "Skin",
    before:
      "/Glow Serum.png",
    after:
      "/Skincare Treatment.png",
  },
];

const filters = ["All", "Hair", "Bridal", "Skin"] as const;
type Filter = (typeof filters)[number];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return items;
    return items.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="bg-background text-primary">
      <section className="border-b border-primary/10">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Gallery
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-tight text-primary sm:text-5xl">
              Real Transformations
            </h1>
            <p className="mt-4 text-base leading-7 text-secondary">
              See the artistry behind every look we create—subtle refinement,
              polished glamour, and effortless radiance.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {filters.map((filter) => {
              const isActive = filter === activeFilter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-5 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isActive
                      ? "bg-button text-white hover:bg-button-hover"
                      : "border border-primary/15 bg-background/40 text-primary hover:bg-background/70"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {filtered.map((item, idx) => (
              <BeforeAfterCard
                key={`${item.category}-${idx}`}
                before={item.before}
                after={item.after}
                category={item.category}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
