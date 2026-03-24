"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ShopProductCardProps {
  _id: string;
  image: string;
  name: string;
  description?: string;
  category?: string;
  price: number;
  rating: number;
  reviews?: number;
  onAddToCart?: () => void;
}

export function ShopProductCard({
  _id,
  image,
  name,
  description,
  category,
  price,
  rating,
  reviews = 0,
  onAddToCart,
}: ShopProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart?.();
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-white/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 text-primary shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:shadow-md"
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-colors ${
            isWishlisted ? "fill-red-500 text-red-500" : "fill-none"
          }`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {/* Image Container */}
      <div className="relative h-56 w-full overflow-hidden bg-secondary/5">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category Tag */}
        <span className="text-xs font-medium uppercase tracking-wide text-accent">
          {category || description?.split(" ")[0] || "Product"}
        </span>

        {/* Product Name */}
        <h3 className="mt-1 font-heading text-lg text-primary line-clamp-1">
          {name}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-secondary/30 text-secondary/30"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-secondary">
            {rating} {reviews > 0 && `(${reviews})`}
          </span>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-heading text-xl font-semibold text-primary">
            ${price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-button px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-button-hover hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isAdding ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Added
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
