import connection from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export const usersController = {
  signup: async (req, res) => {
    try {
      const { email } = req.body;
      const existingUser = await connection.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (existingUser.rows.length > 0) {
        return res.status(409).json({ error: "Usuário já existe." });
      }

      const { name, city, phone, password } = req.body;

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const insertQuery =
        "INSERT INTO users (name, city, phone, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *";
      const values = [name, city, phone, email, hashedPassword];
      await connection.query(insertQuery, values);

      res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (err) {
      res
        .status(422)
        .json({ error: "Erro ao criar usuário.", details: err.message });
    }
  },
  signin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await connection.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (existingUser.rows.length === 0) {
        return res.status(401).json({ error: "Usuário não existe." });
      }

      const user = existingUser.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Senha incorreta." });
      }

      const token = uuid();
      const updateQuery = "UPDATE users SET token = $1 WHERE id = $2";
      const values = [token, user.id];
      await connection.query(updateQuery, values);

      res.status(200).json({ token: token });
    } catch (err) {
      res
        .status(422)
        .json({ error: "Erro ao fazer login.", details: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      const userId = req.user.id;

      const updateQuery = `
        UPDATE users
        SET token = NULL
        WHERE id = $1
      `;
      await connection.query(updateQuery, [userId]);

      res.status(200).json({ message: "Logout realizado com sucesso!" });
    } catch (err) {
      res.status(500).json({
        error: "Erro ao realizar o logout.",
        details: err.message,
      });
    }
  },
};
