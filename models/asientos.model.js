const sql = require("./db.js");

//Constructor
const Asientos = function (asientos) {
  this.idAsientos = asientos.idAsientos;
  this.numero = asientos.numero;
  this.seccion = asientos.seccion;
};

//Obtener 
Asientos.getAll = (result) => {
  let query = 'SELECT * FROM "Asientos"';

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
  const text = 'INSERT INTO "Asientos" ("numero", "seccion") VALUES ($1, $2)';
  const values = [asientos.numero, asientos.seccion];
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

  sql.query('DELETE FROM "Asientos" WHERE "idAsientos" = $1', [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
//Actualizar
Asientos.update = (asientos, result) => {
  const text = 'UPDATE "Asientos" SET "numero" = $1, "seccion" = $2 WHERE "idAsientos" = $3';
  const values = [asientos.numero, asientos.seccion, asientos.idAsientos];
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



module.exports = Asientos;