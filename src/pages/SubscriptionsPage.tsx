import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Pause, Play, X, DollarSign, Crown } from 'lucide-react';

interface Subscription {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userAvatar?: string;
  plan: string;
  status: 'active' | 'paused' | 'cancelled' | 'expired';
  amount: number;
  renewalDate: string;
  startDate: string;
}

const SubscriptionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const subscriptions: Subscription[] = [
    {
      id: '1',
      userId: '1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      plan: 'Pro Plan',
      status: 'active',
      amount: 29.99,
      renewalDate: '2024-07-15',
      startDate: '2024-01-15'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      plan: 'Pro Plan',
      status: 'active',
      amount: 29.99,
      renewalDate: '2024-07-20',
      startDate: '2024-02-20'
    },
    {
      id: '3',
      userId: '3',
      userName: 'Mike Johnson',
      userEmail: 'mike@example.com',
      plan: 'Pro Plan',
      status: 'paused',
      amount: 29.99,
      renewalDate: '2024-08-01',
      startDate: '2024-03-01'
    },
    {
      id: '4',
      userId: '4',
      userName: 'Sarah Wilson',
      userEmail: 'sarah@example.com',
      plan: 'Pro Plan',
      status: 'cancelled',
      amount: 29.99,
      renewalDate: '2024-06-05',
      startDate: '2024-01-05'
    }
  ];

  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch = subscription.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         subscription.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         subscription.plan.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || subscription.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200';
      case 'paused': return 'bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200';
      case 'cancelled': return 'bg-red-100 text-red-800 hover:bg-red-200 border-red-200';
      case 'expired': return 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200';
    }
  };

  const getActionButton = (subscription: Subscription) => {
    switch (subscription.status) {
      case 'active':
        return (
          <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 text-xs sm:text-sm">
            <Pause size={14} className="sm:w-4 sm:h-4 mr-1" />
            Pause
          </Button>
        );
      case 'paused':
        return (
          <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 text-xs sm:text-sm">
            <Play size={14} className="sm:w-4 sm:h-4 mr-1" />
            Resume
          </Button>
        );
      default:
        return (
          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs sm:text-sm">
            <X size={14} className="sm:w-4 sm:h-4 mr-1" />
            Cancel
          </Button>
        );
    }
  };

  const totalRevenue = subscriptions
    .filter(sub => sub.status === 'active')
    .reduce((sum, sub) => sum + sub.amount, 0);

  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active').length;

  return (
    <div className="space-y-6 sm:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4">
          <div className="p-2.5 sm:p-3 bg-white/10 rounded-xl backdrop-blur-sm">
            <Crown className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Premium Subscriptions</h1>
            <p className="text-gray-300 text-base sm:text-lg">Manage your Pro plan subscribers</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100/50">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-emerald-700 mb-2">Monthly Revenue</p>
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-900">${totalRevenue.toFixed(2)}</p>
                  <p className="text-sm text-emerald-600 mt-1">From active subscriptions</p>
                </div>
                <div className="h-12 w-12 sm:h-16 sm:w-16 bg-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-700 mb-2">Active Pro Subscribers</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-900">{activeSubscriptions}</p>
                  <p className="text-sm text-blue-600 mt-1">Premium members</p>
                </div>
                <div className="h-12 w-12 sm:h-16 sm:w-16 bg-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                  <Crown className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gray-50/50 rounded-t-lg pb-4 sm:pb-6">
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Pro Plan Subscriptions</CardTitle>
            <CardDescription className="text-gray-600 text-sm sm:text-base">
              Monitor and manage all premium subscription accounts
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-4 mb-6">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search subscriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 h-10 sm:h-11 border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-gray-400/20 text-sm"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {['all', 'active', 'paused', 'cancelled'].map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                    className={`capitalize text-xs sm:text-sm ${
                      selectedFilter === filter 
                        ? 'bg-gray-900 hover:bg-gray-800' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>

            {/* Mobile view */}
            <div className="block sm:hidden space-y-4">
              <AnimatePresence>
                {filteredSubscriptions.map((subscription, index) => (
                  <motion.div
                    key={subscription.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="p-4 border rounded-lg bg-white shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-10 w-10 ring-2 ring-gray-100">
                        <AvatarImage src={subscription.userAvatar} alt={subscription.userName} />
                        <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold text-sm">
                          {subscription.userName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{subscription.userName}</p>
                        <p className="text-xs text-gray-500">{subscription.userEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-gray-900 text-white hover:bg-gray-800 px-2 py-1 text-xs">
                          <Crown size={10} className="mr-1" />
                          {subscription.plan}
                        </Badge>
                        <Badge className={`font-semibold border text-xs ${getStatusColor(subscription.status)}`}>
                          {subscription.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">${subscription.amount}/month</p>
                        <p className="text-xs text-gray-600">
                          Renewal: {new Date(subscription.renewalDate).toLocaleDateString()}
                        </p>
                      </div>
                      <motion.div 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                      >
                        {getActionButton(subscription)}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Desktop table view */}
            <div className="hidden sm:block rounded-xl border border-gray-200 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-semibold text-gray-700">Customer</TableHead>
                    <TableHead className="font-semibold text-gray-700">Plan</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700">Amount</TableHead>
                    <TableHead className="font-semibold text-gray-700">Renewal Date</TableHead>
                    <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredSubscriptions.map((subscription, index) => (
                      <motion.tr
                        key={subscription.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="hover:bg-gray-50/50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                      >
                        <TableCell className="py-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-10 w-10 ring-2 ring-gray-100">
                              <AvatarImage src={subscription.userAvatar} alt={subscription.userName} />
                              <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">
                                {subscription.userName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-gray-900">{subscription.userName}</p>
                              <p className="text-sm text-gray-500">{subscription.userEmail}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-gray-900 text-white hover:bg-gray-800 px-3 py-1">
                            <Crown size={12} className="mr-1" />
                            {subscription.plan}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`font-semibold border ${getStatusColor(subscription.status)}`}>
                            {subscription.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-gray-900">
                          ${subscription.amount}/month
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {new Date(subscription.renewalDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <motion.div 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }}
                            className="inline-block"
                          >
                            {getActionButton(subscription)}
                          </motion.div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SubscriptionsPage;
