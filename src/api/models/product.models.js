import connection from '../database/db.js'; // Importamos la conexión a la base de datos

export const selectAllProducts = async () => {
    let sql = `SELECT * FROM productos WHERE activo = 1;`; // hacemos la consulta sql para mostrar los prod
    return await connection.query(sql); // desestructuramos la consulta para obtener filas - llamada a base de datos
};

export const selectProductById = async (id) => {
    /*let { id } = req.params; // obtenemos el ID del producto desde los parametros de la ruta*/

    let sql = `SELECT * FROM productos WHERE id = ?`; // consulta SQL para obtener el producto por ID
    return await connection.query(sql, [id]); // ejecutamos la consulta y desestructuramos para obtener las filas
};

export const postProduct = async(nombre, marca, precio, categoria, activo, imagen) => {
    //consulta SQL para insertar un nuevo producto
    const activoValue = Number(activo); //convierto el valor de activo a numero porque viene de un String
    let sql = `INSERT INTO productos (nombre, marca, precio, categoria, activo, imagen) VALUES (?, ?, ?, ?, ?, ?)`;
    return await connection.query(sql, [nombre, marca, precio, categoria, activoValue, imagen]); // ejecutamos la consulta y desestructuramos para obtener las filas
};

export const modifyProduct = async(nombre, marca, precio, categoria, activo, imagen, id) => {
    const activoValue = Number(activo);
    let sql = `UPDATE productos SET nombre = ?, marca = ?, precio = ?, categoria = ?, activo = ?, imagen = ? WHERE id = ?`; // consulta SQL para actualizar el producto
    return await connection.query(sql, [nombre, marca, precio, categoria, activoValue, imagen, id]); // ejecutamos la consulta y desestructuramos para obtener el resultado
};

export const deleteProductById = async(id) => {
    let sql = `DELETE FROM productos WHERE id = ?`; // consulta SQL para eliminar el producto por ID
    return await connection.query(sql, [id]); // ejecutamos la consulta y desestructuramos para obtener el resultado
};