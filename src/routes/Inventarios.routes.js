
import express from 'express';
import { addProducto, getInventario, updateProductoCantidad } from '../controller/Inventarios.controllers.js';




const router = express.Router();

// Obtener todo el inventario
router.get('/', getInventario);

// Añadir un nuevo producto al inventario
router.post('/', addProducto);

// Actualizar cantidad de un producto
router.put('/:id', updateProductoCantidad);

export default router;
