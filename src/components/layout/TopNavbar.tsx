
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, Search, LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TopNavbarProps {
  onMenuClick: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm"
    >
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center gap-3 sm:gap-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden hover:bg-gray-100 transition-colors duration-200 h-8 w-8 sm:h-10 sm:w-10"
          >
            <Menu size={18} className="sm:w-5 sm:h-5 text-gray-700" />
          </Button>
          
          <div className="hidden sm:flex items-center gap-3 max-w-xs sm:max-w-md w-full">
            <div className="relative flex-1">
              <Search size={16} className="sm:w-[18px] sm:h-[18px] absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/dashboard/settings">
              <Button variant="ghost" size="icon" className="hover:bg-gray-100 transition-colors duration-200 h-8 w-8 sm:h-10 sm:w-10">
                <Settings size={18} className="sm:w-5 sm:h-5 text-gray-600" />
              </Button>
            </Link>
          </motion.div>

          <div className="h-6 sm:h-8 w-px bg-gray-200 mx-1 sm:mx-2"></div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
            
            <motion.div whileHover={{ scale: 1.05 }}>
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 ring-2 ring-gray-100 hover:ring-gray-200 transition-all duration-200">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback className="bg-gray-900 text-white font-semibold text-sm">
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200 h-8 w-8 sm:h-10 sm:w-10"
              >
                <LogOut size={16} className="sm:w-[18px] sm:h-[18px]" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
