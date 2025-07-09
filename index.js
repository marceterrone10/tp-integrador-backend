/* Importaciones */
import express from 'express';
import environments from './src/api/config/environments.js'; // Importamos las variables de entorno
import { loggerUrl } from './src/api//middlewares/middlewares.js'; // Importamos el middleware logger para registrar las URLs de las peticiones
import cors from 'cors'; // Middleware para permitir peticiones desde el frontend
import { productRoutes, viewRoutes } from './src/api/routes/index.js';
import { join, __dirname } from './src/api/utils/index.js'; // Importamos las utilidades para trabajar con rutas y archivos


const app = express();
const PORT = environments.port;

// Configuracion del EJS
app.set("view engine", "ejs"); // Configuramos EJS como motor de plantillas

// Definimos ruta donde se almacenan las plantillas .ejs
app.set("views", join(__dirname, "src/views"));

// Configuramos Express para que sirva archivos estaticos desde la carpeta public/
app.use(express.static(join(__dirname, "src/public")));


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
});

// Llamadas a las rutas de productos
app.use("/api/productos", productRoutes); // Rutas de productos
app.use("/dashboard", viewRoutes); // Rutas de vistas del dashboard



