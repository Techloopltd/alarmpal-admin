
import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '@/components/dashboard/StatCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, CreditCard, TrendingUp, ArrowUpRight } from 'lucide-react';

const OverviewPage = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$54,239',
      change: '12.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
    },
    {
      title: 'Active Users',
      value: '2,847',
      change: '8.2%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'Subscriptions',
      value: '1,429',
      change: '3.1%',
      changeType: 'negative' as const,
      icon: CreditCard,
    },
    {
      title: 'Growth Rate',
      value: '23.8%',
      change: '5.4%',
      changeType: 'positive' as const,
      icon: TrendingUp,
    },
  ];

  const recentActivity = [
    { id: 1, user: 'John Doe', action: 'New subscription', time: '2 minutes ago', type: 'success' },
    { id: 2, user: 'Jane Smith', action: 'Profile updated', time: '15 minutes ago', type: 'info' },
    { id: 3, user: 'Mike Johnson', action: 'Payment failed', time: '1 hour ago', type: 'error' },
    { id: 4, user: 'Sarah Wilson', action: 'Account upgraded', time: '2 hours ago', type: 'success' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 sm:space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
          <p className="text-gray-600 text-sm sm:text-base">Welcome back! Here's what's happening with your business today.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-left sm:text-right"
        >
          <p className="text-sm text-gray-500">Last updated</p>
          <p className="text-base sm:text-lg font-semibold text-gray-900">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} index={index} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">Revenue Analytics</CardTitle>
                  <CardDescription className="text-gray-600 mt-1 text-sm">
                    Monthly revenue breakdown and trends
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">+18.2%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-3 sm:px-6">
              <RevenueChart />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl font-bold text-gray-900">Recent Activity</CardTitle>
              <CardDescription className="text-gray-600 text-sm">
                Latest user interactions and system events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mt-1 ${
                    activity.type === 'success' ? 'bg-emerald-500' :
                    activity.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OverviewPage;
