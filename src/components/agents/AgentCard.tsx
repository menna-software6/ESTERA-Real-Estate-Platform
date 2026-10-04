import React from 'react';
import { Agent } from '../../types';
import { ArrowUpRight, MapPin, Briefcase, Award } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  onSelect: (agent: Agent) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onSelect }) => {
  return (
    <article
      onClick={() => onSelect(agent)}
      className="group bg-white border border-[#D8D1C7]/70 hover:border-[#171717] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Portrait with subtle zoom */}
        <div className="relative aspect-4/5 w-full overflow-hidden bg-[#F7F4EF]">
          <img
            src={agent.avatar}
            alt={agent.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[10px] uppercase tracking-widest text-[#B89B5E] block font-medium">
              {agent.location}
            </span>
            <h3 className="font-serif text-2xl text-white group-hover:text-[#B89B5E] transition-colors">
              {agent.name}
            </h3>
            <span className="text-xs text-[#D8D1C7]/90 block font-light">
              {agent.role}
            </span>
          </div>
        </div>

        {/* Info & Stats */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-[#77716A] line-clamp-3 leading-relaxed font-light">
            {agent.bio}
          </p>

          <div className="pt-3 border-t border-[#D8D1C7]/50 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[#77716A] text-[11px] block">Representing</span>
              <span className="font-mono text-[#171717] font-semibold tabular-nums">
                {agent.propertiesCount} properties
              </span>
            </div>
            <div>
              <span className="text-[#77716A] text-[11px] block">Experience</span>
              <span className="font-mono text-[#171717] font-semibold tabular-nums">
                {agent.yearsExperience} years
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-1">
        <button
          type="button"
          className="w-full py-2.5 text-xs uppercase tracking-wider text-[#171717] border border-[#D8D1C7] group-hover:border-[#171717] group-hover:bg-[#171717] group-hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-medium"
        >
          <span>View Profile & Listings</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
