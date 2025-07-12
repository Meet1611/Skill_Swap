import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Plus, Save, RotateCcw, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import Navbar from '../components/Navbar';
import SkillTag from '../components/SkillTag';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    location: '',
    availability: 'Flexible',
    skillsOffered: [] as string[],
    skillsWanted: [] as string[],
    profileVisibility: 'Public',
    profilePhoto: '',
    isPublic: true
  });
  const [originalProfile, setOriginalProfile] = useState(profile);
  const [newOfferedSkill, setNewOfferedSkill] = useState('');
  const [newWantedSkill, setNewWantedSkill] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        const profileWithArrays = {
          ...parsedProfile,
          skillsOffered: Array.isArray(parsedProfile.skillsOffered) ? parsedProfile.skillsOffered : [],
          skillsWanted: Array.isArray(parsedProfile.skillsWanted) ? parsedProfile.skillsWanted : [],
          isPublic: parsedProfile.isPublic !== undefined ? parsedProfile.isPublic : true,
          profilePhoto: parsedProfile.profilePhoto || ''
        };
        setProfile(profileWithArrays);
        setOriginalProfile(profileWithArrays);
      } catch (error) {
        console.error('Error parsing saved profile:', error);
      }
    }
  }, [navigate]);

  useEffect(() => {
    setHasChanges(JSON.stringify(profile) !== JSON.stringify(originalProfile));
  }, [profile, originalProfile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handlePrivacyToggle = (checked: boolean) => {
    setProfile({
      ...profile,
      isPublic: checked,
      profileVisibility: checked ? 'Public' : 'Private'
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfile({
          ...profile,
          profilePhoto: result
        });
        toast({
          title: "Photo uploaded!",
          description: "Your profile photo has been updated.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removePhoto = () => {
    setProfile({
      ...profile,
      profilePhoto: ''
    });
    toast({
      title: "Photo removed",
      description: "Your profile photo has been removed.",
    });
  };

  const addOfferedSkill = () => {
    if (newOfferedSkill.trim() && !profile.skillsOffered.includes(newOfferedSkill.trim())) {
      setProfile({
        ...profile,
        skillsOffered: [...profile.skillsOffered, newOfferedSkill.trim()]
      });
      setNewOfferedSkill('');
    }
  };

  const addWantedSkill = () => {
    if (newWantedSkill.trim() && !profile.skillsWanted.includes(newWantedSkill.trim())) {
      setProfile({
        ...profile,
        skillsWanted: [...profile.skillsWanted, newWantedSkill.trim()]
      });
      setNewWantedSkill('');
    }
  };

  const removeOfferedSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skillsOffered: profile.skillsOffered.filter(skill => skill !== skillToRemove)
    });
  };

  const removeWantedSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skillsWanted: profile.skillsWanted.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setOriginalProfile(profile);
    toast({
      title: "Profile saved!",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleDiscard = () => {
    setProfile(originalProfile);
    setNewOfferedSkill('');
    setNewWantedSkill('');
    toast({
      title: "Changes discarded",
      description: "Your profile has been reset to the last saved state.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4 md:mb-0">Profile Settings</h1>
            
            <div className="flex space-x-3">
              <Button
                onClick={handleDiscard}
                disabled={!hasChanges}
                variant="outline"
                className="disabled:opacity-50"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Discard
              </Button>
              
              <Button
                onClick={handleSave}
                disabled={!hasChanges}
                className="disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Photo Section */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold text-card-foreground mb-4">Profile Photo</h2>
                
                <div className="text-center">
                  <div className="relative inline-block mb-4">
                    <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center bg-muted">
                      {profile.profilePhoto ? (
                        <img
                          src={profile.profilePhoto}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="h-16 w-16 text-muted-foreground" />
                      )}
                    </div>
                    <button 
                      onClick={triggerFileInput}
                      className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center border-2 border-background hover:bg-primary/90 transition-colors duration-200"
                    >
                      <Camera className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" onClick={triggerFileInput}>
                      Upload Photo
                    </Button>
                    {profile.profilePhoto && (
                      <Button variant="outline" onClick={removePhoto}>
                        Remove
                      </Button>
                    )}
                  </div>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <h3 className="text-sm font-medium text-foreground mb-3">Profile Privacy</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {profile.isPublic ? 'Profile is public' : 'Profile is private'}
                    </span>
                    <Switch
                      checked={profile.isPublic}
                      onCheckedChange={handlePrivacyToggle}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {profile.isPublic ? 'Your profile is visible to everyone and appears in search results' : 'Your profile is hidden from public view and search results'}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Profile Form */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold text-card-foreground mb-6">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                      placeholder="City, State"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Availability</label>
                    <select
                      name="availability"
                      value={profile.availability}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-input rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                    >
                      <option value="Flexible">Flexible</option>
                      <option value="Weekends">Weekends</option>
                      <option value="Evenings">Evenings</option>
                      <option value="Weekdays">Weekdays</option>
                    </select>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-green-600 dark:text-green-400 mb-3">Skills I Can Teach</label>
                    <div className="flex space-x-2 mb-3">
                      <input
                        type="text"
                        value={newOfferedSkill}
                        onChange={(e) => setNewOfferedSkill(e.target.value)}
                        placeholder="Add a skill..."
                        className="flex-1 px-3 py-2 bg-background border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addOfferedSkill())}
                      />
                      <Button
                        type="button"
                        onClick={addOfferedSkill}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 min-h-[40px]">
                      {profile.skillsOffered && profile.skillsOffered.map((skill, index) => (
                        <SkillTag
                          key={index}
                          skill={skill}
                          type="offered"
                          removable
                          onRemove={() => removeOfferedSkill(skill)}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">Skills I Want to Learn</label>
                    <div className="flex space-x-2 mb-3">
                      <input
                        type="text"
                        value={newWantedSkill}
                        onChange={(e) => setNewWantedSkill(e.target.value)}
                        placeholder="Add a skill..."
                        className="flex-1 px-3 py-2 bg-background border border-input rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addWantedSkill())}
                      />
                      <Button
                        type="button"
                        onClick={addWantedSkill}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 min-h-[40px]">
                      {profile.skillsWanted && profile.skillsWanted.map((skill, index) => (
                        <SkillTag
                          key={index}
                          skill={skill}
                          type="wanted"
                          removable
                          onRemove={() => removeWantedSkill(skill)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
