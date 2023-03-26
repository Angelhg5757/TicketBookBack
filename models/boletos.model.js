const sql = require("./db.js");
//Constructor
const Boletos = function (boletos) {
  this.idBoletos = boletos.idBoletos;
  this.idAsientos = boletos.idAsientos;
  this.descripcion = boletos.descripcion;
  this.idEventos = boletos.idEventos;
};

//Listar 
Boletos.getAll = (result) => {
  let query = 'SELECT * FROM "Boletos"';

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Boletos: ", res);
    result(null, res);
  });
};
//Crear Boletos
Boletos.create = (boletos, result) => {
  const query = 'INSERT INTO "Boletos" ("idAsientos", "descripcion", "idEventos") VALUES ($1, $2, $3)';
  const values = [boletos.idAsientos, boletos.descripcion, boletos.idEventos];
  sql.query(query, values, (err, res) => {
    if(err){
      console.log("Error al crear: ", err);
      result(err, null);
      return;
    }
    console.log("Boleto creado: ", res);
    result(null, res);
  });
};
//Eliminar boletos
Boletos.delete = (req, result) => {
  const id = parseInt(req.params.id);

  sql.query('DELETE FROM "Boletos" WHERE "idBoletos" = $1', [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

//Actualizar Boletos
Boletos.update = (boletos, result) => {
  const query = 'UPDATE "Boletos" SET "idAsientos" = $1, "descripcion" = $2, "idEventos" = $3 WHERE "idBoletos" = $4';
  const values = [boletos.idAsientos, boletos.descripcion, boletos.idEventos, boletos.idBoletos];
  sql.query(query, values, (err, res) => {
    if(err){
      console.log("Error al actualizar: ", err);
      result(err, null);
      return;
    }
    console.log("Boleto actualizado: ", res);
    result(null, res);
  });
};


module.exports = Boletos;