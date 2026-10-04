import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addInquiry } = useApp();

  const [inquiryType, setInquiryType] = useState<
    'General' | 'Property Inquiry' | 'Agent Consultation'
  >('General');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    addInquiry({
      clientName: name,
      email,
      phone: phone || '+962 79 000 0000',
      type: inquiryType,
      message,
    });

    setIsSuccess(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16 space-y-16 pb-24">
      {/* Header */}
      <div className="space-y-4 pb-8 border-b border-[#D8D1C7]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89B5E] font-medium">
          <span>Private Advisory Desk</span>
          <span aria-hidden="true">·</span>
          <span>Global Presence</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#171717] tracking-tight">
          Initiate a Dialogue
        </h1>
        <p className="text-xs sm:text-sm text-[#77716A] max-w-2xl font-light leading-relaxed">
          Whether you are looking to acquire an architectural estate, commission an off-market search, or represent a significant property, our partners remain at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white border border-[#D8D1C7] p-8 sm:p-10 space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B89B5E] font-medium block">
              Confidential Correspondence
            </span>
            <h2 className="font-serif text-2xl text-[#171717]">
              Advisory Inquiry Form
            </h2>
          </div>

          {isSuccess ? (
            <div className="p-8 bg-[#F7F4EF] border border-[#D8D1C7] text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 mx-auto text-[#B89B5E]" />
              <h3 className="font-serif text-xl text-[#171717]">
                Message Transmitted Successfully
              </h3>
              <p className="text-xs text-[#77716A] max-w-md mx-auto leading-relaxed">
                Thank you for reaching out to ESTERA. Your communication has been dispatched to our private client advisory desk and recorded in your portal.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Inquiry Type Radio / Segmented Tabs */}
              <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider text-[#77716A] font-medium block">
                  Nature of Inquiry
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(
                    ['General', 'Property Inquiry', 'Agent Consultation'] as const
                  ).map((type) => {
                    const isSelected = inquiryType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setInquiryType(type)}
                        className={`py-2 px-3 text-xs border transition-colors cursor-pointer text-center ${
                          isSelected
                            ? 'bg-[#171717] border-[#171717] text-white font-medium'
                            : 'bg-[#F7F4EF]/50 border-[#D8D1C7] text-[#171717] hover:border-[#171717]'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#77716A] font-medium block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Julian Sterling"
                    className="w-full bg-[#F7F4EF]/50 border border-[#D8D1C7] px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-wider text-[#77716A] font-medium block">
                    Confidential Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. sterling@consortium.co"
                    className="w-full bg-[#F7F4EF]/50 border border-[#D8D1C7] px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#77716A] font-medium block">
                  Telephone (with country code)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+962 79 ..."
                  className="w-full bg-[#F7F4EF]/50 border border-[#D8D1C7] px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#77716A] font-medium block">
                  Message / Requirements *
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Outline your spatial requirements, preferred enclave, or specific property ref..."
                  className="w-full bg-[#F7F4EF]/50 border border-[#D8D1C7] px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none focus:border-[#171717] resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#242321] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Confidential Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Office Details & Contacts */}
        <div className="lg:col-span-5 space-y-8">
          {/* Main Offices */}
          <div className="bg-white border border-[#D8D1C7] p-8 space-y-6">
            <h3 className="font-serif text-xl text-[#171717] pb-3 border-b border-[#D8D1C7]/50">
              Private Advisory Offices
            </h3>

            {/* Amman */}
            <div className="space-y-1.5 text-xs">
              <span className="text-xs uppercase tracking-wider text-[#B89B5E] font-medium block">
                Amman Headquarters
              </span>
              <p className="font-medium text-[#171717]">
                4th Circle, Zahran Diplomatic District
              </p>
              <p className="text-[#77716A]">Amman 11183, Jordan</p>
              <p className="text-[#77716A] font-mono">+962 6 590 3200</p>
            </div>

            {/* London */}
            <div className="space-y-1.5 text-xs pt-4 border-t border-[#D8D1C7]/40">
              <span className="text-xs uppercase tracking-wider text-[#B89B5E] font-medium block">
                London Liaison Desk
              </span>
              <p className="font-medium text-[#171717]">
                Berkeley Square House, Mayfair
              </p>
              <p className="text-[#77716A]">London W1J 6BD, United Kingdom</p>
              <p className="text-[#77716A] font-mono">+44 20 7946 0880</p>
            </div>

            {/* Dubai */}
            <div className="space-y-1.5 text-xs pt-4 border-t border-[#D8D1C7]/40">
              <span className="text-xs uppercase tracking-wider text-[#B89B5E] font-medium block">
                Dubai Private Office
              </span>
              <p className="font-medium text-[#171717]">
                Gate Precinct Building 4, DIFC
              </p>
              <p className="text-[#77716A]">Dubai, United Arab Emirates</p>
              <p className="text-[#77716A] font-mono">+971 4 362 8000</p>
            </div>
          </div>

          {/* Operational Hours */}
          <div className="p-6 bg-[#242321] text-white border border-[#171717] space-y-3 text-xs">
            <div className="flex items-center gap-2 text-[#B89B5E]">
              <Clock className="w-4 h-4" />
              <span className="uppercase tracking-widest font-medium text-[11px]">
                Advisory Hours
              </span>
            </div>
            <p className="text-[#D8D1C7]/80 font-light leading-relaxed">
              Monday through Saturday: 09:00 – 18:30 (GMT+3). Private tours available 7 days a week by confirmed appointment.
            </p>
            <div className="pt-2 text-[11px] text-[#B89B5E] font-mono">
              DIRECT DESK: advisory@estera-realestate.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
