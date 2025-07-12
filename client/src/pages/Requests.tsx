
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Eye, Filter, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Navbar from '../components/Navbar';
import FilterDropdown from '../components/FilterDropdown';
import SkillTag from '../components/SkillTag';

// Mock request data
const mockRequests = [
  {
    id: '1',
    type: 'incoming',
    user: {
      id: '1',
      name: 'Marcus Johnson',
      profilePhoto: '/placeholder.svg'
    },
    date: '1/20/2024',
    offeredSkill: 'Photography',
    wantedSkill: 'React',
    message: "Hi! I'd love to learn React from you. I can teach photography basics in return.",
    status: 'pending'
  },
  {
    id: '2',
    type: 'incoming',
    user: {
      id: '2',
      name: 'Elena Rodriguez',
      profilePhoto: '/placeholder.svg'
    },
    date: '1/18/2024',
    offeredSkill: 'TypeScript',
    wantedSkill: 'Spanish',
    message: "Hello! I'm a TypeScript expert looking to learn Spanish. Would love to help you with coding!",
    status: 'pending'
  },
  {
    id: '3',
    type: 'outgoing',
    user: {
      id: '3',
      name: 'David Kim',
      profilePhoto: '/placeholder.svg'
    },
    date: '1/15/2024',
    offeredSkill: 'React',
    wantedSkill: 'Guitar',
    message: "Hey! I'd like to learn guitar from you. Happy to teach React in exchange.",
    status: 'accepted'
  },
  {
    id: '4',
    type: 'outgoing',
    user: {
      id: '4',
      name: 'Sarah Wilson',
      profilePhoto: '/placeholder.svg'
    },
    date: '1/12/2024',
    offeredSkill: 'UI/UX Design',
    wantedSkill: 'Cooking',
    message: "I'm interested in learning cooking techniques. I can help with UI/UX design!",
    status: 'rejected'
  }
];

const Requests = () => {
  const [requests, setRequests] = useState(mockRequests);
  const [activeTab, setActiveTab] = useState<'pending' | 'accepted' | 'completed' | 'declined'>('pending');
  const [statusFilter, setStatusFilter] = useState('All');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
  }, [navigate]);

  const handleAccept = (requestId: string) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: 'accepted' } : req
      )
    );
    toast({
      title: "Request accepted!",
      description: "You can now coordinate your skill exchange.",
    });
  };

  const handleReject = (requestId: string) => {
    setRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status: 'rejected' } : req
      )
    );
    toast({
      title: "Request declined",
      description: "The request has been declined.",
    });
  };

  const getFilteredRequests = () => {
    return requests.filter(request => {
      const matchesTab = 
        activeTab === 'pending' ? request.status === 'pending' :
        activeTab === 'accepted' ? request.status === 'accepted' :
        activeTab === 'completed' ? request.status === 'completed' :
        activeTab === 'declined' ? request.status === 'rejected' : true;
      
      const matchesFilter = statusFilter === 'All' || request.status === statusFilter.toLowerCase();
      
      return matchesTab && matchesFilter;
    });
  };

  const getTabCounts = () => {
    return {
      pending: requests.filter(r => r.status === 'pending').length,
      accepted: requests.filter(r => r.status === 'accepted').length,
      completed: requests.filter(r => r.status === 'completed').length,
      declined: requests.filter(r => r.status === 'rejected').length,
    };
  };

  const tabCounts = getTabCounts();
  const filteredRequests = getFilteredRequests();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Skill Swaps</h1>
            <p className="text-muted-foreground">
              Manage your skill exchange requests and track your learning journey.
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-card backdrop-blur-sm border border-border rounded-xl mb-6">
            <div className="border-b border-border">
              <nav className="flex overflow-x-auto">
                {[
                  { key: 'pending', label: 'Pending', count: tabCounts.pending },
                  { key: 'accepted', label: 'Accepted', count: tabCounts.accepted },
                  { key: 'completed', label: 'Completed', count: tabCounts.completed },
                  { key: 'declined', label: 'Declined', count: tabCounts.declined },
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex-shrink-0 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                      activeTab === tab.key
                        ? 'text-primary border-b-2 border-primary bg-accent'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab.label}
                    {tab.count > 0 && (
                      <span className="ml-2 px-2 py-1 text-xs bg-muted rounded-full">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>

            {/* Filter */}
            <div className="p-4 border-b border-border">
              <FilterDropdown
                value={statusFilter}
                onChange={setStatusFilter}
                options={['All', 'Pending', 'Accepted', 'Completed', 'Rejected']}
                placeholder="Filter by status"
              />
            </div>

            {/* Requests List */}
            <div className="divide-y divide-border">
              {filteredRequests.length === 0 ? (
                <div className="text-center py-16">
                  <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">No requests found</h3>
                  <p className="text-muted-foreground">
                    {activeTab === 'pending' 
                      ? "You don't have any pending requests at the moment."
                      : `No ${activeTab} requests to show.`
                    }
                  </p>
                </div>
              ) : (
                filteredRequests.map((request) => (
                  <div key={request.id} className="p-6 hover:bg-accent/50 transition-colors duration-200">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-foreground">{request.user.name}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' :
                              request.status === 'accepted' ? 'bg-green-500/20 text-green-600 dark:text-green-400' :
                              request.status === 'completed' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' :
                              'bg-red-500/20 text-red-600 dark:text-red-400'
                            }`}>
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{request.date}</p>
                          
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">
                                {request.type === 'incoming' ? 'They offer:' : 'You offer:'}
                              </span>
                              <SkillTag skill={request.offeredSkill} type="offered" />
                            </div>
                            <span className="text-muted-foreground">⇄</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">
                                {request.type === 'incoming' ? 'You teach:' : 'They teach:'}
                              </span>
                              <SkillTag skill={request.wantedSkill} type="wanted" />
                            </div>
                          </div>
                          
                          {request.message && (
                            <p className="text-sm text-muted-foreground italic">
                              "Message: {request.message}"
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-3 flex-shrink-0">
                        {request.type === 'incoming' && request.status === 'pending' && (
                          <>
                            <Button
                              onClick={() => handleAccept(request.id)}
                              size="sm"
                              className="bg-green-500 hover:bg-green-600 text-white"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Accept
                            </Button>
                            <Button
                              onClick={() => handleReject(request.id)}
                              size="sm"
                              variant="outline"
                              className="border-red-500/50 text-red-500 hover:bg-red-500/10 hover:border-red-500"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Decline
                            </Button>
                          </>
                        )}
                        
                        <Button
                          onClick={() => navigate(`/swap-request/${request.user.id}`)}
                          size="sm"
                          variant="outline"
                          className="border-border text-muted-foreground hover:text-foreground hover:border-border"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;
