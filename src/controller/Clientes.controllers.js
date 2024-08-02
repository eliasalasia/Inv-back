import { pool } from '../config/db.js'; // Asegúrate de importar pool desde db.js

export const getClientes = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM clientes'); // Cambia db.query por pool.query
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const addCliente = async (req, res) => {
  const { nombre, email, telefono, direccion } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO clientes (nombre, email, telefono, direccion) VALUES (?, ?, ?, ?)',
      [nombre, email, telefono, direccion]
    );
    res.status(201).json({ id: result.insertId, message: 'Cliente añadido exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, direccion } = req.body;
  try {
    await pool.query(
      'UPDATE clientes SET nombre = ?, email = ?, telefono = ?, direccion = ? WHERE id = ?',
      [nombre, email, telefono, direccion, id]
    );
    res.json({ message: 'Información del cliente actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
