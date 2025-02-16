import { User } from '../types/User';
import axiosInstance from '@/lib/axios';

const API_URL = '/users';

export const getUsers = async () => {
    try {
        const response = await axiosInstance.get<User[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const createUser = async (user: User) => {
    try {
        const response = await axiosInstance.post<User>(`${API_URL}/create`, user);
        return response.data;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};

export const updateUser = async (id: number, user: User) => {
    try {
        const response = await axiosInstance.put<User>(`${API_URL}/${id}`, user);
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

export const deleteUser = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
