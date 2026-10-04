import React, { useState } from 'react';
import { Property } from '../../types';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, Check, Shield } from 'lucide-react';

interface ViewingSchedulerProps {
  property: Property;
  onSuccess?: () => void;
}

export const ViewingScheduler: React.FC<ViewingSchedulerProps> = ({ property, onSuccess }) => {
  const { addViewing } = useApp();

  // Next 5 available dates
  const availableDates = [
    { dayName: 'Thu', dateStr: 'Oct 15', full: 'Thursday, Oct 15, 2026' },
    { dayName: 'Fri', dateStr: 'Oct 16', full: 'Friday, Oct 16, 2026' },
    { dayName: 'Sat', dateStr: 'Oct 17', full: 'Saturday, Oct 17, 2026' },
    { dayName: 'Sun', dateStr: 'Oct 18', full: 'Sunday, Oct 18, 2026' },
    { dayName: 'Tue', dateStr: 'Oct 20', full: 'Tuesday, Oct 20, 2026' },
  ];

  const timeSlots = [
    '10:30 AM – 11:30 AM (Morning Light)',
    '01:30 PM – 02:30 PM (Midday Solar)',
    '04:30 PM – 05:30 PM (Golden Hour)',
    '06:00 PM – 07:00 PM (Dusk Illumination)',
  ];

  const [selectedDate, setSelectedDate] = useState(availableDates[0].full);
  const [selectedSlot, setSelectedSlot] = useState(timeSlots[2]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    addViewing({
      propertyId: property.id,
      propertyName: property.name,
      propertyLocation: property.location,
      propertyImage: property.mainImage,
      clientName: name,
      email,
      phone: phone || '+962 79 000 0000',
      date: selectedDate,
      timeSlot: selectedSlot,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      if (onSuccess) onSuccess();
    }, 2400);
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#171717] text-white p-8 border border-[#242321] text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-[#B89B5E]/20 text-[#B89B5E] flex items-center justify-center">
          <Check className="w-6 h-6" />
        </div>
        <h4 className="font-serif text-2xl text-white">Private Tour Reserved</h4>
        <p className="text-xs text-[#D8D1C7] max-w-sm mx-auto leading-relaxed">
          Your private appointment for <span className="text-[#B89B5E]">{property.name}</span> on {selectedDate} ({selectedSlot.split('(')[0]}) has been placed in your portal.
        </p>
        <p className="text-[11px] text-[#77716A]">
          An ESTERA advisor will contact you to confirm gated access credentials.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#D8D1C7] p-6 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#D8D1C7]/50">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B89B5E] font-medium block">
            Private Protocol
          </span>
          <h4 className="font-serif text-xl text-[#171717]">
            Schedule an Architectural Viewing
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#77716A]">
          <Shield className="w-3.5 h-3.5 text-[#B89B5E]" />
          <span>Discreet Access</span>
        </div>
      </div>

      {/* Date selector tabs */}
      <div className="space-y-2">
        <label className="text-[11px] uppercase tracking-wider text-[#77716A] font-medium flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#171717]" />
          Select Preferred Date
        </label>
        <div className="grid grid-cols-5 gap-2">
          {availableDates.map((d) => {
            const isSelected = selectedDate === d.full;
            return (
              <button
                key={d.dateStr}
                type="button"
                onClick={() => setSelectedDate(d.full)}
                className={`py-2 px-1 text-center border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#171717] bg-[#171717] text-white'
                    : 'border-[#D8D1C7] bg-[#F7F4EF]/60 text-[#171717] hover:border-[#171717]'
                }`}
              >
                <span className="text-[10px] uppercase tracking-wider block opacity-70">
                  {d.dayName}
                </span>
                <span className="font-serif text-sm font-medium block">
                  {d.dateStr}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slot selector */}
      <div className="space-y-2">
        <label className="text-[11px] uppercase tracking-wider text-[#77716A] font-medium flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#171717]" />
          Solar & Natural Light Window
        </label>
        <div className="space-y-1.5">
          {timeSlots.map((slot) => {
            const isSelected = selectedSlot === slot;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`w-full text-left px-3.5 py-2 text-xs border transition-colors flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'border-[#171717] bg-[#F7F4EF] text-[#171717] font-medium'
                    : 'border-[#D8D1C7]/70 text-[#77716A] hover:text-[#171717] hover:border-[#171717]'
                }`}
              >
                <span>{slot}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#B89B5E]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Visitor Details */}
      <div className="space-y-3 pt-2 border-t border-[#D8D1C7]/50">
        <div>
          <label className="text-[11px] uppercase tracking-wider text-[#77716A] font-medium block mb-1">
            Principal Full Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Julian Sterling"
            className="w-full bg-[#F7F4EF]/50 border border-[#D8D1C7] px-3.5 py-2 text-xs text-[#171717] focus:border-[#171717] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-[#77716A] font-medium block mb-1">
              Confidential Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. sterling@consortium.co"
              className="w-full bg-[#F7F4EF]/50 border border-[#D8D1C7] px-3.5 py-2 text-xs text-[#171717] focus:border-[#171717] focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-wider text-[#77716A] font-medium block mb-1">
              Direct Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+962 79 ..."
              className="w-full bg-[#F7F4EF]/50 border border-[#D8D1C7] px-3.5 py-2 text-xs text-[#171717] focus:border-[#171717] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 bg-[#171717] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#242321] transition-colors cursor-pointer shadow-xs"
      >
        Confirm Viewing Appointment
      </button>
    </form>
  );
};
