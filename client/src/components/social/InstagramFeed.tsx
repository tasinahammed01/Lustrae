import Image from "next/image";

type InstagramItem = {
  src: string;
  href: string;
};

const items: InstagramItem[] = [
  {
    src: "https://source.unsplash.com/1200x1200/?beauty,flatlay,spa&sig=301",
    href: "https://instagram.com",
  },
  {
    src: "https://source.unsplash.com/1200x1200/?makeup,studio,portrait&sig=302",
    href: "https://instagram.com",
  },
  {
    src: "https://source.unsplash.com/1200x1200/?hair,salon,luxury&sig=303",
    href: "https://instagram.com",
  },
  {
    src: "https://source.unsplash.com/1200x1200/?skincare,glow,beauty&sig=304",
    href: "https://instagram.com",
  },
  {
    src: "https://source.unsplash.com/1200x1200/?bridal,makeup,wedding&sig=305",
    href: "https://instagram.com",
  },
  {
    src: "https://source.unsplash.com/1200x1200/?hairstyle,woman,beauty&sig=306",
    href: "https://instagram.com",
  },
  {
    src: "https://source.unsplash.com/1200x1200/?portrait,beauty,soft-light&sig=307",
    href: "https://instagram.com",
  },
  {
    src: "https://source.unsplash.com/1200x1200/?spa,skincare,serum&sig=308",
    href: "https://instagram.com",
  },
];

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
    >
      <path
        d="M16 2H8C4.686 2 2 4.686 2 8V16C2 19.314 4.686 22 8 22H16C19.314 22 22 19.314 22 16V8C22 4.686 19.314 2 16 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 16.2C14.3196 16.2 16.2 14.3196 16.2 12C16.2 9.68042 14.3196 7.8 12 7.8C9.68042 7.8 7.8 9.68042 7.8 12C7.8 14.3196 9.68042 16.2 12 16.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M17.5 6.7H17.51"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function InstagramFeed({
  username = "@yourbrand",
  followUrl = "https://instagram.com",
}: {
  username?: string;
  followUrl?: string;
}) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Instagram
          </p>
          <h2 className="mt-4 font-heading text-3xl leading-tight text-primary sm:text-4xl">
            Follow Our Beauty Journey
          </h2>
          <p className="mt-4 text-base leading-7 text-secondary">
            {username} — Daily inspiration & transformations
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.slice(0, 8).map((item, idx) => (
            <a
              key={`${item.src}-${idx}`}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl border border-primary/10 bg-white/40 shadow-sm transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="View on Instagram"
            >
              <Image
                src={item.src}
                alt="Instagram post"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/45" />

              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-center text-white backdrop-blur">
                  <InstagramGlyph className="h-6 w-6" />
                  <span className="text-sm font-medium">View on Instagram</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={followUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full bg-button px-6 py-3 text-sm font-medium tracking-wide text-white shadow-sm transition-colors hover:bg-button-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
          >
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
