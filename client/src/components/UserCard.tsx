
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SkillTag from './SkillTag';
import LoginModal from './LoginModal';

interface UserCardProps {
  profile: {
    id: string;
    name: string;
    location: string;
    profilePhoto: string;
    skillsOffered: string[];
    skillsWanted: string[];
    rating: number;
    reviewCount: number;
    availability: string;
  };
}

const UserCard: React.FC<UserCardProps> = ({ profile }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleRequestClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      // Navigate to swap request page
      window.location.href = `/swap-request/${profile.id}`;
    }
  };

  return (
    <>
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:scale-105">
        {/* Profile Header */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background"></div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">{profile.name}</h3>
            <div className="flex items-center text-muted-foreground text-sm mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              {profile.location}
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-foreground text-sm ml-1">{profile.rating}</span>
                <span className="text-muted-foreground text-sm">({profile.reviewCount})</span>
              </div>
              <div className="flex items-center text-muted-foreground text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {profile.availability}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="space-y-3 mb-6">
          <div>
            <p className="text-green-600 dark:text-green-400 text-sm font-medium mb-2">Skills Offered</p>
            <div className="flex flex-wrap gap-2">
              {profile.skillsOffered.map((skill, index) => (
                <SkillTag key={index} skill={skill} type="offered" />
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">Skills Wanted</p>
            <div className="flex flex-wrap gap-2">
              {profile.skillsWanted.map((skill, index) => (
                <SkillTag key={index} skill={skill} type="wanted" />
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleRequestClick}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-200"
        >
          Request Swap
        </Button>
      </div>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};

export default UserCard;
