import React, { useState } from 'react';
import { Agent, Property } from '../../types';
import { propertiesData } from '../../data/properties';
import { useApp } from '../../context/AppContext';
import { X, Mail, Phone, MapPin, Award, Check, ArrowUpRight } from 'lucide-react';

interface AgentModalProps {
  agent: Agent | null;
  onClose: () => void;
}

export const AgentModal: React.FC<AgentModalProps> = ({ agent, onClose }) => {
  const { navigate, addInquiry } = useApp();

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [message, setMessage] = useState(
    'I would like to schedule a private advisory consultation regarding property acquisition.'
  );
  const [isSuccess, setIsSuccess] = useState(false);

  if (!agent) return null;

  const agentProperties = propertiesData.filter((p) => p.agentId === agent.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    addInquiry({
      agentName: agent.name,
      clientName,
      email: clientEmail,
      phone: clientPhone || '+962 79 000 0000',
      type: 'Agent Consultation',
      message,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  const handlePropertyClick = (property: Property) => {
    onClose();
    navigate('property-detail', { propertySlug: property.slug });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/70 backdrop-blur-xs overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-[#F7F4EF] border border-[#D8D1C7] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header with Close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D8D1C7] bg-white sticky top-0 z-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B89B5E] block font-medium">
              ESTERA Private Advisor Dossier
            </span>
            <h3 className="font-serif text-xl text-[#171717]">
              {agent.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#77716A] hover:text-[#171717] transition-colors cursor-pointer"
            aria-label="Close advisor dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8">
          {/* Top Profile Summary */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <div className="aspect-4/5 w-full overflow-hidden bg-stone-200 border border-[#D8D1C7]">
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-4 p-4 bg-white border border-[#D8D1C7]/70 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#77716A]">
                  <MapPin className="w-3.5 h-3.5 text-[#171717]" />
                  <span>{agent.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[#77716A]">
                  <Phone className="w-3.5 h-3.5 text-[#171717]" />
                  <a href={`tel:${agent.phone.replace(/\s+/g, '')}`} className="hover:text-[#171717]">
                    {agent.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-[#77716A]">
                  <Mail className="w-3.5 h-3.5 text-[#171717]" />
                  <a href={`mailto:${agent.email}`} className="hover:text-[#171717] truncate">
                    {agent.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 space-y-5">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B89B5E] font-medium block">
                  {agent.role}
                </span>
                <h2 className="font-serif text-3xl text-[#171717] mt-1">
                  {agent.name}
                </h2>
                <div className="flex items-center gap-4 text-xs text-[#77716A] mt-2">
                  <span>
                    <strong className="text-[#171717] font-mono">{agent.propertiesCount}</strong> Portfolio Listings
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    <strong className="text-[#171717] font-mono">{agent.yearsExperience}</strong> Years Experience
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    <strong className="text-[#171717] font-mono">{agent.recentSalesVolume}</strong> Volume
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#171717] font-semibold mb-2">
                  Curatorial Biography
                </h4>
                <p className="text-xs text-[#77716A] leading-relaxed font-light">
                  {agent.bio}
                </p>
              </div>

              {/* Specialties */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#171717] font-semibold mb-2.5">
                  Advisory Practice Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {agent.specialties.map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white border border-[#D8D1C7] text-xs text-[#171717]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#171717] font-semibold mb-1">
                  Languages
                </h4>
                <div className="text-xs text-[#77716A] flex items-center gap-2">
                  {agent.languages.join(' · ')}
                </div>
              </div>
            </div>
          </div>

          {/* Active Listings Represented */}
          {agentProperties.length > 0 && (
            <div className="pt-6 border-t border-[#D8D1C7]">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-serif text-xl text-[#171717]">
                  Curated Listings by {agent.name}
                </h4>
                <span className="text-xs font-mono text-[#77716A]">
                  {agentProperties.length} available
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {agentProperties.map((prop) => (
                  <div
                    key={prop.id}
                    onClick={() => handlePropertyClick(prop)}
                    className="p-3 bg-white border border-[#D8D1C7] flex items-center gap-3.5 hover:border-[#171717] cursor-pointer transition-colors group"
                  >
                    <img
                      src={prop.mainImage}
                      alt={prop.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-[#77716A] block">
                        {prop.type} · {prop.city}
                      </span>
                      <h5 className="font-serif text-sm text-[#171717] group-hover:text-[#B89B5E] transition-colors truncate">
                        {prop.name}
                      </h5>
                      <span className="font-mono text-xs text-[#171717] font-medium block">
                        {prop.formattedPrice}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#77716A] group-hover:text-[#171717] shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Consultation Request Form */}
          <div className="p-6 bg-white border border-[#D8D1C7] space-y-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B89B5E] font-medium block">
                Direct Dialogue
              </span>
              <h4 className="font-serif text-xl text-[#171717]">
                Request Confidential Consultation with {agent.name}
              </h4>
            </div>

            {isSuccess ? (
              <div className="p-4 bg-[#F7F4EF] text-center space-y-2">
                <Check className="w-6 h-6 mx-auto text-[#B89B5E]" />
                <p className="text-xs text-[#171717] font-medium">
                  Consultation Request Dispatched
                </p>
                <p className="text-[11px] text-[#77716A]">
                  {agent.name}’s office will review your requirements discreetly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#F7F4EF]/50 border border-[#D8D1C7] px-3.5 py-2 text-xs text-[#171717] focus:border-[#171717] focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Confidential Email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-[#F7F4EF]/50 border border-[#D8D1C7] px-3.5 py-2 text-xs text-[#171717] focus:border-[#171717] focus:outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Direct Phone"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-[#F7F4EF]/50 border border-[#D8D1C7] px-3.5 py-2 text-xs text-[#171717] focus:border-[#171717] focus:outline-none"
                  />
                </div>
                <textarea
                  rows={2}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#F7F4EF]/50 border border-[#D8D1C7] px-3.5 py-2 text-xs text-[#171717] focus:border-[#171717] focus:outline-none resize-none leading-relaxed"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#242321] transition-colors cursor-pointer"
                  >
                    Submit Consultation Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
