const sql = require("./db.js");

//Constructor
const Eventos = function (eventos) {
  this.idEventos = eventos.idEventos;
  this.inmueble = eventos.inmueble;
  this.ciudad = eventos.ciudad;
  this.fecha = eventos.fecha;
  this.horario = eventos.horario;
  this.nombre = eventos.nombre;
  this.descripcion = eventos.descripcion;
};
//Crear
Eventos.create = (eventos, result) => {
  const text =
    'INSERT INTO "Eventos" ("inmueble", "ciudad", "fecha", "horario", "nombre", "descripcion") VALUES ($1, $2, $3, $4, $5, $6)';
  const values = [eventos.inmueble, eventos.ciudad, eventos.fecha, eventos.horario, eventos.nombre, eventos.descripcion];
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
  let query = 'SELECT * FROM "Eventos"';

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

  sql.query('DELETE FROM "Eventos" where "idEventos" = $1', [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
//Actualizar
Eventos.update = function (eventos, result) {
  const text =
    'UPDATE "Eventos" SET "inmueble" = $1, "ciudad" = $2, "fecha" = $3, "horario" = $4, "nombre" = $5, "descripcion" = $6 WHERE "idEventos" = $7';
  const values = [eventos.inmueble, eventos.ciudad, eventos.fecha, eventos.horario, eventos.nombre, eventos.descripcion, eventos.idEventos];
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

module.exports = Eventos;
