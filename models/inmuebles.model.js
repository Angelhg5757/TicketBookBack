const sql = require("./db.js");

//Constructor
const Inmuebles = function (inmuebles) {
  this.idInmuebles = inmuebles.idInmuebles;
  this.nombre = inmuebles.nombre;
  this.capacidad = inmuebles.capacidad;
};
//Crear
Inmuebles.create = (inmuebles, result) => {
  const text =
    'INSERT INTO "inmuebles" ("nombre", "capacidad") VALUES ($1, $2)';
  const values = [inmuebles.nombre, inmuebles.capacidad];
  sql.query(text, values, (err, res) => {
    if (err) {
      console.log("Error al crear: ", err);
      result(err, null);
      return;
    }
    console.log("Inmueble guardado!", res);
    result(null, res);
  });
};
//Obtener
Inmuebles.getAll = (result) => {
  let query = 'SELECT * FROM "inmuebles"';

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Inmuebles: ", res);
    result(null, res);
  });
};
//Eliminar
Inmuebles.delete = (req, result) => {
  const id = parseInt(req.params.id);

  sql.query('DELETE FROM "inmuebles" where "idInmuebles" = $1', [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
//Actualizar
Inmuebles.update = function (req, result) {
  const id = parseInt(req.params.id);
  const text =
    'UPDATE "inmuebles" SET "nombre" = $1, "capacidad" = $2 WHERE "idInmuebles" = $3';
  const values = [req.body.nombre, req.body.capacidad, id];
  sql.query(text, values, function (err, res) {
    if (err) {
      console.log("Error al actualizar el evento", err);
      result(err, null);
      return;
    }
    console.log("Inmueble actualizado");
    result(null, res);
  });
};

module.exports = Inmuebles;