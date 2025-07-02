import mysql from 'mysql2/promise'; // importamos el modulo mysql2 en modo promesa para usar async/await en la conexion a la DB mysql

//traemos datos de conexion de nuestro archivo de configuracion de entornos
import environments from '../config/environments.js';

const { database } = environments; // destructuramos el objeto database de environments

const connection = mysql.createPool({
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password,
    port: 3307 // puerto por defecto de MySQL
});

export default connection; // exportamos la conexion para usarla en otros archivos