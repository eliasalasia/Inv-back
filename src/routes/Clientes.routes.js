import express from 'express'
import { addCliente, getClienteById, getClientes, updateCliente } from '../Controller/Clientes.controllers.js';


const router = express.Router();

// Obtener todos los clientes
router.get('/', getClientes);

// Obtener un cliente específico por ID (añadido)
router.get('/:id', getClienteById);

// Añadir un nuevo cliente
router.post('/', addCliente);

// Actualizar información de un cliente
router.put('/:id', updateCliente);

export default router;