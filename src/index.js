import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ventasRoutes from './routes/Ventas.routes.js';
import inventarioRoutes from './routes/Inventarios.routes.js';
import comprasRoutes from './routes/Compras.routes.js';
import clientesRoutes from './routes/Clientes.routes.js';
import corsOptions from './middlewares/corsOptions.js'; 
import { PORT } from './config/Config.js';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;
app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/ventas', ventasRoutes);
app.use('/api/inventario', inventarioRoutes);
app.use('/api/compras', comprasRoutes);
app.use('/api/clientes', clientesRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});