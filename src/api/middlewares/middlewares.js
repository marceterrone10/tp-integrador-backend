const loggerUrl = ((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toLocaleString()}`);
    next();
}); // Middleware logger para analizar y registrar las solicitudes

// Middleware validador de ID
const validateId = (req, res, next) => {
    const { id } = req.params; // o const id = req.params.id;

    if( !id || isNaN(id)){
        return res.status(400).json({
            error: "ID invalido"
        });
    }
    req.id = parseInt(id, 10); // parseamos el id (originalmente un string porque viene de la URL) a un numero entero
    next();
};

export { //exportamos middlewares
    loggerUrl,
    validateId
};