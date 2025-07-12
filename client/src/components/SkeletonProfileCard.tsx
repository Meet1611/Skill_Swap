
import React from 'react';

const SkeletonProfileCard = () => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 animate-pulse">
      {/* Profile Header */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 bg-slate-700 rounded-full"></div>
        <div className="flex-1">
          <div className="h-5 bg-slate-700 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-slate-700 rounded mb-2 w-1/2"></div>
          <div className="h-4 bg-slate-700 rounded w-2/3"></div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="space-y-3 mb-6">
        <div>
          <div className="h-4 bg-slate-700 rounded mb-2 w-1/3"></div>
          <div className="flex space-x-2">
            <div className="h-6 bg-slate-700 rounded-full w-16"></div>
            <div className="h-6 bg-slate-700 rounded-full w-20"></div>
          </div>
        </div>
        
        <div>
          <div className="h-4 bg-slate-700 rounded mb-2 w-1/3"></div>
          <div className="flex space-x-2">
            <div className="h-6 bg-slate-700 rounded-full w-18"></div>
            <div className="h-6 bg-slate-700 rounded-full w-24"></div>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="h-10 bg-slate-700 rounded w-full"></div>
    </div>
  );
};

export default SkeletonProfileCard;
