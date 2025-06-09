
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Edit, Trash2 } from 'lucide-react';
import AddUserDialog from '@/components/users/AddUserDialog';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  avatar?: string;
}

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Administrator',
      status: 'active',
      createdAt: '2024-01-15',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'active',
      createdAt: '2024-01-20',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'User',
      status: 'pending',
      createdAt: '2024-02-01'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      role: 'User',
      status: 'inactive',
      createdAt: '2024-02-05'
    }
  ]);

  const handleAddUser = (newUser: { name: string; email: string; role: string }) => {
    const user: User = {
      id: (users.length + 1).toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, user]);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || user.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'inactive': return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-1 sm:px-0"
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">User Management</h1>
        <p className="text-muted-foreground text-xs sm:text-sm md:text-base">Manage and monitor all user accounts</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3 sm:pb-4 md:pb-6 px-3 sm:px-4 md:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <CardTitle className="text-base sm:text-lg md:text-xl">Users</CardTitle>
                <CardDescription className="text-xs sm:text-sm">A list of all users in your account</CardDescription>
              </div>
              <AddUserDialog onAddUser={handleAddUser} />
            </div>
          </CardHeader>
          <CardContent className="px-3 sm:px-4 md:px-6">
            <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="relative flex-1">
                <Search size={14} className="sm:w-4 sm:h-4 absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-7 sm:pl-9 text-xs sm:text-sm"
                />
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {['all', 'active', 'inactive', 'pending'].map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                    className="capitalize text-xs h-7 sm:h-8 px-2 sm:px-3"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>

            {/* Mobile view */}
            <div className="block md:hidden space-y-3">
              <AnimatePresence>
                {filteredUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="p-3 sm:p-4 border rounded-lg bg-white shadow-sm"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="text-xs sm:text-sm">{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm sm:text-base truncate">{user.name}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        <Badge variant="outline" className="text-xs h-5 sm:h-6">{user.role}</Badge>
                        <Badge className={`text-xs h-5 sm:h-6 ${getStatusColor(user.status)}`}>
                          {user.status}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 sm:h-8 sm:w-8 p-0">
                          <Edit size={12} className="sm:w-3.5 sm:h-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive h-7 w-7 sm:h-8 sm:w-8 p-0">
                          <Trash2 size={12} className="sm:w-3.5 sm:h-3.5" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Created: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Desktop table view */}
            <div className="hidden md:block rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs lg:text-sm">User</TableHead>
                    <TableHead className="text-xs lg:text-sm">Role</TableHead>
                    <TableHead className="text-xs lg:text-sm">Status</TableHead>
                    <TableHead className="text-xs lg:text-sm">Created</TableHead>
                    <TableHead className="text-right text-xs lg:text-sm">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="hover:bg-accent/50 transition-colors duration-200"
                      >
                        <TableCell className="py-3">
                          <div className="flex items-center gap-2 lg:gap-3">
                            <Avatar className="h-7 w-7 lg:h-8 lg:w-8">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback className="text-xs">{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="font-medium text-xs lg:text-sm truncate">{user.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <Badge variant="outline" className="text-xs">{user.role}</Badge>
                        </TableCell>
                        <TableCell className="py-3">
                          <Badge className={`text-xs ${getStatusColor(user.status)}`}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground py-3 text-xs lg:text-sm">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right py-3">
                          <div className="flex justify-end gap-1">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="ghost" size="sm" className="h-7 w-7 lg:h-8 lg:w-8 p-0">
                                <Edit size={14} className="lg:w-4 lg:h-4" />
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive h-7 w-7 lg:h-8 lg:w-8 p-0">
                                <Trash2 size={14} className="lg:w-4 lg:h-4" />
                              </Button>
                            </motion.div>
                          </div>
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

export default UsersPage;
