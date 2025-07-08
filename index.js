/* Importaciones */
import express from 'express';
import environments from './src/config/environments.js'; // Importamos las variables de entorno
import { loggerUrl } from './src/middlewares/middlewares.js'; // Importamos el middleware logger para registrar las URLs de las peticiones
import cors from 'cors'; // Middleware para permitir peticiones desde el frontend
import { productRoutes } from './src/routes/index.js';


const app = express();
const PORT = environments.port;


/* MIDDLEWARES */
/* Middlewares de aplicacion -> aplicados para todas las rutas*/ 
app.use(express.json()); // parsear el cuerpo en solicitudes PUT y POST
app.use(cors()); // Middleware CORS para permitir peticiones desde el frontend
app.use(loggerUrl); // Middleware personalizado para registrar las URLs de las peticiones

// Prueba de servidor
// (req, res) : constantemente escucha interaciones del cliente ( req: extrae datos , res: devuelve datos)
app.get("/", (req, res) => {
    res.send("¡Hola, mundo!");
});

// Configuración del servidor para escuchar en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})

// Llamadas a las rutas de productos
app.use("/productos", productRoutes); // Rutas de productos



