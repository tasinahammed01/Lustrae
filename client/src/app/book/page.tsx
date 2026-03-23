'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Calendar, ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';
import { StepIndicator } from '@/components/booking/StepIndicator';
import { ServiceSelector } from '@/components/booking/ServiceSelector';
import { TimeSelector } from '@/components/booking/TimeSelector';
import { BookingForm, ReviewStep } from '@/components/booking/BookingForm';

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

interface BookingData {
  service: string | null;
  date: string | null;
  time: string | null;
  userDetails: UserDetails;
}

// Storage key for localStorage
const STORAGE_KEY = 'lustrae_booking_data';

export default function BookPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    service: null,
    date: null,
    time: null,
    userDetails: {
      name: '',
      email: '',
      phone: '',
      notes: '',
    },
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setBookingData(prev => ({
          ...prev,
          ...parsed,
        }));
      } catch {
        // Ignore parse errors
      }
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    if (!isSuccess) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookingData));
    }
  }, [bookingData, isSuccess]);

  // Clear storage on success
  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [isSuccess]);

  const handleServiceSelect = (serviceId: string) => {
    setBookingData(prev => ({ ...prev, service: serviceId }));
  };

  const handleDateSelect = (date: string) => {
    setBookingData(prev => ({ ...prev, date, time: null }));
  };

  const handleTimeSelect = (time: string) => {
    setBookingData(prev => ({ ...prev, time }));
  };

  const handleUserDetailsUpdate = (details: UserDetails) => {
    setBookingData(prev => ({ ...prev, userDetails: details }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Log booking data (for now)
    console.log('Booking Confirmed:', {
      service: bookingData.service,
      date: bookingData.date,
      time: bookingData.time,
      userDetails: bookingData.userDetails,
      timestamp: new Date().toISOString(),
    });

    // Prepare data for future API integration
    const apiPayload = {
      serviceId: bookingData.service,
      appointmentDate: bookingData.date,
      appointmentTime: bookingData.time,
      customer: {
        name: bookingData.userDetails.name,
        email: bookingData.userDetails.email,
        phone: bookingData.userDetails.phone,
      },
      notes: bookingData.userDetails.notes,
    };
    console.log('API Payload (for future backend integration):', apiPayload);

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  // Success State
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background" />
          <div className="relative mx-auto max-w-7xl px-6 py-16 text-center lg:py-24">
            <div className="mx-auto max-w-md">
              {/* Success Animation */}
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 shadow-lg animate-bounce">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              </div>

              <h1 className="font-heading text-3xl text-primary sm:text-4xl">
                Booking Confirmed!
              </h1>
              <p className="mt-4 text-base text-secondary">
                Thank you, <span className="font-medium text-primary">{bookingData.userDetails.name}</span>.
                Your appointment has been scheduled successfully.
              </p>

              {/* Booking Summary */}
              <div className="mt-8 rounded-xl border border-primary/10 bg-white/80 p-6 text-left shadow-sm backdrop-blur-sm">
                <div className="flex items-center gap-2 border-b border-primary/10 pb-4">
                  <Calendar className="h-5 w-5 text-accent" />
                  <h3 className="font-heading text-sm font-medium text-primary">
                    Appointment Details
                  </h3>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary">Service</span>
                    <span className="font-medium text-primary">
                      {bookingData.service === 'hair-styling' && 'Hair Styling'}
                      {bookingData.service === 'bridal-makeup' && 'Bridal Makeup'}
                      {bookingData.service === 'skincare' && 'Skincare Treatment'}
                      {bookingData.service === 'lash-brow' && 'Lash & Brow'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Date</span>
                    <span className="font-medium text-primary">
                      {bookingData.date && new Date(bookingData.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">Time</span>
                    <span className="font-medium text-primary">{bookingData.time}</span>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-xs text-secondary">
                A confirmation email has been sent to{' '}
                <span className="text-primary">{bookingData.userDetails.email}</span>
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-button px-6 py-3 text-sm font-medium text-white transition-all hover:bg-button-hover hover:shadow-lg"
                >
                  <Home className="h-4 w-4" />
                  Return Home
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white px-6 py-3 text-sm font-medium text-primary transition-all hover:bg-white/80"
                >
                  Explore More Services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-background" />
        
        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238C7A5B' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Reserve Your Spot
            </p>
            <h1 className="mt-4 font-heading text-3xl leading-tight text-primary sm:text-4xl lg:text-5xl">
              Book Your Appointment
            </h1>
            <p className="mt-4 text-base text-secondary">
              Choose your service, preferred time, and let us take care of the rest.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="rounded-2xl border border-primary/10 bg-white/70 p-6 shadow-xl backdrop-blur-sm sm:p-8 lg:p-10">
          {/* Step Indicator */}
          <div className="mb-8">
            <StepIndicator currentStep={currentStep} />
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {currentStep === 1 && (
              <ServiceSelector
                selectedService={bookingData.service}
                onSelect={handleServiceSelect}
                onNext={handleNext}
              />
            )}

            {currentStep === 2 && (
              <TimeSelector
                selectedDate={bookingData.date}
                selectedTime={bookingData.time}
                onSelectDate={handleDateSelect}
                onSelectTime={handleTimeSelect}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 3 && (
              <BookingForm
                userDetails={bookingData.userDetails}
                onUpdateDetails={handleUserDetailsUpdate}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 4 && bookingData.service && bookingData.date && bookingData.time && (
              <ReviewStep
                selectedService={bookingData.service}
                selectedDate={bookingData.date}
                selectedTime={bookingData.time}
                userDetails={bookingData.userDetails}
                onBack={handleBack}
                onConfirm={handleConfirm}
                isSubmitting={isSubmitting}
              />
            )}
          </div>
        </div>

        {/* Help Text */}
        <p className="mt-6 text-center text-xs text-secondary">
          Need help?{' '}
          <Link href="/contact" className="text-accent underline-offset-2 hover:underline">
            Contact us
          </Link>{' '}
          or call us at{' '}
          <a href="tel:+15550000000" className="text-accent underline-offset-2 hover:underline">
            (555) 000-0000
          </a>
        </p>
      </section>
    </div>
  );
}
