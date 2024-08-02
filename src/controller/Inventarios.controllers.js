import { pool } from '../config/db.js';

export const getInventario = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addProducto = async (req, res) => {
  const { nombre, descripcion, precio, cantidad } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, cantidad) VALUES (?, ?, ?, ?)',
      [nombre, descripcion, precio, cantidad]
    );
    res.status(201).json({ id: result.insertId, message: 'Producto añadido exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProductoCantidad = async (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;
  try {
    await db.query('UPDATE productos SET cantidad = ? WHERE id = ?', [cantidad, id]);
    res.json({ message: 'Cantidad actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
