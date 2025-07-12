
import React from 'react';
import { X } from 'lucide-react';

interface SkillTagProps {
  skill: string;
  type?: 'offered' | 'wanted';
  removable?: boolean;
  onRemove?: () => void;
}

const SkillTag: React.FC<SkillTagProps> = ({ skill, type = 'offered', removable = false, onRemove }) => {
  const getTagStyles = () => {
    switch (type) {
      case 'offered':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'wanted':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getTagStyles()} transition-all duration-200 hover:scale-105`}>
      {skill}
      {removable && onRemove && (
        <button
          onClick={onRemove}
          className="ml-2 hover:bg-red-500/20 rounded-full p-0.5 transition-colors duration-200"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
};

export default SkillTag;
