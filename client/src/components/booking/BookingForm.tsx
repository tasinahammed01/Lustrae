'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, MessageSquare, ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react';

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

interface BookingFormProps {
  userDetails: UserDetails;
  onUpdateDetails: (details: UserDetails) => void;
  onNext: () => void;
  onBack: () => void;
}

export function BookingForm({
  userDetails,
  onUpdateDetails,
  onNext,
  onBack,
}: BookingFormProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof UserDetails, string>>>({});
  const [touched, setTouched] = useState<Record<keyof UserDetails, boolean>>({
    name: false,
    email: false,
    phone: false,
    notes: false,
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validateField = (field: keyof UserDetails, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email';
        return undefined;
      case 'phone':
        if (!value.trim()) return 'Phone is required';
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'Please enter a valid phone number';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (field: keyof UserDetails, value: string) => {
    onUpdateDetails({ ...userDetails, [field]: value });
    
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: keyof UserDetails) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, userDetails[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const isValid =
    userDetails.name.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email) &&
    /^[\d\s\-\+\(\)]{10,}$/.test(userDetails.phone.replace(/\s/g, ''));

  return (
    <div className={`space-y-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="text-center">
        <h3 className="font-heading text-2xl text-primary sm:text-3xl">
          Your Details
        </h3>
        <p className="mt-2 text-sm text-secondary">
          We&apos;ll use this to confirm your appointment
        </p>
      </div>

      <div className="space-y-4">
        {/* Name Field */}
        <div className="space-y-1.5">
          <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-primary">
            <User className="h-4 w-4 text-accent" />
            Full Name <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={userDetails.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            placeholder="Enter your full name"
            className={`
              w-full rounded-lg border bg-white px-4 py-3 text-sm transition-all duration-300 outline-none
              ${errors.name && touched.name
                ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-primary/10 focus:border-accent focus:ring-2 focus:ring-accent/10'
              }
            `}
          />
          {errors.name && touched.name && (
            <p className="text-xs text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-primary">
            <Mail className="h-4 w-4 text-accent" />
            Email Address <span className="text-accent">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={userDetails.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            placeholder="your@email.com"
            className={`
              w-full rounded-lg border bg-white px-4 py-3 text-sm transition-all duration-300 outline-none
              ${errors.email && touched.email
                ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-primary/10 focus:border-accent focus:ring-2 focus:ring-accent/10'
              }
            `}
          />
          {errors.email && touched.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-1.5">
          <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-primary">
            <Phone className="h-4 w-4 text-accent" />
            Phone Number <span className="text-accent">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={userDetails.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            placeholder="+1 (555) 000-0000"
            className={`
              w-full rounded-lg border bg-white px-4 py-3 text-sm transition-all duration-300 outline-none
              ${errors.phone && touched.phone
                ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
                : 'border-primary/10 focus:border-accent focus:ring-2 focus:ring-accent/10'
              }
            `}
          />
          {errors.phone && touched.phone && (
            <p className="text-xs text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Notes Field */}
        <div className="space-y-1.5">
          <label htmlFor="notes" className="flex items-center gap-2 text-sm font-medium text-primary">
            <MessageSquare className="h-4 w-4 text-accent" />
            Special Requests <span className="text-secondary/70">(Optional)</span>
          </label>
          <textarea
            id="notes"
            value={userDetails.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="Any allergies, preferences, or special requests?"
            rows={3}
            className="w-full rounded-lg border border-primary/10 bg-white px-4 py-3 text-sm transition-all duration-300 outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 resize-none"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-5 py-2.5 text-sm font-medium text-primary transition-all hover:border-accent/30 hover:bg-white/80"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        <button
          onClick={onNext}
          disabled={!isValid}
          className={`
            group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300
            ${isValid
              ? 'bg-button text-white hover:bg-button-hover hover:shadow-lg hover:scale-105'
              : 'bg-primary/10 text-secondary cursor-not-allowed'
            }
          `}
        >
          Review Booking
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

// Review & Confirm Component
interface ReviewStepProps {
  selectedService: string;
  selectedDate: string;
  selectedTime: string;
  userDetails: UserDetails;
  onBack: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}

const serviceMap: Record<string, string> = {
  'hair-styling': 'Hair Styling',
  'bridal-makeup': 'Bridal Makeup',
  'skincare': 'Skincare Treatment',
  'lash-brow': 'Lash & Brow',
};

export function ReviewStep({
  selectedService,
  selectedDate,
  selectedTime,
  userDetails,
  onBack,
  onConfirm,
  isSubmitting,
}: ReviewStepProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={`space-y-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="text-center">
        <h3 className="font-heading text-2xl text-primary sm:text-3xl">
          Review & Confirm
        </h3>
        <p className="mt-2 text-sm text-secondary">
          Please verify your booking details
        </p>
      </div>

      {/* Booking Summary Card */}
      <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
        <div className="border-b border-primary/10 bg-accent/5 px-5 py-4">
          <h4 className="font-heading text-base text-primary">Booking Summary</h4>
        </div>
        
        <div className="space-y-4 p-5">
          {/* Service */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs text-secondary">Service</p>
              <p className="font-medium text-primary">{serviceMap[selectedService]}</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Check className="h-4 w-4" />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4 border-t border-primary/5 pt-4">
            <div>
              <p className="text-xs text-secondary">Date</p>
              <p className="text-sm font-medium text-primary">{formatDate(selectedDate)}</p>
            </div>
            <div>
              <p className="text-xs text-secondary">Time</p>
              <p className="text-sm font-medium text-primary">{selectedTime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Details Card */}
      <div className="overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm">
        <div className="border-b border-primary/10 bg-accent/5 px-5 py-4">
          <h4 className="font-heading text-base text-primary">Your Information</h4>
        </div>
        
        <div className="space-y-3 p-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-secondary">Name</p>
              <p className="text-sm font-medium text-primary">{userDetails.name}</p>
            </div>
            <div>
              <p className="text-xs text-secondary">Phone</p>
              <p className="text-sm font-medium text-primary">{userDetails.phone}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-secondary">Email</p>
            <p className="text-sm font-medium text-primary">{userDetails.email}</p>
          </div>
          {userDetails.notes && (
            <div className="border-t border-primary/5 pt-3">
              <p className="text-xs text-secondary">Special Requests</p>
              <p className="text-sm text-primary">{userDetails.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="group inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-5 py-2.5 text-sm font-medium text-primary transition-all hover:border-accent/30 hover:bg-white/80 disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back
        </button>

        <button
          onClick={onConfirm}
          disabled={isSubmitting}
          className="group inline-flex items-center gap-2 rounded-full bg-button px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-button-hover hover:shadow-lg hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Confirming...
            </>
          ) : (
            <>
              Confirm Booking
              <Check className="h-4 w-4 transition-transform group-hover:scale-110" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
