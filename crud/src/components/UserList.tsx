'use client';

import { deleteUser } from '../services/userService';
import { User } from '../types/User';
import UserForm from './UserForm';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface UserListProps {
  users: User[];
  fetchUsers: () => Promise<void>;
  editingUser: User | null;
  setEditingUser: (user: User | null) => void;
}

export default function UserList({ users, fetchUsers, editingUser, setEditingUser }: UserListProps) {
  const handleDelete = async (id: number) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="p-6 bg-base-200 text-base-content rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-white mb-4">User Management</h1>
      <UserForm fetchUsers={fetchUsers} editingUser={editingUser} setEditingUser={setEditingUser} />

      <ul className="mt-4 space-y-2">
        {users.map((user) => (
          <li key={user.id} className="bg-base-100 text-base-content p-4 rounded-md flex justify-between items-center">
            <div>
              <strong>{user.name}</strong> - {user.email}
            </div>
            <div className="space-x-2">
              <Button
                onClick={() => setEditingUser(user)}
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
