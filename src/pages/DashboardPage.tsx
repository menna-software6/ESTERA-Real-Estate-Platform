import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { propertiesData } from '../data/properties';
import { PropertyCard } from '../components/properties/PropertyCard';
import {
  Bookmark,
  Calendar,
  MessageSquare,
  Clock,
  CheckCircle2,
  Trash2,
  ArrowUpRight,
  User,
  Shield,
  FileText
} from 'lucide-react';

type DashboardTab = 'overview' | 'saved' | 'viewings' | 'inquiries' | 'profile';

export const DashboardPage: React.FC = () => {
  const {
    savedPropertyIds,
    viewings,
    cancelViewing,
    inquiries,
    activities,
    recentlyViewedSlugs,
    navigate,
  } = useApp();

  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

  const savedProperties = propertiesData.filter((p) =>
    savedPropertyIds.includes(p.id)
  );

  const recentlyViewedProperties = propertiesData.filter((p) =>
    recentlyViewedSlugs.includes(p.slug)
  );

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16 space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D8D1C7]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89B5E] font-medium">
            <span>Client Portal</span>
            <span aria-hidden="true">·</span>
            <span>Private Advisory Desk</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#171717] tracking-tight">
            Principal Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-[#77716A] max-w-xl font-light leading-relaxed">
            Consolidated overview of shortlisted residences, confirmed architectural tours, and ongoing acquisition inquiries.
          </p>
        </div>

        {/* Client Profile Pill */}
        <div className="flex items-center gap-3 p-3 bg-white border border-[#D8D1C7] self-start md:self-auto">
          <div className="w-10 h-10 rounded-full bg-[#171717] text-white flex items-center justify-center font-serif text-base">
            JS
          </div>
          <div className="text-xs">
            <span className="font-medium text-[#171717] block">Julian Sterling</span>
            <span className="text-[#77716A] text-[11px] block">Tier I Private Principal</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-white border border-[#D8D1C7] overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview', icon: FileText },
          { id: 'saved', label: `Saved (${savedPropertyIds.length})`, icon: Bookmark },
          { id: 'viewings', label: `Scheduled Viewings (${viewings.length})`, icon: Calendar },
          { id: 'inquiries', label: `Active Inquiries (${inquiries.length})`, icon: MessageSquare },
          { id: 'profile', label: 'Mandate & Profile', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as DashboardTab)}
              className={`flex items-center gap-2 px-4 py-2 text-xs tracking-wider uppercase transition-colors whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#171717] text-white font-medium shadow-xs'
                  : 'text-[#77716A] hover:text-[#171717]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-12">
          {/* 4 Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div
              onClick={() => setActiveTab('saved')}
              className="p-6 bg-white border border-[#D8D1C7] hover:border-[#171717] cursor-pointer transition-colors space-y-2"
            >
              <div className="flex items-center justify-between text-[#77716A]">
                <span className="text-[11px] uppercase tracking-wider">Saved Properties</span>
                <Bookmark className="w-4 h-4 text-[#B89B5E]" />
              </div>
              <div className="font-serif text-3xl sm:text-4xl text-[#171717] tabular-nums">
                {savedPropertyIds.length}
              </div>
              <span className="text-[11px] text-[#77716A] block">Curated shortlist</span>
            </div>

            <div
              onClick={() => setActiveTab('viewings')}
              className="p-6 bg-white border border-[#D8D1C7] hover:border-[#171717] cursor-pointer transition-colors space-y-2"
            >
              <div className="flex items-center justify-between text-[#77716A]">
                <span className="text-[11px] uppercase tracking-wider">Upcoming Viewings</span>
                <Calendar className="w-4 h-4 text-[#B89B5E]" />
              </div>
              <div className="font-serif text-3xl sm:text-4xl text-[#171717] tabular-nums">
                {viewings.length}
              </div>
              <span className="text-[11px] text-[#77716A] block">Confirmed private tours</span>
            </div>

            <div
              onClick={() => setActiveTab('inquiries')}
              className="p-6 bg-white border border-[#D8D1C7] hover:border-[#171717] cursor-pointer transition-colors space-y-2"
            >
              <div className="flex items-center justify-between text-[#77716A]">
                <span className="text-[11px] uppercase tracking-wider">Active Inquiries</span>
                <MessageSquare className="w-4 h-4 text-[#B89B5E]" />
              </div>
              <div className="font-serif text-3xl sm:text-4xl text-[#171717] tabular-nums">
                {inquiries.length}
              </div>
              <span className="text-[11px] text-[#77716A] block">Ongoing discussions</span>
            </div>

            <div className="p-6 bg-white border border-[#D8D1C7] space-y-2">
              <div className="flex items-center justify-between text-[#77716A]">
                <span className="text-[11px] uppercase tracking-wider">Recently Viewed</span>
                <Clock className="w-4 h-4 text-[#B89B5E]" />
              </div>
              <div className="font-serif text-3xl sm:text-4xl text-[#171717] tabular-nums">
                {recentlyViewedProperties.length}
              </div>
              <span className="text-[11px] text-[#77716A] block">Active browsing session</span>
            </div>
          </div>

          {/* Activity Timeline & Upcoming Viewings row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Recent Activity Timeline */}
            <div className="lg:col-span-6 bg-white border border-[#D8D1C7] p-6 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#D8D1C7]/50">
                <h3 className="font-serif text-xl text-[#171717]">
                  Recent Activity Timeline
                </h3>
                <span className="text-[11px] uppercase tracking-wider text-[#77716A]">
                  Real-time Log
                </span>
              </div>

              <div className="space-y-4">
                {activities.map((act) => (
                  <div key={act.id} className="flex items-start gap-3.5 pb-3 border-b border-[#D8D1C7]/30 last:border-none">
                    <div className="w-2 h-2 rounded-full bg-[#B89B5E] mt-1.5 shrink-0" />
                    <div className="flex-1 text-xs">
                      <p className="text-[#171717] font-medium leading-relaxed">
                        {act.text}
                      </p>
                      <span className="text-[11px] text-[#77716A] font-mono">
                        {act.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Viewings Quick Preview */}
            <div className="lg:col-span-6 bg-white border border-[#D8D1C7] p-6 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#D8D1C7]/50">
                <h3 className="font-serif text-xl text-[#171717]">
                  Next Scheduled Viewing
                </h3>
                <button
                  onClick={() => setActiveTab('viewings')}
                  className="text-xs uppercase tracking-wider text-[#B89B5E] hover:underline"
                >
                  View All
                </button>
              </div>

              {viewings.length > 0 ? (
                <div className="p-4 bg-[#F7F4EF] border border-[#D8D1C7]/70 space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={viewings[0].propertyImage}
                      alt={viewings[0].propertyName}
                      className="w-16 h-16 object-cover"
                    />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#B89B5E] font-medium block">
                        Confirmed Appointment
                      </span>
                      <h4 className="font-serif text-lg text-[#171717]">
                        {viewings[0].propertyName}
                      </h4>
                      <span className="text-xs text-[#77716A]">
                        {viewings[0].propertyLocation}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#D8D1C7]/50 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[#77716A] block text-[11px]">Date</span>
                      <span className="font-medium text-[#171717]">{viewings[0].date}</span>
                    </div>
                    <div>
                      <span className="text-[#77716A] block text-[11px]">Time Window</span>
                      <span className="font-medium text-[#171717]">{viewings[0].timeSlot}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#77716A]">No upcoming viewings scheduled.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Saved Properties */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-2xl text-[#171717]">
              Saved Residences ({savedProperties.length})
            </h3>
            <button
              onClick={() => navigate('properties')}
              className="text-xs uppercase tracking-wider text-[#171717] hover:text-[#B89B5E]"
            >
              Browse More Properties →
            </button>
          </div>

          {savedProperties.length === 0 ? (
            <div className="p-12 text-center bg-white border border-[#D8D1C7]">
              <p className="text-xs text-[#77716A]">No saved properties in your collection yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Scheduled Viewings */}
      {activeTab === 'viewings' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-2xl text-[#171717]">
              Confirmed Viewings ({viewings.length})
            </h3>
          </div>

          <div className="space-y-4">
            {viewings.map((viewing) => (
              <div
                key={viewing.id}
                className="p-6 bg-white border border-[#D8D1C7] flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={viewing.propertyImage}
                    alt={viewing.propertyName}
                    className="w-20 h-20 object-cover shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#171717] text-white">
                        {viewing.status}
                      </span>
                      <span className="text-xs text-[#77716A]">ID: {viewing.id}</span>
                    </div>
                    <h4 className="font-serif text-xl text-[#171717]">
                      {viewing.propertyName}
                    </h4>
                    <p className="text-xs text-[#77716A]">
                      {viewing.propertyLocation}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-xs">
                  <div>
                    <span className="text-[#77716A] block text-[11px]">Appointment Date</span>
                    <span className="font-medium text-[#171717]">{viewing.date}</span>
                    <span className="text-[11px] text-[#77716A] block font-mono">{viewing.timeSlot}</span>
                  </div>

                  <button
                    onClick={() => cancelViewing(viewing.id)}
                    className="text-xs text-red-600 hover:text-red-800 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel Appointment</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Active Inquiries */}
      {activeTab === 'inquiries' && (
        <div className="space-y-6">
          <h3 className="font-serif text-2xl text-[#171717]">
            Advisory Communications ({inquiries.length})
          </h3>

          <div className="space-y-4">
            {inquiries.map((inq) => (
              <div key={inq.id} className="p-6 bg-white border border-[#D8D1C7] space-y-3">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-[#D8D1C7]/50">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#F7F4EF] text-[#171717] font-medium border border-[#D8D1C7]">
                      {inq.type}
                    </span>
                    <span className="text-[#77716A]">Advisor: {inq.agentName || 'Private Desk'}</span>
                  </div>
                  <span className="font-mono text-[#77716A]">{inq.createdAt}</span>
                </div>

                {inq.propertyName && (
                  <h4 className="font-serif text-lg text-[#171717]">
                    Subject: {inq.propertyName}
                  </h4>
                )}

                <p className="text-xs text-[#77716A] font-light leading-relaxed">
                  "{inq.message}"
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs text-[#B89B5E] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Status: {inq.status} by ESTERA Partner</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Profile & Mandate */}
      {activeTab === 'profile' && (
        <div className="bg-white border border-[#D8D1C7] p-8 space-y-6 max-w-2xl">
          <div className="space-y-2 pb-4 border-b border-[#D8D1C7]">
            <span className="text-xs uppercase tracking-widest text-[#B89B5E] font-medium block">
              Confidential Client File
            </span>
            <h3 className="font-serif text-2xl text-[#171717]">
              Julian Sterling
            </h3>
            <p className="text-xs text-[#77716A]">
              Consortium Capital Partners · London & Amman Mandate
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-[#D8D1C7]/40">
              <span className="text-[#77716A]">Primary Acquisition Focus:</span>
              <span className="font-medium text-[#171717]">Architectural Villas & Penthouses ($500k – $1.5M)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#D8D1C7]/40">
              <span className="text-[#77716A]">Confidential Email:</span>
              <span className="font-mono text-[#171717]">sterling@consortium.co</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#D8D1C7]/40">
              <span className="text-[#77716A]">Direct Phone:</span>
              <span className="font-mono text-[#171717]">+962 79 555 4120</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#D8D1C7]/40">
              <span className="text-[#77716A]">Representation Agreement:</span>
              <span className="text-[#B89B5E] font-medium">Active (NDA Signed)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
