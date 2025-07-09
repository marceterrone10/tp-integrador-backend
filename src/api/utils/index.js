// Logica para trabajar con archivos y rutas Express
// Importamos modulos //


// Este modulo convierte una URL de archivo en una ruta de archivo valida para el SO
import { fileURLToPath } from 'url'; 

// dirname extrae el directorio padre de una ruta
// join concatena rutas como si fuera path.join, sirve para construir rutas
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url); // obtenemos la ruta del archivo actual, meta.url es una propiedad que contiene la URL del modulo actual, fileUrlToPath convierte esa URL en una ruta de archivo valida para el sistema operativo actual

const __dirname = join(dirname(__filename), '../../../'); // obtenemos el directorio del archivo actual, retrocedemos tres niveles para llegar al directorio raiz del proyecto desde utils -> api -> src -> backend 

// Exportamos las variables
export {
    __dirname,
    join
}






