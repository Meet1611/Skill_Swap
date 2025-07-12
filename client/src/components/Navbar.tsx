
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userProfile');
    navigate('/');
  };

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
          >
            SkillSwap
          </Link>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-accent hover:text-accent-foreground"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {isLoggedIn ? (
              <>
                <Link to="/requests">
                  <Button variant="ghost" className="hover:bg-accent hover:text-accent-foreground">
                    Requests
                  </Button>
                </Link>
                
                <Link to="/profile" className="flex items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={userProfile.profilePhoto} 
                      alt={userProfile.name || 'Profile'} 
                    />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
                
                <Button 
                  onClick={handleLogout}
                  variant="ghost" 
                  size="icon"
                  className="hover:bg-accent hover:text-accent-foreground text-destructive"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
