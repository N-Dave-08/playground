'use client';

import { useEffect } from 'react';
import { createUser, updateUser } from '../services/userService';
import { User } from '../types/User';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
  fetchUsers: () => void;
  editingUser: User | null;
  setEditingUser: (user: User | null) => void;
}

const createUserSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  password: z.string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const updateUserSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .optional()
    .or(z.literal('')),
});

type CreateUserFormData = z.infer<typeof createUserSchema>;
type UpdateUserFormData = z.infer<typeof updateUserSchema>;

export default function UserForm({ fetchUsers, editingUser, setEditingUser }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateUserFormData | UpdateUserFormData>({
    resolver: zodResolver(editingUser ? updateUserSchema : createUserSchema),
  });

  useEffect(() => {
    if (editingUser) {
      setValue('name', editingUser.name);
      setValue('email', editingUser.email);
      setValue('password', '');
    } else {
      reset({ name: '', email: '', password: '' });
    }
  }, [editingUser, setValue, reset]);

  const onSubmit = async (data: CreateUserFormData | UpdateUserFormData) => {
    try {
      if (editingUser) {
        // Only include password in update if it was provided
        const updateData = {
          name: data.name,
          email: data.email,
          ...(data.password ? { password: data.password } : {})
        };
        await updateUser(editingUser.id!, updateData);
        setEditingUser(null);
      } else {
        await createUser(data as CreateUserFormData);
      }
      // Reset form
      reset({ name: '', email: '', password: '' });
      fetchUsers();
    } catch (err: any) {
      // Set error using setError from react-hook-form if needed
      throw err;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-neutral rounded-lg shadow-lg space-y-4 w-1/3">
      <h2 className="text-xl font-semibold mb-4">
        {editingUser ? 'Edit User' : 'Add New User'}
      </h2>

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          {...register('name')}
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="text"
          {...register('email')}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          {editingUser ? 'New Password (leave blank to keep current)' : 'Password'}
        </Label>
        <Input
          id="password"
          type="password"
          {...register('password')}
          className={errors.password ? 'border-red-500' : ''}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

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
              reset({ name: '', email: '', password: '' });
            }}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
