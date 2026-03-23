"use client";

import Image from "next/image";

interface ProductCardProps {
  image: string;
  name: string;
  description: string;
  price: string;
  href?: string;
}

export default function ProductCard({
  image,
  name,
  description,
  price,
  href = "/shop",
}: ProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-primary/10 bg-white/50 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="p-5">
        <h3 className="font-heading text-lg text-primary">{name}</h3>
        <p className="mt-2 text-sm leading-6 text-secondary">{description}</p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="text-sm font-semibold text-primary">{price}</span>
          <a
            href={href}
            className="inline-flex items-center justify-center rounded-full bg-button px-4 py-2 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-button-hover"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}
