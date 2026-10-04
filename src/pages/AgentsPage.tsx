import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { agentsData } from '../data/agents';
import { Agent } from '../types';
import { AgentCard } from '../components/agents/AgentCard';
import { AgentModal } from '../components/agents/AgentModal';
import { Award, Shield, Users, Building } from 'lucide-react';

export const AgentsPage: React.FC = () => {
  const { selectedAgentId } = useApp();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(() => {
    if (selectedAgentId) {
      return agentsData.find((a) => a.id === selectedAgentId) || null;
    }
    return null;
  });

  const [locationFilter, setLocationFilter] = useState('All');

  const locations = ['All', 'Amman', 'London', 'Dubai'];

  const filteredAgents = agentsData.filter((agent) => {
    if (locationFilter === 'All') return true;
    return agent.location.toLowerCase().includes(locationFilter.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16 space-y-16 pb-24">
      {/* Editorial Header */}
      <div className="space-y-4 pb-8 border-b border-[#D8D1C7]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89B5E] font-medium">
          <span>Private Advisory Desk</span>
          <span aria-hidden="true">·</span>
          <span>Partners & Associates</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#171717] tracking-tight">
          Advisors & Curators
        </h1>
        <p className="text-xs sm:text-sm text-[#77716A] max-w-2xl font-light leading-relaxed">
          ESTERA advisors operate at the nexus of architecture, financial advisory, and confidential brokerage. Our partners represent discerning individuals, family estates, and corporate institutions.
        </p>
      </div>

      {/* Filter Tabs by Hub */}
      <div className="flex items-center justify-between flex-wrap gap-4 pb-4">
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#D8D1C7]">
          {locations.map((loc) => {
            const isActive = locationFilter === loc;
            return (
              <button
                key={loc}
                onClick={() => setLocationFilter(loc)}
                className={`px-4 py-1.5 text-xs transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#171717] text-white font-medium shadow-xs'
                    : 'text-[#77716A] hover:text-[#171717]'
                }`}
              >
                {loc === 'All' ? 'All Offices' : `${loc} Hub`}
              </button>
            );
          })}
        </div>

        <span className="text-xs text-[#77716A] font-mono">
          Showing {filteredAgents.length} senior advisors
        </span>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredAgents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onSelect={(selected) => setSelectedAgent(selected)}
          />
        ))}
      </div>

      {/* Advisory Standards Strip */}
      <div className="p-8 md:p-12 bg-white border border-[#D8D1C7] grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-[#77716A]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#171717] font-semibold text-sm">
            <Shield className="w-4 h-4 text-[#B89B5E]" />
            <span>Absolute Discretion</span>
          </div>
          <p className="leading-relaxed font-light">
            All acquisition discussions, client identities, and private compound tours are guarded under non-disclosure protocols.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#171717] font-semibold text-sm">
            <Building className="w-4 h-4 text-[#B89B5E]" />
            <span>Architectural Vetting</span>
          </div>
          <p className="leading-relaxed font-light">
            Our advisors collaborate with spatial planners and heritage preservationists to evaluate authentic material value.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#171717] font-semibold text-sm">
            <Users className="w-4 h-4 text-[#B89B5E]" />
            <span>Private Mandates</span>
          </div>
          <p className="leading-relaxed font-light">
            Access to our unlisted private off-market ledger available exclusively through partner consultation.
          </p>
        </div>
      </div>

      {/* Agent Detail Modal */}
      <AgentModal
        agent={selectedAgent}
        onClose={() => setSelectedAgent(null)}
      />
    </div>
  );
};
