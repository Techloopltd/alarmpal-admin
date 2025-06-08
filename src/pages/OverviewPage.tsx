
import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '@/components/dashboard/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, CreditCard, TrendingUp } from 'lucide-react';

const OverviewPage = () => {
  const stats = [
    {
      title: 'Total Earnings',
      value: '$45,231',
      change: '+12.5% from last month',
      changeType: 'positive' as const,
      icon: DollarSign
    },
    {
      title: 'Active Users',
      value: '2,845',
      change: '+8.2% from last month',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Subscriptions',
      value: '1,423',
      change: '+15.3% from last month',
      changeType: 'positive' as const,
      icon: CreditCard
    },
    {
      title: 'Growth Rate',
      value: '12.5%',
      change: '+2.1% from last month',
      changeType: 'positive' as const,
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your business.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} index={index} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-accent/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Chart Component Placeholder</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Daily active users over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-accent/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Chart Component Placeholder</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest user actions and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: 'John Doe', action: 'Upgraded to Pro plan', time: '2 hours ago' },
                { user: 'Jane Smith', action: 'Created new project', time: '4 hours ago' },
                { user: 'Mike Johnson', action: 'Updated profile settings', time: '6 hours ago' },
                { user: 'Sarah Wilson', action: 'Cancelled subscription', time: '8 hours ago' }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                  className="flex items-center justify-between p-3 bg-accent/30 rounded-lg hover:bg-accent/50 transition-colors duration-200"
                >
                  <div>
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OverviewPage;
