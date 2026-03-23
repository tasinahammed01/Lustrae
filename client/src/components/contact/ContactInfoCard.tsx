"use client";

import { MapPin, Phone, Mail, Clock, LucideIcon } from "lucide-react";

interface ContactInfoItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

const contactInfo: ContactInfoItem[] = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: "123 Beauty Lane, Downtown\nNew York, NY 10001",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@lustrae.com",
    href: "mailto:hello@lustrae.com",
  },
  {
    icon: Clock,
    label: "Opening Hours",
    value: "Mon - Fri: 9:00 AM - 8:00 PM\nSat - Sun: 10:00 AM - 6:00 PM",
  },
];

export function ContactInfoCard() {
  return (
    <div className="space-y-6">
      {contactInfo.map((item) => {
        const Icon = item.icon;
        const content = (
          <div className="group flex items-start gap-4 rounded-xl border border-primary/10 bg-white/50 p-5 transition-all duration-300 hover:bg-white hover:shadow-lg">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 transition-colors group-hover:bg-accent/20">
              <Icon className="h-5 w-5 text-accent" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-secondary">
                {item.label}
              </p>
              <p className="mt-1 whitespace-pre-line text-sm font-medium text-primary">
                {item.value}
              </p>
            </div>
          </div>
        );

        if (item.href) {
          return (
            <a
              key={item.label}
              href={item.href}
              className="block transition-transform hover:scale-[1.02]"
            >
              {content}
            </a>
          );
        }

        return <div key={item.label}>{content}</div>;
      })}
    </div>
  );
}
