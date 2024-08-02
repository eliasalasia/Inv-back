import express from 'express'
import { getCompras, createCompra, updateCompra, deleteCompra } from '../controller/Compras.controllers.js';


const router = express.Router();

// Obtener todas las compras
router.get('/', getCompras);

// Registrar una nueva compra
router.post('/', createCompra);

// Actualizar una compra existente
router.put('/:id', updateCompra);

// Eliminar una compra existente
router.delete('/:id', deleteCompra);

export default router;
