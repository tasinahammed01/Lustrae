"use client";

import { SlidersHorizontal } from "lucide-react";
import { useState, useMemo } from "react";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { SearchBar, SortBar } from "@/components/shop/SearchAndSort";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { products } from "@/components/shop/data";

const PRODUCTS_PER_PAGE = 8;

export default function ShopPage() {
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [minRating, setMinRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [cartCount, setCartCount] = useState(0);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.includes(p.category)
      );
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Rating filter
    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Featured: bestsellers first, then by rating
        result.sort((a, b) => {
          if (a.isBestseller && !b.isBestseller) return -1;
          if (!a.isBestseller && b.isBestseller) return 1;
          return b.rating - a.rating;
        });
    }

    return result;
  }, [selectedCategories, priceRange, minRating, searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 200]);
    setMinRating(0);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 200 ||
    minRating > 0 ||
    searchQuery.trim();

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Mobile Filter Sidebar - Slide-in drawer */}
      <div className="lg:hidden">
        <FilterSidebar
          isOpen={isMobileFiltersOpen}
          onClose={() => setIsMobileFiltersOpen(false)}
          selectedCategories={selectedCategories}
          onCategoryChange={(cats) => {
            setSelectedCategories(cats);
            setCurrentPage(1);
          }}
          priceRange={priceRange}
          onPriceRangeChange={(range) => {
            setPriceRange(range);
            setCurrentPage(1);
          }}
          minRating={minRating}
          onMinRatingChange={(rating) => {
            setMinRating(rating);
            setCurrentPage(1);
          }}
          onClearFilters={clearAllFilters}
          productCount={filteredProducts.length}
        />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent/20 via-background to-background">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-5" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 text-center lg:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Premium Beauty Collection
          </p>
          <h1 className="mt-4 font-heading text-4xl text-primary sm:text-5xl lg:text-6xl">
            Shop Our Beauty Essentials
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-secondary">
            Curated products to elevate your everyday beauty routine. 
            Discover our hand-picked selection of premium beauty and grooming essentials.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:w-72 lg:flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar
                isOpen={false}
                onClose={() => {}}
                selectedCategories={selectedCategories}
                onCategoryChange={(cats) => {
                  setSelectedCategories(cats);
                  setCurrentPage(1);
                }}
                priceRange={priceRange}
                onPriceRangeChange={(range) => {
                  setPriceRange(range);
                  setCurrentPage(1);
                }}
                minRating={minRating}
                onMinRatingChange={(rating) => {
                  setMinRating(rating);
                  setCurrentPage(1);
                }}
                onClearFilters={clearAllFilters}
                productCount={filteredProducts.length}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="flex items-center gap-2 rounded-full border border-primary/10 bg-white/60 px-4 py-2.5 text-sm text-primary transition-all hover:bg-white hover:shadow-sm lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {selectedCategories.length > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-white">
                      {selectedCategories.length}
                    </span>
                  )}
                </button>

                <SearchBar
                  value={searchQuery}
                  onChange={(val) => {
                    setSearchQuery(val);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <SortBar sortBy={sortBy} onSortChange={setSortBy} />
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="text-sm text-secondary">Active filters:</span>
                {selectedCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() =>
                      setSelectedCategories(selectedCategories.filter((c) => c !== cat))
                    }
                    className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-accent/20"
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                ))}
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-accent/20"
                  >
                    Search: {searchQuery.slice(0, 15)}
                    {searchQuery.length > 15 && "..."}
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
                {minRating > 0 && (
                  <button
                    onClick={() => setMinRating(0)}
                    className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-accent/20"
                  >
                    {minRating}★+
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
                <button
                  onClick={clearAllFilters}
                  className="ml-2 text-xs font-medium text-accent transition-colors hover:text-primary"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Results Count */}
            <p className="mb-4 text-sm text-secondary">
              Showing {paginatedProducts.length} of {filteredProducts.length} products
            </p>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedProducts.map((product) => (
                  <ShopProductCard
                    key={product.id}
                    {...product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-primary/10 bg-white/40 py-16">
                <svg
                  className="h-16 w-16 text-secondary/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <h3 className="mt-4 font-heading text-xl text-primary">
                  No products found
                </h3>
                <p className="mt-2 text-sm text-secondary">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 rounded-full bg-button px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-button-hover"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-white/60 text-primary transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  const isActive = page === currentPage;
                  
                  // Show first, last, and around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-button text-white"
                            : "border border-primary/10 bg-white/60 text-primary hover:bg-white"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                  
                  // Show ellipsis
                  if (
                    (page === currentPage - 2 && page > 1) ||
                    (page === currentPage + 2 && page < totalPages)
                  ) {
                    return (
                      <span key={page} className="px-1 text-secondary">
                        ...
                      </span>
                    );
                  }
                  
                  return null;
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-white/60 text-primary transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cart Toast */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 right-6 z-50">
          <button className="flex items-center gap-2 rounded-full bg-button px-5 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105 hover:bg-button-hover">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Cart ({cartCount})
          </button>
        </div>
      )}
    </div>
  );
}
