"use client";

import Image from "next/image";
import Link from "next/link";

type Service = {
  title: string;
  description: string;
  imageUrl: string;
};

const services: Service[] = [
  {
    title: "Hair Styling",
    description:
      "Precision cuts, lived-in color, and effortless styling tailored to your features.",
    imageUrl: "/Hair Styling.png",
  },
  {
    title: "Bridal Makeup",
    description:
      "Camera-ready artistry with a soft, luminous finish—timeless, elevated, and you.",
    imageUrl: "/Bridal Makeup.png",
  },
  {
    title: "Skincare Treatment",
    description:
      "Signature facials and targeted treatments for smooth texture and lasting glow.",
    imageUrl: "/Skincare Treatment.png",
  },
  {
    title: "Lash & Brow",
    description:
      "Lifts, tints, shaping, and definition for an instantly polished look.",
    imageUrl: "/Lash & Brow.png",
  },
];

function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex w-full items-center justify-center rounded-full bg-button px-6 py-3 text-sm font-medium tracking-wide text-white shadow-sm transition-colors hover:bg-button-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
    >
      {children}
    </Link>
  );
}

export default function ServicesPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background text-primary">
      {/* Hero Section */}
      <section className="relative bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Our Offerings
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-tight text-primary sm:text-5xl lg:text-6xl">
              Signature Services
            </h1>
            <p className="mt-6 text-base leading-7 text-secondary sm:text-lg">
              Beauty rituals designed for modern elegance. From everyday polish
              to bridal glow, every detail is tailored to your features,
              lifestyle, and the moment.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 pb-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="group overflow-hidden rounded-2xl border border-primary/10 bg-white/40 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-secondary">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 pb-20">
          <div className="overflow-hidden rounded-3xl border border-primary/10 bg-white/40 shadow-sm">
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
              <div className="p-10 sm:p-14 lg:col-span-7">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  Book Now
                </p>
                <h2 className="mt-4 font-heading text-3xl leading-tight text-primary sm:text-4xl">
                  Ready to Book?
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-secondary">
                  Reserve your appointment in minutes. We&apos;ll confirm your
                  time and tailor the experience to your goals—bridal, event, or
                  everyday refinement.
                </p>
                <div className="mt-8">
                  <PrimaryButton href="/book">
                    Book Your Appointment
                  </PrimaryButton>
                </div>
              </div>

              <div className="relative min-h-[240px] lg:col-span-5 lg:min-h-full">
                <Image
                  src="https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1400&q=80"
                  alt="Beauty flatlay with soft feminine tones"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
