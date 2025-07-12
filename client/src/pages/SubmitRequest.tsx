
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Navbar from '../components/Navbar';

const SubmitRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [targetUser, setTargetUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    offeredSkill: '',
    wantedSkill: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const profile = localStorage.getItem('userProfile');
    if (profile) {
      setUserProfile(JSON.parse(profile));
    }

    // Mock target user data (in real app, fetch from API)
    const mockUsers: any = {
      '1': {
        name: 'Marc Demo',
        skillsOffered: ['Java Script', 'Python'],
        skillsWanted: ['Cooking', 'Graphic Design']
      },
      '2': {
        name: 'Michelle Chen',
        skillsOffered: ['React', 'UI/UX Design'],
        skillsWanted: ['Spanish', 'Photography']
      },
      '3': {
        name: 'Joe Williams',
        skillsOffered: ['Guitar', 'Music Production'],
        skillsWanted: ['Cooking', 'Graphic Design']
      }
    };

    if (id && mockUsers[id]) {
      setTargetUser(mockUsers[id]);
    }
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.offeredSkill || !formData.wantedSkill) {
      toast({
        title: "Missing required fields",
        description: "Please select both skills before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Request submitted!",
        description: "Your skill swap request has been sent successfully.",
      });
      
      navigate('/requests');
      setIsSubmitting(false);
    }, 1000);
  };

  if (!userProfile || !targetUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-white">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Link
            to={`/swap-request/${id}`}
            className="inline-flex items-center text-slate-300 hover:text-white transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Link>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Request Skill Swap</h1>
              <p className="text-slate-300">
                Send a skill exchange request to <span className="text-blue-400 font-semibold">{targetUser.name}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Choose one of your offered skills
                </label>
                <select
                  name="offeredSkill"
                  value={formData.offeredSkill}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select a skill you can teach...</option>
                  {userProfile.skillsOffered?.map((skill: string, index: number) => (
                    <option key={index} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Choose one of their wanted skills
                </label>
                <select
                  name="wantedSkill"
                  value={formData.wantedSkill}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select a skill they want to learn...</option>
                  {targetUser.skillsWanted?.map((skill: string, index: number) => (
                    <option key={index} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Add a personal message to introduce yourself..."
                />
              </div>

              {/* Summary */}
              {formData.offeredSkill && formData.wantedSkill && (
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                  <h3 className="text-sm font-medium text-slate-300 mb-2">Swap Summary:</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-400">You teach: {formData.offeredSkill}</span>
                    <span className="text-slate-500">⇄</span>
                    <span className="text-blue-400">You learn: {formData.wantedSkill}</span>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting || !formData.offeredSkill || !formData.wantedSkill}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-3 disabled:opacity-50"
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Request
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitRequest;
