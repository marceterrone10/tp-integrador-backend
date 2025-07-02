const url = "http://localhost:3000"; // URL de la API


/* Script para obtener productos */ 
async function obtenerDatosProductos() {
    try {
        let respuesta = await fetch(`${url}/productos`); // Realizamos una solicitud GET a la API
        console.log(respuesta);

        let data = await respuesta.json(); // Conversion a un objeto js
        console.log(data);

        mostrarProductos(data); // función para mostrar los productos
    } catch (error) {
        console.log("Error al obtener los datos:", error);
    }
}

function mostrarProductos(productos) {
    let listaProductos = productos.payload; //accedo al array de productos dentro del objeto payload

    // variables para manipular el DOM
    let productosLista = document.getElementById("productos-lista");
    let htmlProductos = "";

    listaProductos.forEach(producto => {
        htmlProductos += `
            <li class="producto-item">
                <img src="${producto.imagen}" class="producto-imagen">
                <h2>${producto.nombre}</h2>
                <p>Precio: $${producto.precio}</p>
                <p>Marca: ${producto.marca}</p>
            </li>
                `;
    }); // inyecto cada producto al html

    productosLista.innerHTML = htmlProductos;
}
obtenerDatosProductos();

/* Script para obtener un producto por ID */

let getId_lista = document.getElementById("producto-detalle");
let getProduct_form = document.getElementById("getProduct-form");

getProduct_form.addEventListener("submit", async( e ) => {
    e.preventDefault(); // evitar que se envie el form

    try {
        let formData = new FormData(e.target); // obtengo datos del form
        let data = Object.fromEntries(formData.entries()); // parseo FormData a un objeto
        let idProd = data.idProd;

        let response = await fetch(`${url}/productos/${idProd}`); // realizo la solicitud GET a la API con el ID del producto
        let datos = await response.json(); // convierto la respuesta a JSON

        let producto = datos.payload[0]

        let htmlProductos = `
            <li class="producto-item">
                <img src="${producto.imagen}" class="producto-imagen">
                <h2>${producto.nombre}</h2>
                <h3>${producto.marca}</h3>
                <p>Precio: $${producto.precio}</p>
            </li>
        `; // creo el html del producto

        getId_lista.innerHTML = htmlProductos; // inyecto el html al contenedor de detalles del producto

    } catch (error) {
        console.log("Error al obtener el producto:", error);
    }
})