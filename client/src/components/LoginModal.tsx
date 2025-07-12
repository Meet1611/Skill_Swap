
import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Login Required</h2>
          <p className="text-muted-foreground mb-6">
            You need to be logged in to request a skill swap. Please login or create an account to continue.
          </p>

          <div className="space-y-3">
            <Link to="/login" onClick={onClose}>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                Login
              </Button>
            </Link>
            
            <Link to="/register" onClick={onClose}>
              <Button variant="outline" className="w-full border-border text-foreground hover:bg-accent hover:text-accent-foreground">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
