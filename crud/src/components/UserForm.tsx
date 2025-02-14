'use client';

import { useState, useEffect, FormEvent } from 'react';
import { createUser, updateUser } from '../services/userService';
import { User } from '../types/User';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface Props {
  fetchUsers: () => void;
  editingUser: User | null;
  setEditingUser: (user: User | null) => void;
}

export default function UserForm({ fetchUsers, editingUser, setEditingUser }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setPassword('');
    }
  }, [editingUser]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate password for new users or when changing password
    if (!editingUser || password) {
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }
    }

    try {
      if (editingUser) {
        // Only include password in update if it was changed
        await updateUser(editingUser.id!, { 
          name, 
          email,
          ...(password ? { password } : {})
        });
        setEditingUser(null);
      } else {
        if (!password) {
          setError('Password is required for new users');
          return;
        }
        await createUser({ name, email, password });
      }
      // Reset form
      setName('');
      setEmail('');
      setPassword('');
      fetchUsers();
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-neutral rounded-lg shadow-lg space-y-4">
      <h2 className="text-xl font-semibold mb-4">
        {editingUser ? 'Edit User' : 'Add New User'}
      </h2>

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          {editingUser ? 'New Password (leave blank to keep current)' : 'Password'}
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={!editingUser}
          minLength={6}
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <div className="flex gap-2">
        <Button type="submit" variant={'secondary'}>
          {editingUser ? 'Update User' : 'Add User'}
        </Button>
        {editingUser && (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setEditingUser(null);
              setName('');
              setEmail('');
              setPassword('');
              setError('');
            }}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
