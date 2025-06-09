
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: Users, label: 'Users', path: '/dashboard/users' },
  { icon: CreditCard, label: 'Subscriptions', path: '/dashboard/subscriptions' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, isMobile = false }) => {
  const location = useLocation();

  return (
    <motion.div
      initial={false}
      animate={{ 
        width: isOpen ? 288 : 80,
        x: isMobile && !isOpen ? -288 : 0
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-white to-gray-50 border-r border-gray-200/50 z-40 shadow-xl backdrop-blur-sm ${
        isMobile ? 'w-72' : ''
      }`}
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-8 lg:mb-12">
          <motion.div
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3"
          >
            {isOpen && (
              <>
                <div className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/287a257b-05c1-4234-b082-59f9b40b1c08.png" 
                    alt="MyAlarmPal Logo" 
                    className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">MyAlarmPal</h1>
                  <p className="text-xs text-gray-500 font-medium">Premium Dashboard</p>
                </div>
              </>
            )}
          </motion.div>
          <motion.button
            onClick={onToggle}
            className="p-2 sm:p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200 ml-auto border border-gray-200/50 shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? (
              <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px] text-gray-600" />
            ) : (
              <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px] text-gray-600" />
            )}
          </motion.button>
        </div>

        {!isOpen && !isMobile && (
          <div className="flex justify-center mb-8 sm:mb-10">
            <div className="h-12 w-12 flex items-center justify-center">
              <img 
                src="/lovable-uploads/287a257b-05c1-4234-b082-59f9b40b1c08.png" 
                alt="MyAlarmPal Logo" 
                className="h-8 w-8 object-contain"
              />
            </div>
          </div>
        )}

        <nav className={`space-y-3 sm:space-y-4 ${!isOpen && !isMobile ? 'px-2' : ''}`}>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-3 sm:py-4 rounded-2xl transition-all duration-300 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-xl border border-gray-300'
                      : 'hover:bg-white hover:shadow-lg text-gray-700 hover:text-gray-900 border border-transparent hover:border-gray-200/50'
                  } ${!isOpen && !isMobile ? 'justify-center mx-0' : ''}`}
                  title={!isOpen && !isMobile ? item.label : undefined}
                >
                  <div className={`flex-shrink-0 ${!isOpen && !isMobile ? 'flex items-center justify-center' : ''}`}>
                    <item.icon 
                      size={22} 
                      className={`transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                      }`} 
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                  </div>
                  <motion.span
                    initial={false}
                    animate={{ 
                      opacity: isOpen ? 1 : 0, 
                      width: isOpen ? 'auto' : 0,
                      marginLeft: isOpen ? 0 : -16
                    }}
                    transition={{ duration: 0.2 }}
                    className={`overflow-hidden whitespace-nowrap font-semibold text-sm sm:text-base ${
                      isActive ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </motion.span>
                  {isActive && isOpen && (
                    <motion.div
                      className="absolute right-3 sm:right-4 h-2 w-2 bg-white rounded-full"
                      layoutId="activeIndicator"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 lg:mt-12 p-4 sm:p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl border border-gray-200/50 shadow-sm"
          >
            <h3 className="text-sm font-bold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-xs text-gray-600 mb-3 sm:mb-4 leading-relaxed">Contact our support team for assistance with your premium dashboard.</p>
            <button className="w-full text-xs bg-gradient-to-r from-gray-900 to-gray-700 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl hover:from-gray-800 hover:to-gray-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
              Get Support
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
