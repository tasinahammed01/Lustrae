'use client';

import { useState, useEffect } from 'react';
import { Scissors, Sparkles, Heart, Eye, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import Image from 'next/image';

interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    id: 'hair-styling',
    title: 'Hair Styling',
    description: 'Precision cuts, lived-in color, and effortless styling tailored to your features.',
    duration: '60-90 min',
    price: 'From $85',
    image: '/Hair Styling.png',
    icon: <Scissors className="h-5 w-5" />,
  },
  {
    id: 'bridal-makeup',
    title: 'Bridal Makeup',
    description: 'Camera-ready artistry with a soft, luminous finish—timeless and elevated.',
    duration: '90-120 min',
    price: 'From $250',
    image: '/Bridal Makeup.png',
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    id: 'skincare',
    title: 'Skincare Treatment',
    description: 'Signature facials and targeted treatments for smooth texture and lasting glow.',
    duration: '45-75 min',
    price: 'From $120',
    image: '/Skincare Treatment.png',
    icon: <Heart className="h-5 w-5" />,
  },
  {
    id: 'lash-brow',
    title: 'Lash & Brow',
    description: 'Lifts, tints, shaping, and definition for an instantly polished look.',
    duration: '30-60 min',
    price: 'From $45',
    image: '/Lash & Brow.png',
    icon: <Eye className="h-5 w-5" />,
  },
];

interface ServiceSelectorProps {
  selectedService: string | null;
  onSelect: (serviceId: string) => void;
  onNext: () => void;
}

export function ServiceSelector({ selectedService, onSelect, onNext }: ServiceSelectorProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`space-y-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="text-center">
        <h3 className="font-heading text-2xl text-primary sm:text-3xl">
          Select Your Service
        </h3>
        <p className="mt-2 text-sm text-secondary">
          Choose the perfect treatment for your beauty goals
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((service, index) => (
          <button
            key={service.id}
            onClick={() => onSelect(service.id)}
            className={`
              group relative overflow-hidden rounded-xl border p-4 text-left transition-all duration-300
              ${selectedService === service.id
                ? 'border-accent bg-accent/5 shadow-lg'
                : 'border-primary/10 bg-white/60 hover:border-accent/30 hover:bg-white hover:shadow-md'
              }
            `}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Selection indicator */}
            {selectedService === service.id && (
              <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white">
                <Check className="h-4 w-4" />
              </div>
            )}

            <div className="flex gap-4">
              {/* Image */}
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`
                    flex h-7 w-7 items-center justify-center rounded-full text-xs
                    ${selectedService === service.id ? 'bg-accent text-white' : 'bg-accent/10 text-accent'}
                  `}>
                    {service.icon}
                  </span>
                  <h4 className="font-heading text-base font-medium text-primary truncate">
                    {service.title}
                  </h4>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-secondary line-clamp-2">
                  {service.description}
                </p>
                <div className="mt-2 flex items-center gap-3 text-xs">
                  <span className="text-accent font-medium">{service.price}</span>
                  <span className="text-secondary/70">•</span>
                  <span className="text-secondary">{service.duration}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Next Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          disabled={!selectedService}
          className={`
            group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300
            ${selectedService
              ? 'bg-button text-white hover:bg-button-hover hover:shadow-lg hover:scale-105'
              : 'bg-primary/10 text-secondary cursor-not-allowed'
            }
          `}
        >
          Continue
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
