
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
  { icon: Users, label: 'Users', path: '/dashboard/users' },
  { icon: CreditCard, label: 'Subscriptions', path: '/dashboard/subscriptions' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? 280 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-full bg-white border-r border-gray-100 z-20 shadow-lg"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-12">
          <motion.div
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3"
          >
            {isOpen && (
              <>
                <div className="h-10 w-10 bg-gray-900 rounded-xl flex items-center justify-center">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">AdminPro</h1>
                  <p className="text-xs text-gray-500">Premium Dashboard</p>
                </div>
              </>
            )}
          </motion.div>
          <motion.button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 ml-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? (
              <ChevronLeft size={20} className="text-gray-600" />
            ) : (
              <ChevronRight size={20} className="text-gray-600" />
            )}
          </motion.button>
        </div>

        <nav className="space-y-2">
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
                  className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <item.icon 
                    size={22} 
                    className={`flex-shrink-0 transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                    }`} 
                    strokeWidth={1.5}
                  />
                  <motion.span
                    initial={false}
                    animate={{ 
                      opacity: isOpen ? 1 : 0, 
                      width: isOpen ? 'auto' : 0,
                      marginLeft: isOpen ? 0 : -16
                    }}
                    transition={{ duration: 0.2 }}
                    className={`overflow-hidden whitespace-nowrap font-medium ${
                      isActive ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </motion.span>
                  {isActive && (
                    <motion.div
                      className="absolute right-2 h-2 w-2 bg-white rounded-full"
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
            className="mt-12 p-4 bg-gray-50 rounded-xl"
          >
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-xs text-gray-600 mb-3">Contact our support team for assistance.</p>
            <button className="w-full text-xs bg-gray-900 text-white py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
              Get Support
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
