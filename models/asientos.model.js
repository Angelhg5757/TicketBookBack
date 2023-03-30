const sql = require("./db.js");

//Constructor
const Asientos = function (asientos) {
  //this.idAsientos = asientos.idAsientos;
  this.numero = asientos.numero;
  this.fila = asientos.fila;
};

//Obtener 
Asientos.getAll = (result) => {
  let query = 'SELECT * FROM "asientos"';

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Asientos: ", res);
    result(null, res);
  });
};
//Crear 
Asientos.create = (asientos, result) => {
  const text = 'INSERT INTO "asientos" ("numero", "fila") VALUES ($1, $2)';
  const values = [asientos.numero, asientos.fila];
  sql.query(text, values, (err, res) => {
    if (err){
      console.log("Error al crear asiento: ", err);
      result(err, null);
      return;
    }
    console.log("Nuevo asiento guardado!", res);
    result(null, res);
  });
};
//Eliminar 
Asientos.delete = (req, result) => {
  const id = parseInt(req.params.id);

  sql.query('DELETE FROM "asientos" WHERE "idAsientos" = $1', [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
//Actualizar
Asientos.update = (req, result) => {
  // const id = parseInt(req.params.id);
  // const text = 'UPDATE "asientos" SET "numero" = $1, "fila" = $2 WHERE "idAsientos" = $3';
  // const values = [req.body.numero, req.body.fila, id];
  // sql.query(text, values, (err, res) => {
  //   if (err){
  //     console.log("Error al actualizar: ", err);
  //     result(err, null);
  //     return;
  //   }
  //   console.log ("Actualizado!", res);
  //   result(null, res);
  // });

  const id = parseInt(req.params.id);
  const text =
  'UPDATE "asientos" SET "numero" = $1, "fila" = $2 WHERE "idAsientos" = $3';
  const values = [req.body.numero, req.body.fila, id];
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



module.exports = Asientos;