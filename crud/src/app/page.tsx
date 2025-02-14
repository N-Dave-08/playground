'use client'

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import UserList from '@/components/UserList';
import { useState, useEffect } from 'react';
import { User } from '@/types/User';
import { getUsers } from '@/services/userService';

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">Welcome to User Management</h1>
        <div className="flex gap-4">
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">Register</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <Button onClick={logout} variant={'outline'}>Logout</Button>
      </div>
      
      <div className="grid gap-8">
        <UserList 
          users={users}
          fetchUsers={fetchUsers}
          editingUser={editingUser}
          setEditingUser={setEditingUser}
        />
      </div>
    </div>
  );
}
