module.exports = (app) => {
    const usuario = require("../controllers/usuario.controller");
    const asientos = require("../controllers/asientos.controller");
    const boletos = require("../controllers/boletos.controller");
    const roles = require("../controllers/roles.controller");
    const usuarioHB = require("../controllers/usuarioHE.controller");
    const eventos = require("../controllers/eventos.controller");
    const tarjeta = require("../controllers/tarjeta.controller");
    const inmuebles = require("../controllers/inmuebles.controller");
    const precio = require("../controllers/precio.controller");
    const secciones = require("../controllers/secciones.controller");
    const eventoHAHB = require("../controllers/eventosHAHB.controller");
    var router = require("express").Router();
    

    //Rutas de usuario
    router.get("/usuario/listar", usuario.list);
    router.get("/usuario/listar/:id", usuario.listID);
    router.post("/usuario/crear", usuario.create);
    router.put("/usuario/actualizar/:id", usuario.actualizar);
    router.put("/usuario/actualizarPerfil/:id", usuario.actualizarPerfil);
    router.put("/usuario/actualizarStatus/:id", usuario.actualizarStatus);
    router.delete("/usuario/eliminar/:id", usuario.borrar);
    router.post("/usuario/log", usuario.login);
    router.get("/usuario/nombre/:id", usuario.obtenerNombre);
    router.get("/usuario/todos",usuario.getNombres);

    //Rutas de asientos
    router.get("/asientos/listar", asientos.list);
    router.post("/asientos/crear", asientos.create);
    router.put("/asientos/actualizar/:id", asientos.actualizar);
    router.delete("/asientos/eliminar/:id", asientos.eliminar);
    router.get("/asientos/secciones", asientos.getSecciones);
    router.get("/asientosseccion/:id", asientos.getAsientosSeccion);


    //Rutas de boletos
    router.get("/boletos/listar", boletos.list);
    router.post("/boletos/crear", boletos.create);
    router.get("/misboletos/:id", boletos.usuarioporboleto);
    router.get("/boletosEvento/:id", boletos.boletoporevento);
    router.get("/boletosUsuario/:id", boletos.boletoporusuario); // Metodo bueno jeje
    //router.put("/boletos/actualizar/:id", boletos.actualizar);
    router.delete("/boletos/eliminar/:id", boletos.eliminar);
    router.get("/boletoscrud", boletos.crudBoletos);
    router.put("/boletos/actualizando/:id",boletos.actualizarAnidado);//Metodo bueno jeje
    router.post("/boletos/creando", boletos.crearAnidado);


    //Rutas de roles
    router.get("/roles/listar", roles.list);
    
    //Rutas de eventos
    router.get("/eventos/listar", eventos.listar);
    router.post("/eventos/crear", eventos.create);
    router.put("/eventos/actualizar/:id", eventos.actualizar);
    router.delete("/eventos/eliminar/:id", eventos.eliminar);
    router.get("/eventos/usuario/:id", eventos.eventosUsuario);
    router.get("/eventos/proximos", eventos.eventoProximo);
    router.get("/eventos/todos", eventos.getNombres);

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

    router.get("/inmuebles/listar", inmuebles.listar);
    router.post("/inmuebles/crear", inmuebles.create);
    // router.put("/inmuebles/actualizar/:id", inmuebles.actualizar);
    // router.delete("/inmuebles/eliminar/:id", inmuebles.eliminar);

    router.get("/precio/listar", precio.listar);
    router.get("/precio/todos", precio.getPrecio);
    // router.post("/precio/crear", precio.create);
    // router.put("/precio/actualizar/:id", precio.actualizar);
    // router.delete("/precio/eliminar/:id", precio.eliminar);

    router.get("/eventoHAHB/listar", eventoHAHB.listar);
    router.post("/eventoHAHB/crear", eventoHAHB.create);
    router.put("/eventoHAHB/actualizar/:id", eventoHAHB.actualizar);
    router.delete("/eventoHAHB/eliminar/:id", eventoHAHB.borrar);

    router.get("/secciones/listar", secciones.list);
    router.post("/secciones/crear", secciones.create);
    router.put("/secciones/actualizar/:id", secciones.actualizar);
    router.delete("/secciones/eliminar/:id", secciones.eliminar);


    app.use(router);
};