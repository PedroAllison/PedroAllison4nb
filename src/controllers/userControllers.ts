import { Request, Response } from 'express';
import pool from '../config/database';

// Função para obter todos os usuários
export const getUsers = async (req: Request, res: Response) => {
  console.log("Entrei no getUsers")
  try {
    const { rows } = await pool.query('SELECT id,name,email FROM users');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

// Função para adicionar um novo usuário
export const addUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  console.log(req.params);
  console.log(req.header);
  console.log(req.body);
  try {
    const queryText = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *';
    const { rows } = await pool.query(queryText, [name, email]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao adicionar usuário' });
  }
};