const sql = require("./db.js");
// const moment = require('moment');

//Constructor
const Eventos = function (eventos) {
  this.idEventos = eventos.idEventos;
  this.idPrecio = eventos.idPrecio;
  this.idInmueble = eventos.idInmueble;
  this.ciudad = eventos.ciudad;
  this.fecha = eventos.fecha;
  this.horario = eventos.horario;
  this.nombre = eventos.nombre;
  this.descripcion = eventos.descripcion;
};
//Crear
Eventos.create = (eventos, result) => {
  const text =
    'INSERT INTO "eventos" ("idPrecio", "idInmueble", "ciudad", "fecha", "horario", "nombre", "descripcion") VALUES ($1, $2, $3, $4, $5, $6, $7)';
  const values = [eventos.idPrecio, eventos.idInmueble, eventos.ciudad, eventos.fecha, eventos.horario, eventos.nombre, eventos.descripcion];
  sql.query(text, values, (err, res) => {
    if (err) {
      console.log("Error al crear el evento: ", err);
      result(err, null);
      return;
    }
    console.log("Evento guardado!", res);
    result(null, res);
  });
};
//Obtener
Eventos.getAll = (result) => {
  let query = 'SELECT eventos."idEventos", eventos.nombre as eventos_nombre, eventos.descripcion, eventos.fecha, eventos.ciudad, eventos.imagen, inmuebles.nombre as inmueble_nombre FROM eventos INNER JOIN inmuebles ON inmuebles."idInmuebles" = eventos."idInmueble"';

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Eventos: ", res);
    result(null, res);
  });
};
//Eliminar
Eventos.delete = (req, result) => {
  const id = parseInt(req.params.id);

  sql.query('DELETE FROM "eventos" where "idEventos" = $1', [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
//Actualizar
Eventos.update = function (req, result) {
  const id = parseInt(req.params.id);
  const text =
    'UPDATE "eventos" SET "idPrecio" =$1, "idInmueble" = $2, "ciudad" = $3, "fecha" = $4, "horario" = $5, "nombre" = $6, "descripcion" = $7 WHERE "idEventos" = $8';
  const values = [req.body.idPrecio, req.body.idInmueble, req.body.ciudad, req.body.fecha, req.body.horario, req.body.nombre, req.body.descripcion, id];
  sql.query(text, values, function (err, res) {
    if (err) {
      console.log("Error al actualizar el evento", err);
      result(err, null);
      return;
    }
    console.log("Evento actualizado");
    result(null, res);
  });
};

// Eventos por usuario
Eventos.getEventoUsuario = (req, result) => {
  const id = parseInt(req.params.id);
  sql.query('Select "eventos"."nombre", "eventos"."fecha", "eventos"."ciudad" from boletos INNER join "eventos" ON "boletos"."idEventos" = "eventos"."idEventos" where "boletos"."idUsuario" = $1', [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Eventos: ", res);
    result(null, res);
  });
};

// Eventos proximos
Eventos.getEventoProximo = (result) => {
  const fechaActual = new Date();
  const fechaUnMesDespues = new Date();
  fechaUnMesDespues.setMonth(fechaActual.getMonth() + 1);
  
  sql.query('SELECT eventos."idEventos", eventos.nombre as eventos_nombre, eventos.descripcion, eventos.fecha, eventos.ciudad, eventos.imagen, inmuebles.nombre as inmueble_nombre FROM eventos INNER JOIN inmuebles ON inmuebles."idInmuebles" = eventos."idInmueble" where eventos.fecha BETWEEN $1 AND $2', [fechaActual, fechaUnMesDespues], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Eventos: ", res);
    result(null, res);
  });
};


module.exports = Eventos;
