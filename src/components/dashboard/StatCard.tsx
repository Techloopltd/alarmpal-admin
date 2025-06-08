
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  index
}) => {
  const changeColor = {
    positive: 'text-emerald-600',
    negative: 'text-red-500',
    neutral: 'text-gray-500'
  }[changeType];

  const changeSymbol = {
    positive: '+',
    negative: '',
    neutral: ''
  }[changeType];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className="relative overflow-hidden bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 shadow-sm hover:shadow-lg group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900"></div>
        <CardContent className="p-8">
          <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide leading-none">{title}</p>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              >
                <p className="text-4xl font-bold text-gray-900 leading-none">
                  {value}
                </p>
              </motion.div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-semibold ${changeColor}`}>
                  {changeSymbol}{change}
                </span>
                <span className="text-xs text-gray-500">from last month</span>
              </div>
            </div>
            <motion.div 
              className="ml-4 p-4 bg-gray-50 rounded-2xl group-hover:bg-gray-100 transition-colors duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Icon className="h-8 w-8 text-gray-700" strokeWidth={1.5} />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
