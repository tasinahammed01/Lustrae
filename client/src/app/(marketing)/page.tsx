"use client";

import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useCountUp } from "@/_hooks/useCountUp";

type Service = {
  title: string;
  description: string;
  imageUrl: string;
};

type Testimonial = {
  name: string;
  quote: string;
  role?: string;
  avatarUrl?: string;
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

const testimonials: Testimonial[] = [
  {
    name: "Amina Rahman",
    role: "Bridal Client",
    quote:
      "I felt like the most elevated version of myself. The makeup lasted all day, looked flawless in photos, and still felt lightweight.",
    avatarUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80",
  },
  {
    name: "Nadia Sultana",
    role: "Hair & Color",
    quote:
      "The consultation was thoughtful and the result was exactly what I imagined—soft, dimensional, and incredibly healthy-looking.",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
  },
  {
    name: "Sabrina Chowdhury",
    role: "Skincare Treatment",
    quote:
      "My skin has never looked this calm and glowy. The experience felt luxurious from start to finish—true self-care.",
    avatarUrl:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=256&q=80",
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

function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex w-full items-center justify-center rounded-full border border-primary/15 bg-background/40 px-6 py-3 text-sm font-medium tracking-wide text-primary shadow-sm backdrop-blur transition-colors hover:border-primary/25 hover:bg-background/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
    >
      {children}
    </Link>
  );
}

function AnimatedNumber({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const { count, ref } = useCountUp({ end, duration });

  return (
    <span ref={ref} className="text-2xl font-semibold text-primary">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-heading text-3xl leading-tight text-primary sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-secondary">{description}</p>
      ) : null}
    </div>
  );
}

export default function Page() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background text-primary">
      <section className="relative min-h-screen">
        <div className="absolute inset-0">
          <Image
            src="/HeroBackgroud.avif"
            alt="Luxury beauty salon hero background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/80">
              Luxury Beauty Studio
            </p>
            <h1 className="mt-6 font-heading text-5xl leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Enhance Your Natural Beauty
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
              Editorial hair, bridal makeup, and skin treatments crafted with
              precision—so you feel radiant, confident, and effortless.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <PrimaryButton href="/book">Book Appointment</PrimaryButton>
              <SecondaryButton href="#services">View Services</SecondaryButton>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-primary/10 bg-background">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3 sm:text-left">
            <div className="rounded-2xl bg-white/40 px-6 py-6 shadow-sm">
              <AnimatedNumber end={500} suffix="+" />
              <p className="mt-2 text-sm text-secondary">Happy clients</p>
            </div>
            <div className="rounded-2xl bg-white/40 px-6 py-6 shadow-sm">
              <AnimatedNumber end={5} suffix="★" duration={1500} />
              <p className="mt-2 text-sm text-secondary">Rated salon</p>
            </div>
            <div className="rounded-2xl bg-white/40 px-6 py-6 shadow-sm">
              <p className="text-2xl font-semibold text-primary">Certified</p>
              <p className="mt-2 text-sm text-secondary">Professional team</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            eyebrow="Signature Services"
            title="Beauty rituals designed for modern elegance"
            description="From everyday polish to bridal glow, every detail is tailored to your features, lifestyle, and the moment you’re dressing for."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="group overflow-hidden rounded-2xl border border-primary/10 bg-white/40 shadow-sm transition-shadow hover:shadow-lg"
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

          <div className="mt-10 flex justify-center">
            <SecondaryButton href="/services">View All Services</SecondaryButton>
          </div>
        </div>
      </section>

      <section id="products" className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Shop
            </p>
            <h2 className="mt-4 font-heading text-3xl leading-tight text-primary sm:text-4xl">
              Best Selling Products
            </h2>
            <p className="mt-4 text-base leading-7 text-secondary">
              Curated essentials for your at-home beauty ritual—hand-picked by our
              team for results you can see.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ProductCard
              image="/Brow Scrub.png"
              name="Brow Scrub"
              description="Premium Brow Kit for beginners"
              price="$34.00"
              href="/shop"
            />
            <ProductCard
              image="/Bridal Makeup Kit.png"
              name="Bridal Makeup Kit"
              description="Complete makeup set for bridal looks"
              price="$42.50"
              href="/shop"
            />
            <ProductCard
              image="/Keratin Restore.png"
              name="Keratin Restore"
              description="Hair repair kit for shine & smoothness"
              price="$20.00"
              href="/shop"
            />
            <ProductCard
              image="/Matte Lip Collection.png"
              name="Matte Lip Collection"
              description="Long-lasting, elegant shades"
              price="$18.00"
              href="/shop"
            />
            <ProductCard
              image="/Glow Serum.png"
              name="Glow Serum"
              description="Brightening vitamin C serum"
              price="$29.00"
              href="/shop"
            />
          </div>

          <div className="mt-10 flex justify-center">
            <SecondaryButton href="/shop">View All Products</SecondaryButton>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Bridal & Events
              </p>
              <h2 className="mt-4 font-heading text-3xl leading-tight text-primary sm:text-4xl">
                Bridal & Event Beauty
              </h2>
              <p className="mt-5 text-base leading-7 text-secondary">
                A curated experience for weddings, engagements, and special
                occasions—crafted to look impeccable in person and on camera. We
                balance longevity with softness for a truly elevated finish.
              </p>
              <div className="mt-8">
                <PrimaryButton href="/book">
                  Book for Your Event
                </PrimaryButton>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-primary/10 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80"
                  alt="Bridal makeup in a luxury salon setting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 lg:order-2">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                About Us
              </p>
              <h2 className="mt-4 font-heading text-3xl leading-tight text-primary sm:text-4xl">
                An intimate studio for refined beauty
              </h2>
              <p className="mt-5 text-base leading-7 text-secondary">
                We’re a women-led team of artists and therapists devoted to the
                details—skin finish, hair movement, and a look that feels like
                you. Every appointment begins with a calm consultation and ends
                with a tailored aftercare plan.
              </p>
              <div className="mt-8">
                <SecondaryButton href="/about">Learn More</SecondaryButton>
              </div>
            </div>

            <div className="lg:col-span-6 lg:order-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-primary/10 bg-white/30 shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1600&q=80"
                  alt="Salon interior with premium styling stations"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeading
            eyebrow="Testimonials"
            title="Loved by clients who value quiet luxury"
            description="A few words from women who trusted us for their everyday looks and milestone moments."
          />

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-primary/10 bg-white/40 p-7 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-11 w-11 overflow-hidden rounded-full border border-primary/10">
                    <Image
                      src={
                        t.avatarUrl ??
                        "https://images.unsplash.com/photo-1524503033411-f0ce7a23b7b5?auto=format&fit=crop&w=128&q=80"
                      }
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">
                      {t.name}
                    </p>
                    {t.role ? <p className="text-xs text-secondary">{t.role}</p> : null}
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-primary/90">
                  “{t.quote}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="overflow-hidden rounded-3xl border border-primary/10 bg-white/40 shadow-sm">
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-12">
              <div className="p-10 sm:p-14 lg:col-span-7">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  Book Now
                </p>
                <h2 className="mt-4 font-heading text-4xl leading-tight text-primary sm:text-5xl">
                  Ready to Glow?
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-secondary">
                  Reserve your appointment in minutes. We’ll confirm your time
                  and tailor the experience to your goals—bridal, event, or
                  everyday refinement.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <PrimaryButton href="/book">Book Your Appointment</PrimaryButton>
                  <SecondaryButton href="#services">Explore Services</SecondaryButton>
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
