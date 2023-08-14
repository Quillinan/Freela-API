import connection from "../database/database.connection.js";

export const servicesController = {
  addService: async (req, res) => {
    try {
      const { name, photo, description } = req.body;
      const userId = req.user.id;

      const insertQuery =
        'INSERT INTO services (name, photo, "idUser", description, active) VALUES ($1, $2, $3, $4, $5) RETURNING *';

      const values = [name, photo, userId, description, true];
      const newService = await connection.query(insertQuery, values);

      res.status(201).json({
        message: "Novo serviço adicionado com sucesso!",
        data: newService.rows[0],
      });
    } catch (err) {
      res
        .status(422)
        .json({ error: "Erro ao adicionar serviço.", details: err.message });
    }
  },
  getUserServices: async (req, res) => {
    try {
      const userId = req.params.userId;

      const query = `
        SELECT * FROM services
        WHERE "idUser" = $1
      `;
      const result = await connection.query(query, [userId]);

      const userServices = result.rows;

      res.status(200).json(userServices);
    } catch (err) {
      res.status(500).json({
        error: "Erro ao obter serviços do usuário.",
        details: err.message,
      });
    }
  },
  getAllServices: async (_, res) => {
    try {
      const query = `
        SELECT * FROM services
        WHERE active = true
      `;
      const result = await connection.query(query);

      const activeServices = result.rows;

      res.status(200).json(activeServices);
    } catch (err) {
      res.status(500).json({
        error: "Erro ao obter serviços.",
        details: err.message,
      });
    }
  },

  getOneService: async (req, res) => {
    try {
      const serviceId = req.params.serviceId;

      const query = `
        SELECT 
          services.*,
          users.name AS "ownerName",
          users.email AS "ownerEmail",
          users.phone AS "ownerPhone",
          users.city AS "ownerCity"
        FROM services
        JOIN users ON services."idUser" = users.id
        WHERE services.id = $1
      `;

      const result = await connection.query(query, [serviceId]);

      const service = result.rows[0];

      if (!service) {
        return res.status(404).json({ error: "Serviço não encontrado" });
      }

      res.status(200).json(service);
    } catch (err) {
      res.status(500).json({
        error: "Erro ao obter serviço.",
        details: err.message,
      });
    }
  },

  activateService: async (req, res) => {
    try {
      const serviceId = req.params.serviceId;
      const userId = req.user.id;

      const query = `
        SELECT * FROM services
        WHERE id = $1
      `;
      const result = await connection.query(query, [serviceId]);

      const service = result.rows[0];
      console.log(service);

      if (service.idUser !== userId) {
        return res.status(401).json({ error: "Usuário inválido" });
      }

      const updateQuery = `
        UPDATE services
        SET active = true
        WHERE id = $1
      `;
      await connection.query(updateQuery, [serviceId]);

      res.status(200).json({ message: "Serviço ativado com sucesso!" });
    } catch (err) {
      res.status(500).json({
        error: "Erro ao ativar serviço.",
        details: err.message,
      });
    }
  },
  deactivateService: async (req, res) => {
    try {
      const serviceId = req.params.serviceId;
      const userId = req.user.id;

      const query = `
        SELECT * FROM services
        WHERE id = $1
      `;
      const result = await connection.query(query, [serviceId]);

      const service = result.rows[0];

      if (service.idUser !== userId) {
        return res.status(401).json({ error: "Usuário inválido" });
      }

      const updateQuery = `
        UPDATE services
        SET active = false
        WHERE id = $1
      `;
      await connection.query(updateQuery, [serviceId]);

      res.status(200).json({ message: "Serviço desativado com sucesso!" });
    } catch (err) {
      res.status(500).json({
        error: "Erro ao desativar serviço.",
        details: err.message,
      });
    }
  },
  deleteService: async (req, res) => {
    try {
      const serviceId = req.params.serviceId;
      const userId = req.user.id;

      const query = `
        SELECT * FROM services
        WHERE id = $1
      `;
      const result = await connection.query(query, [serviceId]);

      const service = result.rows[0];

      if (service.idUser !== userId) {
        return res.status(401).json({ error: "Usuário inválido" });
      }

      const deleteQuery = `
        DELETE FROM services
        WHERE id = $1
      `;
      await connection.query(deleteQuery, [serviceId]);

      res.status(200).json({ message: "Serviço deletado com sucesso!" });
    } catch (err) {
      res.status(500).json({
        error: "Erro ao deletar serviço.",
        details: err.message,
      });
    }
  },
};
