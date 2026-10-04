import { Agent } from '../types';
import linaImg from '../assets/images/agent_lina_haddad_1791124760815.jpg';
import omarImg from '../assets/images/agent_omar_khalil_1791124772797.jpg';
import nourImg from '../assets/images/agent_nour_mansour_1791124784762.jpg';
import tariqImg from '../assets/images/agent_tariq_zein_1791124795988.jpg';

export const agentsData: Agent[] = [
  {
    id: 'agent-1',
    name: 'Lina Haddad',
    role: 'Senior Property Advisor',
    location: 'Amman & London',
    propertiesCount: 48,
    yearsExperience: 14,
    phone: '+962 6 590 3210',
    email: 'l.haddad@estera-realestate.com',
    avatar: linaImg,
    bio: 'With over a decade of specialized expertise in modern residential estates and private commissions, Lina advises discerning buyers on private acquisitions across Amman and the Levant. Her background in spatial design informs her architectural curation.',
    specialties: ['Architectural Villas', 'Private Estates', 'Off-Market Commissions', 'Heritage Restorations'],
    languages: ['Arabic', 'English', 'French'],
    recentSalesVolume: '$42M / Year',
  },
  {
    id: 'agent-2',
    name: 'Omar Khalil',
    role: 'Luxury Property Consultant',
    location: 'Amman & Dubai',
    propertiesCount: 31,
    yearsExperience: 11,
    phone: '+962 6 590 3211',
    email: 'o.khalil@estera-realestate.com',
    avatar: omarImg,
    bio: 'Omar specializes in premier urban penthouses, prime high-rise developments, and contemporary architectural apartments. His deep institutional knowledge of regional capital appreciation provides clients with astute advisory guidance.',
    specialties: ['Penthouses & High-Rise', 'Investment Portfolios', 'Contemporary Developments', 'Relocation Advisory'],
    languages: ['Arabic', 'English'],
    recentSalesVolume: '$38M / Year',
  },
  {
    id: 'agent-3',
    name: 'Nour Al-Mansour',
    role: 'Principal Architectural Director',
    location: 'Amman',
    propertiesCount: 26,
    yearsExperience: 16,
    phone: '+962 6 590 3214',
    email: 'n.mansour@estera-realestate.com',
    avatar: nourImg,
    bio: 'Educated at the Architectural Association in London, Nour bridges bespoke architectural provenance with luxury brokerage. She represents architects and visionary private developers seeking considered buyers.',
    specialties: ['Custom Built Villas', 'Minimalist Architecture', 'Structural Renovations', 'Sustainable Living'],
    languages: ['Arabic', 'English', 'Italian'],
    recentSalesVolume: '$31M / Year',
  },
  {
    id: 'agent-4',
    name: 'Tariq Zein',
    role: 'Partner, Private Client Advisory',
    location: 'Amman & Zurich',
    propertiesCount: 22,
    yearsExperience: 18,
    phone: '+962 6 590 3218',
    email: 't.zein@estera-realestate.com',
    avatar: tariqImg,
    bio: 'Tariq advises family offices and international patrons on trophy real estate investments, land banking, and cross-border residence acquisitions throughout Jordan and Europe.',
    specialties: ['Trophy Assets', 'Family Office Portfolios', 'Private Compounds', 'Land Holdings'],
    languages: ['Arabic', 'English', 'German'],
    recentSalesVolume: '$56M / Year',
  },
];

