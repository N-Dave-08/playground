'use client';

import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../services/userService';
import { User } from '../types/User';
import UserForm from './UserForm';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  return (
    <div className="p-6 bg-neutral text-neutral-content rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-white mb-4">User Management</h1>
      <UserForm fetchUsers={fetchUsers} editingUser={editingUser} setEditingUser={setEditingUser} />

      <ul className="mt-4 space-y-2">
        {users.map((user) => (
          <li key={user.id} className="bg-base-100/40 text-base-content p-4 rounded-md flex justify-between items-center">
            <div>
              <strong>{user.name}</strong> - {user.email}
            </div>
            <div className="space-x-2">
              <Button
                onClick={() => handleEdit(user)}
              >
                Edit
              </Button>
              <Button
                variant={'destructive'}
                onClick={() => handleDelete(user.id!)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
