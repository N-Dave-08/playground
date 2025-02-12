'use client';

import { useState, useEffect, FormEvent } from 'react';
import { createUser, updateUser } from '../services/userService';
import { User } from '../types/User';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Props {
  fetchUsers: () => void;
  editingUser: User | null;
  setEditingUser: (user: User | null) => void;
}

export default function UserForm({ fetchUsers, editingUser, setEditingUser }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    }
  }, [editingUser]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      await updateUser(editingUser.id!, { name, email });
      setEditingUser(null);
    } else {
      await createUser({ name, email });
    }
    setName('');
    setEmail('');
    fetchUsers();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-3">
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button
        type="submit"
        variant={'secondary'}
        className='w-full'
      >
        {editingUser ? 'Update User' : 'Add User'}
      </Button>
    </form>
  );
}
