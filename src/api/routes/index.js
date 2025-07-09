// aca es donde centralizamos las rutas de la aplicacion

import productRoutes from './product.routes.js'; // Importamos las rutas de productos
// archivo de barril que contiene todas las rutas de la aplicacion. Rutas de vistas, usuarios, etc.
import viewRoutes from './view.routers.js'; // Importamos las rutas de vistas

export {
    productRoutes, // Exportamos las rutas de productos
    viewRoutes // Exportamos las rutas de vistas
}