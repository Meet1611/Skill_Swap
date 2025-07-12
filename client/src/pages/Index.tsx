
import React, { useState, useEffect } from 'react';
import { Search, Filter, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import UserCard from '../components/UserCard';
import SkeletonProfileCard from '../components/SkeletonProfileCard';
import FilterDropdown from '../components/FilterDropdown';
import PaginationControl from '../components/PaginationControl';

// Mock data for public profiles
const mockProfiles = [
  {
    id: '1',
    name: 'Marc Demo',
    location: 'San Francisco, CA',
    profilePhoto: '/placeholder.svg',
    skillsOffered: ['Java Script', 'Python'],
    skillsWanted: ['Cooking', 'Graphic Design'],
    rating: 3.9,
    reviewCount: 5,
    availability: 'Weekends'
  },
  {
    id: '2',
    name: 'Michelle Chen',
    location: 'New York, NY',
    profilePhoto: '/placeholder.svg',
    skillsOffered: ['React', 'UI/UX Design'],
    skillsWanted: ['Spanish', 'Photography'],
    rating: 2.5,
    reviewCount: 3,
    availability: 'Evenings'
  },
  {
    id: '3',
    name: 'Joe Williams',
    location: 'Austin, TX',
    profilePhoto: '/placeholder.svg',
    skillsOffered: ['Guitar', 'Music Production'],
    skillsWanted: ['Cooking', 'Graphic Design'],
    rating: 4.6,
    reviewCount: 8,
    availability: 'Flexible'
  }
];

const Index = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAvailability, setSelectedAvailability] = useState('All');

  const profilesPerPage = 6;

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProfiles(mockProfiles);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredProfiles = profiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         profile.skillsOffered.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         profile.skillsWanted.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesAvailability = selectedAvailability === 'All' || profile.availability === selectedAvailability;
    
    return matchesSearch && matchesAvailability;
  });

  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);
  const currentProfiles = filteredProfiles.slice(
    (currentPage - 1) * profilesPerPage,
    currentPage * profilesPerPage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            SkillSwap Platform
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Connect with others to exchange skills and learn something new. Find your perfect learning partner today.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <FilterDropdown
            value={selectedAvailability}
            onChange={setSelectedAvailability}
            options={['All', 'Weekends', 'Evenings', 'Flexible']}
            placeholder="Availability"
          />
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading ? (
            // Show skeleton loaders
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonProfileCard key={index} />
            ))
          ) : (
            currentProfiles.map((profile) => (
              <UserCard key={profile.id} profile={profile} />
            ))
          )}
        </div>

        {/* Empty State */}
        {!loading && filteredProfiles.length === 0 && (
          <div className="text-center py-16">
            <User className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">No profiles found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <PaginationControl
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
