import { Router } from 'express'; //middleware Router de express
import { validateId } from '../middlewares/middlewares.js'; // importamos el middleware para validar el ID de los productos
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/product.controllers.js'; // importamos el controlador para obtener todos los productos


const router = Router(); //instanciamos el middleware Router

// 1. Primer endpoint GET -> Traer todos los productos
router.get("/", getAllProducts); // controlador getAllProducts que contiene la logica GET

// 2. Segundo endpoint GET -> Traer un producto por ID
router.get("/:id", validateId, getProductById); // controlador getProductById 

// 3. Tercer endpoint POST -> Crear un producto
router.post("/", createProduct); // controlador createProduct

// 4. PUT -> Modificar un producto existente por ID
router.put("/", updateProduct); // controlador updateProduct

// 5. DELETE -> Eliminar un producto por ID
router.delete("/:id", validateId, deleteProduct); // controlador deleteProduct)


export default router; // exportamos el router para que pueda ser utilizado en otros archivos