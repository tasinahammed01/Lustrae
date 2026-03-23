"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="text-lg tracking-wide text-primary transition-colors hover:text-accent font-[var(--font-playfair)]"
        >
          Lustrae
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-6">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-secondary transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link
            href="/booking"
            className="inline-flex h-10 items-center justify-center rounded-full bg-button px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-button-hover"
          >
            Book Now
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/60 text-primary shadow-sm transition-colors hover:bg-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="sr-only">Open main menu</span>
          <div className="flex flex-col gap-1">
            <span
              className={`h-0.5 w-5 rounded bg-current transition-transform ${
                isOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 rounded bg-current transition-opacity ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-5 rounded bg-current transition-transform ${
                isOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-black/5 bg-background/95 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 sm:px-6">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-secondary transition-colors hover:bg-white/60 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/booking"
              className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-button px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-button-hover"
              onClick={() => setIsOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
