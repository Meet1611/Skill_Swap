
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, MapPin, Clock, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '../components/Navbar';
import SkillTag from '../components/SkillTag';
import LoginModal from '../components/LoginModal';

// Mock user data
const mockUsers = {
  '1': {
    id: '1',
    name: 'Marc Demo',
    location: 'San Francisco, CA',
    profilePhoto: '/placeholder.svg',
    skillsOffered: ['Java Script', 'Python'],
    skillsWanted: ['Cooking', 'Graphic Design'],
    rating: 3.9,
    reviewCount: 5,
    availability: 'Weekends',
    bio: 'Passionate software developer with 5 years of experience in web development. I love sharing knowledge and learning new creative skills in my free time.'
  },
  '2': {
    id: '2',
    name: 'Michelle Chen',
    location: 'New York, NY',
    profilePhoto: '/placeholder.svg',
    skillsOffered: ['React', 'UI/UX Design'],
    skillsWanted: ['Spanish', 'Photography'],
    rating: 2.5,
    reviewCount: 3,
    availability: 'Evenings',
    bio: 'Frontend developer and designer who enjoys creating beautiful user experiences. Looking to expand my language skills and photography techniques.'
  },
  '3': {
    id: '3',
    name: 'Joe Williams',
    location: 'Austin, TX',
    profilePhoto: '/placeholder.svg',
    skillsOffered: ['Guitar', 'Music Production'],
    skillsWanted: ['Cooking', 'Graphic Design'],
    rating: 4.6,
    reviewCount: 8,
    availability: 'Flexible',
    bio: 'Professional musician and producer with over 10 years of experience. I love teaching music and would like to learn some practical life skills.'
  }
};

const SwapRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeTab, setActiveTab] = useState('skills');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    if (id && mockUsers[id as keyof typeof mockUsers]) {
      setUser(mockUsers[id as keyof typeof mockUsers]);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleRequestClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      navigate(`/submit-request/${id}`);
    }
  };

  if (!user) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading...</div>
      </div>
    </div>;
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navbar />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              to="/"
              className="inline-flex items-center text-slate-300 hover:text-white transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profiles
            </Link>

            {/* Profile Header */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="h-16 w-16 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-800"></div>
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-slate-300 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {user.location}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      {user.rating} ({user.reviewCount} reviews)
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Available {user.availability}
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleRequestClick}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3"
                  >
                    Request Skill Swap
                  </Button>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
              <div className="border-b border-slate-700">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('skills')}
                    className={`px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                      activeTab === 'skills'
                        ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-700/30'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Skills
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                      activeTab === 'reviews'
                        ? 'text-blue-400 border-b-2 border-blue-400 bg-slate-700/30'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Reviews ({user.reviewCount})
                  </button>
                </nav>
              </div>

              <div className="p-8">
                {activeTab === 'skills' && (
                  <div className="space-y-8">
                    <div>
                      <p className="text-slate-300 text-lg leading-relaxed mb-6">
                        {user.bio}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-green-400 mb-4">Skills I Can Teach</h3>
                        <div className="flex flex-wrap gap-3">
                          {user.skillsOffered.map((skill: string, index: number) => (
                            <SkillTag key={index} skill={skill} type="offered" />
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-blue-400 mb-4">Skills I Want to Learn</h3>
                        <div className="flex flex-wrap gap-3">
                          {user.skillsWanted.map((skill: string, index: number) => (
                            <SkillTag key={index} skill={skill} type="wanted" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="text-center py-12">
                      <Star className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-slate-400 mb-2">No reviews yet</h3>
                      <p className="text-slate-500">This user hasn't received any reviews yet.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default SwapRequest;
