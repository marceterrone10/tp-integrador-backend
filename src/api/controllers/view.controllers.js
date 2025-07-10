import * as Products from '../models/product.models.js';

export const viewList = async(req, res) => {

    try{

        const respuestaProductos = await Products.selectAllProducts(); // llamo a la funcion que trae todos los productos

        res.render("index", {
            tittle: "Listado de productos",
            products: respuestaProductos[0]
        });

    } catch (error) {
        console.log(error);
    }
};

export const viewListConsultById = async(req, res) => {
    res.render("consultar", {
        tittle: "Consultar producto por ID"
    });
};

export const viewCreate = async(req, res) => {
    res.render("crear", {
        tittle: "Crear nuevo producto"
    });
};

export const viewUpdate = async(req, res) => {
    res.render("actualizar", {
        tittle: "Actualizar producto por ID"
    });
};

export const viewDelete = async(req, res) => {
    res.render("eliminar", {
        tittle: "Eliminar producto por ID"
    });
};