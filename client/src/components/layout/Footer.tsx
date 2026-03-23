import Link from "next/link";

const quickLinks = [
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
  { href: "/booking", label: "Book Now" },
] as const;

const socialLinks = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://facebook.com", label: "Facebook" },
  { href: "https://tiktok.com", label: "TikTok" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-block text-lg tracking-wide text-primary transition-colors hover:text-accent font-[var(--font-playfair)]"
            >
              Lustrae
            </Link>
            <p className="text-sm leading-6 text-secondary">
              A refined beauty experience—premium care, timeless style, and a calm
              escape.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-primary">Quick Links</h2>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-secondary transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-primary">Contact</h2>
            <div className="space-y-2 text-sm text-secondary">
              <p>Dhaka, Bangladesh</p>
              <p>
                <a
                  href="tel:+8801000000000"
                  className="transition-colors hover:text-primary"
                >
                  +880 10 0000 0000
                </a>
              </p>
              <p>
                <a
                  href="mailto:hello@lustrae.com"
                  className="transition-colors hover:text-primary"
                >
                  hello@lustrae.com
                </a>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-primary">Social</h2>
            <ul className="space-y-2">
              {socialLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-secondary transition-colors hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-black/5 pt-6 text-sm text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Lustrae. All rights reserved.</p>
          <p className="text-secondary/80">Designed with care.</p>
        </div>
      </div>
    </footer>
  );
}
