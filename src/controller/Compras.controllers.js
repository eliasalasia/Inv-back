
import { pool } from '../config/db.js';



// Obtener todas las compras
export const getCompras = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM compras'); // Cambia db.query por pool.query
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Registrar una nueva compra
export const createCompra = async (req, res) => {
  const { proveedor_id, total, productos } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO compras (proveedor_id, total) VALUES (?, ?)',
      [proveedor_id, total]
    );
    const compra_id = result.insertId;
    
    // Insertar detalles de productos comprados
    for (let producto of productos) {
      await pool.query(
        'INSERT INTO detalle_compra (compra_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)',
        [compra_id, producto.id, producto.cantidad, producto.precio]
      );
      // Actualizar inventario
      await pool.query(
        'UPDATE productos SET cantidad = cantidad + ? WHERE id = ?',
        [producto.cantidad, producto.id]
      );
    }
    
    res.status(201).json({ id: compra_id, message: 'Compra registrada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una compra existente
export const updateCompra = async (req, res) => {
  const { id } = req.params;
  const { proveedor_id, total, productos } = req.body;
  try {
    // Actualizar los datos de la compra
    await pool.query(
      'UPDATE compras SET proveedor_id = ?, total = ? WHERE id = ?',
      [proveedor_id, total, id]
    );
    
    // Actualizar detalles de productos comprados
    await pool.query('DELETE FROM detalle_compra WHERE compra_id = ?', [id]); // Eliminar los detalles actuales
    for (let producto of productos) {
      await pool.query(
        'INSERT INTO detalle_compra (compra_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)',
        [id, producto.id, producto.cantidad, producto.precio]
      );
      // Actualizar inventario
      await pool.query(
        'UPDATE productos SET cantidad = cantidad + ? WHERE id = ?',
        [producto.cantidad, producto.id]
      );
    }
    
    res.status(200).json({ message: 'Compra actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una compra existente
export const deleteCompra = async (req, res) => {
  const { id } = req.params;
  try {
    // Eliminar los detalles de la compra
    await pool.query('DELETE FROM detalle_compra WHERE compra_id = ?', [id]);
    
    // Eliminar la compra
    await pool.query('DELETE FROM compras WHERE id = ?', [id]);
    
    res.status(200).json({ message: 'Compra eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};