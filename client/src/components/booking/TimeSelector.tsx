'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const timeSlots = [
  '10:00 AM',
  '12:00 PM',
  '2:00 PM',
  '4:00 PM',
];

// Generate next 14 days for selection
function generateAvailableDates(): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    // Skip Sundays (0) as most salons are closed
    if (date.getDay() !== 0) {
      dates.push(date);
    }
  }
  
  return dates.slice(0, 10); // Return up to 10 available dates
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface TimeSelectorProps {
  selectedDate: string | null;
  selectedTime: string | null;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function TimeSelector({
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
  onNext,
  onBack,
}: TimeSelectorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [datePage, setDatePage] = useState(0);
  const datesPerPage = 5;

  useEffect(() => {
    setIsVisible(true);
    setAvailableDates(generateAvailableDates());
  }, []);

  const totalPages = Math.ceil(availableDates.length / datesPerPage);
  const visibleDates = availableDates.slice(
    datePage * datesPerPage,
    (datePage + 1) * datesPerPage
  );

  const isValid = selectedDate && selectedTime;

  const formatDateKey = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className={`space-y-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="text-center">
        <h3 className="font-heading text-2xl text-primary sm:text-3xl">
          Choose Date & Time
        </h3>
        <p className="mt-2 text-sm text-secondary">
          Select your preferred appointment slot
        </p>
      </div>

      {/* Date Selection */}
      <div className="rounded-xl border border-primary/10 bg-white/60 p-5 backdrop-blur-sm">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-primary">Select Date</span>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setDatePage(Math.max(0, datePage - 1))}
                disabled={datePage === 0}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/10 bg-white text-secondary transition-colors hover:border-accent/30 hover:text-accent disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs text-secondary">
                {datePage + 1} / {totalPages}
              </span>
              <button
                onClick={() => setDatePage(Math.min(totalPages - 1, datePage + 1))}
                disabled={datePage === totalPages - 1}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/10 bg-white text-secondary transition-colors hover:border-accent/30 hover:text-accent disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-5 gap-2">
          {visibleDates.map((date) => {
            const dateKey = formatDateKey(date);
            const isSelected = selectedDate === dateKey;
            const dayName = weekDays[date.getDay()];
            const dayNum = date.getDate();
            const month = months[date.getMonth()];

            return (
              <button
                key={dateKey}
                onClick={() => onSelectDate(dateKey)}
                className={`
                  group flex flex-col items-center gap-1 rounded-lg border p-3 transition-all duration-300
                  ${isSelected
                    ? 'border-accent bg-accent text-white shadow-md'
                    : 'border-primary/10 bg-white hover:border-accent/30 hover:shadow-sm'
                  }
                `}
              >
                <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-secondary'}`}>
                  {dayName}
                </span>
                <span className={`font-heading text-lg font-medium ${isSelected ? 'text-white' : 'text-primary'}`}>
                  {dayNum}
                </span>
                <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-secondary'}`}>
                  {month}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Selection */}
      <div className="rounded-xl border border-primary/10 bg-white/60 p-5 backdrop-blur-sm">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium text-primary">Select Time</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {timeSlots.map((time) => {
            const isSelected = selectedTime === time;

            return (
              <button
                key={time}
                onClick={() => onSelectTime(time)}
                disabled={!selectedDate}
                className={`
                  relative flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm transition-all duration-300
                  ${!selectedDate
                    ? 'border-primary/5 bg-primary/5 text-secondary/50 cursor-not-allowed'
                    : isSelected
                    ? 'border-accent bg-accent text-white shadow-md'
                    : 'border-primary/10 bg-white text-primary hover:border-accent/30 hover:shadow-sm'
                  }
                `}
              >
                {isSelected && <Check className="h-4 w-4" />}
                {time}
              </button>
            );
          })}
        </div>
        {!selectedDate && (
          <p className="mt-3 text-center text-xs text-secondary">
            Please select a date first
          </p>
        )}
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
          Continue
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
