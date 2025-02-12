import axios from 'axios';
import { User } from '../types/User';

const API_URL = 'http://localhost:5000/api/users';

export const getUsers = async () => {
    try {
        const response = await axios.get<User[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const createUser = async (user: User) => {
    try {
        const response = await axios.post<User>(API_URL, user);
        return response.data;
    } catch (error) {
        console.error('Error adding users:', error);
        throw error;
    }

};

export const updateUser = async (id: number, user: User) => {
    try {
        const response = await axios.put<User>(`${API_URL}/${id}`, user);
        return response.data;
    } catch (error) {
        console.error('Error updating users:', error);
        throw error;
    }

};

export const deleteUser = async (id: number) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
    
};
