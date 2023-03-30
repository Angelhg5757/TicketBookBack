const sql = require("./db.js");

//Constructor
const Secciones = function (secciones) {
  this.idSeccion = secciones.idSeccion;
  this.nombre = secciones.nombre;
  this.precio = secciones.precio;
  this.idInmueble = secciones.idInmueble;
};

//Obtener 
Secciones.getAll = (result) => {
  let query = 'SELECT * FROM "secciones"';

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Secciones: ", res);
    result(null, res);
  });
};
//Crear 
Secciones.create = (secciones, result) => {
  const text = 'INSERT INTO "secciones" ("nombre", "precio", "idInmueble") VALUES ($1, $2, $3)';
  const values = [secciones.nombre, secciones.precio, secciones.idInmueble];
  sql.query(text, values, (err, res) => {
    if (err){
      console.log("Error al crear la seccion: ", err);
      result(err, null);
      return;
    }
    console.log("Nueva seccion guardada!", res);
    result(null, res);
  });
};
//Eliminar 
Secciones.delete = (req, result) => {
  const id = parseInt(req.params.id);

  sql.query('DELETE FROM "secciones" WHERE "idSeccion" = $1', [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
//Actualizar
Secciones.update = (req, result) => {
  const id = parseInt(req.params.id);
  const text = 'UPDATE "secciones" SET "nombre" = $1, "precio" = $2, "idInmueble" = $3 WHERE "idSeccion" = $4';
  const values = [req.body.nombre, req.body.precio, req.body.idInmueble, id];
  sql.query(text, values, (err, res) => {
    if (err){
      console.log("Error al actualizar: ", err);
      result(err, null);
      return;
    }
    console.log ("Actualizado!", res);
    result(null, res);
  });
};



module.exports = Secciones;