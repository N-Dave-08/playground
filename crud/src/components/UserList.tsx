'use client';

import { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../services/userService';
import { User } from '../types/User';
import UserForm from './UserForm';

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
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-white mb-4">User Management</h1>
      <UserForm fetchUsers={fetchUsers} editingUser={editingUser} setEditingUser={setEditingUser} />

      <ul className="mt-4 space-y-2">
        {users.map((user) => (
          <li key={user.id} className="bg-gray-700 text-white p-4 rounded-md flex justify-between items-center">
            <div>
              <strong>{user.name}</strong> - {user.email}
            </div>
            <div className="space-x-2">
              <button
                className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
                onClick={() => handleDelete(user.id!)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
