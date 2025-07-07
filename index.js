/* Importaciones */
import express from 'express';
import environments from './src/config/environments.js'; // Importamos las variables de entorno
import connection from './src/database/db.js' // Importamos la conexion a la base de datos
import { loggerUrl } from './src/middlewares/middlewares.js'; // Importamos el middleware logger para registrar las URLs de las peticiones
import cors from 'cors'; // Middleware para permitir peticiones desde el frontend


const app = express();
const PORT = environments.port;


/* MIDDLEWARES */
/* Middlewares de aplicacion -> aplicados para todas las rutas*/ 
app.use(express.json()); // parsear el cuerpo en solicitudes PUT y POST
app.use(cors()); // Middleware CORS para permitir peticiones desde el frontend
app.use(loggerUrl); // Middleware personalizado para registrar las URLs de las peticiones

/* Rutas - ENDPOINTS */
// Prueba de servidor
// (req, res) : constantemente escucha interaciones del cliente ( req: extrae datos , res: devuelve datos)
app.get("/", (req, res) => {
    res.send("¡Hola, mundo!");
});



app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})

// 1. Primer endpoint GET -> Traer todos los productos
app.get("/productos", async (req, res) => {

    try {
        let sql = `SELECT * from productos;`; // hacemos la consulta sql para mostrar los prod
        const [ rows ] = await connection.query(sql); // desestructuramos la consulta para obtener filas

        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No hay productos disponibles" : "Productos obtenidos correctamente"
        });

    } catch (error) {
        console.log("Error al obtener los productos:", error);
        res.status(500).json({
            error: "Error al obtener los productos"
        });
    }
});

// 2. Segundo endpoint GET -> Traer un producto por ID

app.get("/productos/:id", async (req, res) => {

    try {

        let { id } = req.params; // obtenemos el ID del producto desde los parametros de la ruta

        let sql = `SELECT * FROM productos WHERE id = ?`; // consulta SQL para obtener el producto por ID
        let [ rows ] = await connection.query(sql, [id]); // ejecutamos la consulta y desestructuramos para obtener las filas

        // verificacion de si se encontro el producto
        if (rows.length === 0) {
            return res.status(404).json({
                error: "Producto no encontrado"
            });
        }

        res.status(200).json({
            payload: rows // devolvemos el producto encontrado
        });

    } catch (error) {
        console.log("Error al obtener el producto:", error);
        res.status(500).json({
            error: "Error al obtener el producto"
        });
    }
});

// 3. Tercer endpoint POST -> Crear un producto
app.post("/productos", async (req, res) => {
    try {

        let { nombre, marca, precio, imagen, categoria, activo } = req.body; // obtenemos los datos del producto desde el cuerpo de la solicitud
        if (!nombre || !marca || !precio || !imagen || !categoria || activo === undefined) {
            return res.status(400).json({
                message: "Faltan datos obligatorios"
            });
        };

        //consulta SQL para insertar un nuevo producto
        let sql = `INSERT INTO productos (nombre, marca, precio, categoria, activo, imagen) VALUES (?, ?, ?, ?, ?, ?)`;
        let [ rows ] = await connection.query(sql, [nombre, marca, precio, categoria, activo, imagen]); // ejecutamos la consulta y desestructuramos para obtener las filas

        res.status(201).json({
            message: "Producto creado correctamente",
            productoId: rows.insertId, // devolvemos el ID del producto creado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error al crear el producto",
            error: error.message
        });
    }

});

// 4. PUT -> Modificar un producto existente por ID
app.put("/productos", async (req, res) => {
    try {
        let { id, nombre, marca, precio, imagen, categoria, activo } = req.body; // obtenemos los datos del producto desde el cuerpo de la solicitud

        if(!id || !nombre || !marca || !precio || !imagen || !categoria || activo === undefined) {
            return res.status(400).json({
                message: "Faltan datos obligatorios"
            });
        }

        let sql = `UPDATE productos SET nombre = ?, marca = ?, precio = ?, categoria = ?, activo = ?, imagen = ? WHERE id = ?`; // consulta SQL para actualizar el producto
        let [ rows ] = await connection.query(sql, [nombre, marca, precio, categoria, activo, imagen, id]); // ejecutamos la consulta y desestructuramos para obtener el resultado


        if(rows.affectedRows === 0) {
            return res.status(404).json({
                message: "Producto no encontrado"
            });
        }

        res.status(200).json({
            message: "Producto actualizado correctamente"
        });


    } catch (error) {
        console.log("Error al actualizar el producto:", error);
        res.status(500).json({
            message: "Error al actualizar el producto"
        });
    }
});


// 5. DELETE -> Eliminar un producto por ID
app.delete("/productos/:id", async (req, res) => {
    try {
        let { id } = req.params;

        if(!id) {
            return res.status(400).json({
                message: "Falta el ID del producto a eliminar"
            });
        }

        let sql = `DELETE FROM productos WHERE id = ?`; // consulta SQL para eliminar el producto por ID
        let [ result ] = await connection.query(sql, [id]); // ejecutamos la consulta y desestructuramos para obtener el resultado

        if(result.affectedRows === 0) {
            return res.status(404).json({
                message: "Producto no encontrado"
            });
        };

        res.status(200).json({
            message: "Producto eliminado correctamente"
        });

    } catch (error) {
        console.log("Error al eliminar el producto:", error);
        res.status(500).json({
            message: "Error al eliminar el producto"
        });
    }
});
