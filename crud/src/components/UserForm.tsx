'use client';

import { useState, useEffect, FormEvent } from 'react';
import { createUser, updateUser } from '../services/userService';
import { User } from '../types/User';

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
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
      />
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded"
      >
        {editingUser ? 'Update User' : 'Add User'}
      </button>
    </form>
  );
}
