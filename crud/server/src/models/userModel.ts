import pool from '../config/db';

interface User {
  id?: number;
  name: string;
  email: string;
}

export const getAllUsers = async (): Promise<User[]> => {
  const { rows } = await pool.query('SELECT * FROM users');
  return rows;
};

export const getUserById = async (id: number): Promise<User | null> => {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0] || null;
};

export const createUser = async (user: User): Promise<User> => {
  const { name, email } = user;
  const { rows } = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
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
