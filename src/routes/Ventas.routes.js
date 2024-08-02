import express from 'express'
import { createVenta, getVentas } from '../controller/Ventas.controllers.js';


const router = express.Router();

// Obtener todas las ventas
router.get('/', getVentas);

// Crear una nueva venta
router.post('/', createVenta);

export default router;