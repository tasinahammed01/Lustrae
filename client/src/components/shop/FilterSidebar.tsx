"use client";

import { SlidersHorizontal, X } from "lucide-react";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  minRating: number;
  onMinRatingChange: (rating: number) => void;
  onClearFilters: () => void;
  productCount: number;
}

const categories = [
  { id: "hair", label: "Hair", count: 8 },
  { id: "makeup", label: "Makeup", count: 12 },
  { id: "skincare", label: "Skincare", count: 10 },
  { id: "grooming", label: "Grooming", count: 6 },
];

const ratings = [
  { value: 4, label: "4★ & above" },
  { value: 3, label: "3★ & above" },
  { value: 2, label: "2★ & above" },
  { value: 0, label: "All Ratings" },
];

export function FilterSidebar({
  isOpen,
  onClose,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  minRating,
  onMinRatingChange,
  onClearFilters,
  productCount,
}: FilterSidebarProps) {
  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter((c) => c !== categoryId));
    } else {
      onCategoryChange([...selectedCategories, categoryId]);
    }
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 200 ||
    minRating > 0;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div className="relative">
        {/* Mobile Drawer */}
        <aside
          className={`fixed left-0 top-0 z-50 h-full w-80 overflow-y-auto border-r border-primary/10 bg-background p-6 shadow-xl transition-transform duration-300 lg:hidden ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl text-primary">Filters</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-secondary transition-colors hover:bg-primary/5 hover:text-primary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-4 text-sm text-secondary">
            Showing {productCount} products
          </p>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="mt-4 w-full rounded-lg border border-primary/10 py-2 text-sm font-medium text-secondary transition-colors hover:bg-primary/5 hover:text-primary"
            >
              Clear all filters
            </button>
          )}

          {/* Categories */}
          <div className="mt-6 border-t border-primary/10 pt-6">
            <h3 className="font-medium text-primary">Categories</h3>
            <div className="mt-3 space-y-2">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors hover:bg-white/50"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      className="h-4 w-4 cursor-pointer rounded border-primary/20 text-accent focus:ring-accent"
                    />
                    <span className="text-sm text-secondary">{category.label}</span>
                  </div>
                  <span className="text-xs text-secondary/60">({category.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-6 border-t border-primary/10 pt-6">
            <h3 className="font-medium text-primary">Price Range</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-xs text-secondary">Min</label>
                  <div className="mt-1 flex items-center rounded-lg border border-primary/10 bg-white/50 px-3 py-2">
                    <span className="text-secondary">$</span>
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                      className="w-full bg-transparent pl-1 text-sm text-primary outline-none"
                      min={0}
                      max={priceRange[1]}
                    />
                  </div>
                </div>
                <span className="pt-5 text-secondary">-</span>
                <div className="flex-1">
                  <label className="text-xs text-secondary">Max</label>
                  <div className="mt-1 flex items-center rounded-lg border border-primary/10 bg-white/50 px-3 py-2">
                    <span className="text-secondary">$</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                      className="w-full bg-transparent pl-1 text-sm text-primary outline-none"
                      min={priceRange[0]}
                      max={500}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mt-6 border-t border-primary/10 pt-6">
            <h3 className="font-medium text-primary">Customer Rating</h3>
            <div className="mt-3 space-y-2">
              {ratings.map((rating) => (
                <label
                  key={rating.value}
                  className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/50"
                >
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === rating.value}
                    onChange={() => onMinRatingChange(rating.value)}
                    className="h-4 w-4 cursor-pointer text-accent focus:ring-accent"
                  />
                  <span className="text-sm text-secondary">{rating.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block">
          {/* Desktop Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-accent" />
              <h2 className="font-heading text-lg text-primary">Filters</h2>
            </div>
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="text-xs font-medium text-accent transition-colors hover:text-primary"
              >
                Clear all
              </button>
            )}
          </div>

          <p className="mt-6 text-sm text-secondary">Showing {productCount} products</p>

          {/* Categories */}
          <div className="mt-6 border-t border-primary/10 pt-6">
            <h3 className="font-medium text-primary">Categories</h3>
            <div className="mt-3 space-y-2">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors hover:bg-white/50"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      className="h-4 w-4 cursor-pointer rounded border-primary/20 text-accent focus:ring-accent"
                    />
                    <span className="text-sm text-secondary">{category.label}</span>
                  </div>
                  <span className="text-xs text-secondary/60">({category.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-6 border-t border-primary/10 pt-6">
            <h3 className="font-medium text-primary">Price Range</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-xs text-secondary">Min</label>
                  <div className="mt-1 flex items-center rounded-lg border border-primary/10 bg-white/50 px-3 py-2">
                    <span className="text-secondary">$</span>
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                      className="w-full bg-transparent pl-1 text-sm text-primary outline-none"
                      min={0}
                      max={priceRange[1]}
                    />
                  </div>
                </div>
                <span className="pt-5 text-secondary">-</span>
                <div className="flex-1">
                  <label className="text-xs text-secondary">Max</label>
                  <div className="mt-1 flex items-center rounded-lg border border-primary/10 bg-white/50 px-3 py-2">
                    <span className="text-secondary">$</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                      className="w-full bg-transparent pl-1 text-sm text-primary outline-none"
                      min={priceRange[0]}
                      max={500}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mt-6 border-t border-primary/10 pt-6">
            <h3 className="font-medium text-primary">Customer Rating</h3>
            <div className="mt-3 space-y-2">
              {ratings.map((rating) => (
                <label
                  key={rating.value}
                  className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/50"
                >
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === rating.value}
                    onChange={() => onMinRatingChange(rating.value)}
                    className="h-4 w-4 cursor-pointer text-accent focus:ring-accent"
                  />
                  <span className="text-sm text-secondary">{rating.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
