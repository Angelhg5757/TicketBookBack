module.exports = (app) => {
    const usuario = require("../controllers/usuario.controller");
    const asientos = require("../controllers/asientos.controller");
    const boletos = require("../controllers/boletos.controller");
    const roles = require("../controllers/roles.controller");
    const usuarioHB = require("../controllers/usuarioHB.controller");
    const eventos = require("../controllers/eventos.controller");
    const tarjeta = require("../controllers/tarjeta.controller");

    var router = require("express").Router();
    
    //router.post("/loginUser", usuario.postLogin);

    //Rutas de usuario
    router.get("/usuario/listar", usuario.list);
    router.get("/usuario/listar/:id", usuario.listID);
    router.post("/usuario/crear", usuario.create);
    router.put("/usuario/actualizarStatus/:id", usuario.actualizarStatus);
    router.delete("/usuario/eliminar/:id", usuario.borrar);
    router.post("/usuario/log", usuario.login);

    //Rutas de asientos
    router.get("/asientos/listar", asientos.list);
    router.post("/asientos/crear", asientos.create);
    router.put("/asientos/actualizar/:id", asientos.actualizar);
    router.delete("/asientos/eliminar/:id", asientos.eliminar);

    //Rutas de boletos
    router.get("/boletos/listar", boletos.list);
    router.post("/boletos/crear", boletos.create);
    router.put("/boletos/actualizar/:id", boletos.actualizar);
    router.delete("/boletos/eliminar/:id", boletos.eliminar);

    //Rutas de roles
    router.get("/roles/listar", roles.list);
    
    //Rutas de eventos
    router.get("/eventos/listar", eventos.listar);
    router.post("/eventos/crear", eventos.create);
    router.put("/eventos/actualizar/:id", eventos.actualizar);
    router.delete("/eventos/eliminar/:id", eventos.eliminar);

    //Rutas de usuario_has_boletos
    router.get("/usuarioH/listar", usuarioHB.listar);
    router.post("/usuarioH/crear", usuarioHB.create);
    router.put("/usuarioH/actualizar/:id", usuarioHB.actualizar);
    router.delete("/usuarioH/eliminar/:id", usuarioHB.borrar);

    router.get("/tarjeta/listar", tarjeta.listar);
    router.get("/tarjeta/listarUser/:id", tarjeta.listIDUser);
    router.post("/tarjeta/crear", tarjeta.create);
    router.put("/tarjeta/actualizar/:id", tarjeta.actualizar);
    router.delete("/tarjeta/eliminar/:idTarjeta", tarjeta.eliminar);

    app.use(router);
};