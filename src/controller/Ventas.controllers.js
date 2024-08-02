import { pool } from '../config/db.js'; // Asegúrate de importar pool desde db.js

export const getVentas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ventas'); // Cambia db.query por pool.query
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createVenta = async (req, res) => {
  const { cliente_id, total, productos } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO ventas (cliente_id, total) VALUES (?, ?)',
      [cliente_id, total]
    );
    const venta_id = result.insertId;
    
    // Insertar detalles de productos vendidos
    for (let producto of productos) {
      await pool.query(
        'INSERT INTO detalle_venta (venta_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)',
        [venta_id, producto.id, producto.cantidad, producto.precio]
      );
    }
    
    res.status(201).json({ id: venta_id, message: 'Venta creada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
