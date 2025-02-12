import pool from '../config/db';
import bcrypt from 'bcryptjs'

interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
}

// Hash password before storing in DB
export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Find User by Email
export const findUserByEmail = async (email: string): Promise<User | null> => {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return rows.length > 0 ? rows[0] : null;
};

// Compare Password
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};


export const getAllUsers = async (): Promise<User[]> => {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
};

export const getUserById = async (id: number): Promise<User | null> => {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return rows[0] || null;
};

export const createUser = async (user: User): Promise<User> => {
    const hashedPassword = await hashPassword(user.password);
    const { name, email } = user;
    const { rows } = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
        [name, email, hashedPassword]
    );
    return rows[0];
};

export const updateUser = async (id: number, user: User): Promise<User | null> => {
    const { name, email } = user;
    const { rows } = await pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [name, email, id]
    );
    return rows[0] || null;
};

export const deleteUser = async (id: number): Promise<void> => {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
};


