import React, { useState } from 'react';
import { Property, Agent } from '../../types';
import { useApp } from '../../context/AppContext';
import { Mail, Phone, Calendar, Send, Check } from 'lucide-react';

interface InquiryPanelProps {
  property: Property;
  agent?: Agent;
  onOpenSchedule: () => void;
}

export const InquiryPanel: React.FC<InquiryPanelProps> = ({
  property,
  agent,
  onOpenSchedule,
}) => {
  const { addInquiry } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(
    `I am interested in ${property.name} (${property.formattedPrice}). Please provide architectural documentation and coordinate a confidential discussion.`
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    addInquiry({
      propertyId: property.id,
      propertyName: property.name,
      agentName: agent?.name || 'ESTERA Advisor',
      clientName: name,
      email,
      phone: phone || '+962 79 000 0000',
      type: 'Property Inquiry',
      message,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setEmail('');
      setPhone('');
    }, 4000);
  };

  return (
    <div className="bg-white border border-[#D8D1C7] p-6 lg:p-7 space-y-6 shadow-xs sticky top-24">
      {/* Price & Status */}
      <div className="pb-4 border-b border-[#D8D1C7]/50">
        <div className="flex items-center justify-between text-xs text-[#77716A] mb-1">
          <span className="uppercase tracking-widest">{property.status}</span>
          <span className="font-mono">{property.area} m² / {property.beds} Beds</span>
        </div>
        <div className="font-serif text-3xl text-[#171717] tabular-nums">
          {property.formattedPrice}
        </div>
      </div>

      {/* Assigned Advisor Mini Card */}
      {agent && (
        <div className="flex items-center gap-3.5 p-3.5 bg-[#F7F4EF] border border-[#D8D1C7]/60">
          <img
            src={agent.avatar}
            alt={agent.name}
            className="w-12 h-12 rounded-full object-cover shrink-0 border border-[#D8D1C7]"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[11px] uppercase tracking-wider text-[#B89B5E] block font-medium">
              Representing Partner
            </span>
            <h5 className="font-serif text-sm text-[#171717] truncate">
              {agent.name}
            </h5>
            <span className="text-[11px] text-[#77716A] block truncate">
              {agent.role}
            </span>
          </div>
        </div>
      )}

      {/* Schedule a Visit Trigger */}
      <button
        type="button"
        onClick={onOpenSchedule}
        className="w-full py-3 border border-[#171717] text-[#171717] hover:bg-[#171717] hover:text-white transition-colors text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 cursor-pointer"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Schedule a Visit</span>
      </button>

      {/* Inquiry Form */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-serif text-base text-[#171717]">
            Interested in this property?
          </h4>
          <span className="text-[10px] uppercase tracking-wider text-[#77716A]">
            Confidential
          </span>
        </div>

        {isSuccess ? (
          <div className="p-4 bg-[#F7F4EF] border border-[#D8D1C7] text-center space-y-2">
            <Check className="w-5 h-5 mx-auto text-[#B89B5E]" />
            <p className="text-xs text-[#171717] font-medium">
              Inquiry Dispatched to Advisory Desk
            </p>
            <p className="text-[11px] text-[#77716A]">
              We will be in touch via secure channels shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Full Name"
                className="w-full bg-[#F7F4EF]/50 border border-[#D8D1C7] px-3.5 py-2 text-xs text-[#171717] focus:border-[#171717] focus:outline-none"
              />
            </div>

            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full bg-[#F7F4EF]/50 border border-[#D8D1C7] px-3.5 py-2 text-xs text-[#171717] focus:border-[#171717] focus:outline-none"
              />
            </div>

            <div>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number (Optional)"
                className="w-full bg-[#F7F4EF]/50 border border-[#D8D1C7] px-3.5 py-2 text-xs text-[#171717] focus:border-[#171717] focus:outline-none"
              />
            </div>

            <div>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#F7F4EF]/50 border border-[#D8D1C7] px-3.5 py-2 text-xs text-[#171717] focus:border-[#171717] focus:outline-none resize-none leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#171717] text-white hover:bg-[#242321] transition-colors text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Request a Viewing</span>
            </button>
          </form>
        )}
      </div>

      {/* Direct Contact Links */}
      <div className="pt-2 border-t border-[#D8D1C7]/50 flex items-center justify-between text-xs text-[#77716A]">
        {agent && (
          <>
            <a
              href={`tel:${agent.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-[#171717] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Direct Call</span>
            </a>
            <span aria-hidden="true" className="text-[#D8D1C7]">·</span>
            <a
              href={`mailto:${agent.email}`}
              className="flex items-center gap-1.5 hover:text-[#171717] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Direct Email</span>
            </a>
          </>
        )}
      </div>
    </div>
  );
};
