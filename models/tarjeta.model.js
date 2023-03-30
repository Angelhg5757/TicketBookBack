const sql = require("./db.js");

//Constructor
const Tarjeta = function (tarjeta) {
  this.idTarjeta = Tarjeta.idTarjeta;
  this.nombreTitular = tarjeta.nombreTitular;
  this.numFrente = tarjeta.numFrente;
  this.fechaExp = tarjeta.fechaExp;
  this.idUsuario = tarjeta.idUsuario;
};

//Crear tarjeta
Tarjeta.create = (tarjeta, result) => {
  const text = 'INSERT INTO "tarjeta" ("nombreTitular", "numFrente", "fechaExp", "idUsuario") VALUES ($1,$2,$3,$4)';
  const values = [tarjeta.nombreTitular, tarjeta.numFrente, tarjeta.fechaExp, tarjeta.idUsuario];
  sql.query(text, values, (err, res) => {
    if (err){
      console.log("Error al crear: ", err);
      result(err, null);
      return;
    }
    console.log("Tarjeta guardada!", res);
    result(null, res);
  });
};

//Obtener Tarjeta
Tarjeta.getAll = (result) => {
  let query = 'SELECT * FROM "tarjeta"';

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Tarjeta: ", res);
    result(null, res);
  });
};

Tarjeta.getByIdUser = (req, result) => {
  const id = req.params.id;

  sql.query(
    'SELECT * FROM "tarjeta" WHERE "idTarjeta" = $1',
    [id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

//Eliminar 
Tarjeta.delete = (req, result) => {
  const id = req.params.idTarjeta;

  sql.query('DELETE FROM "tarjeta" WHERE "idTarjeta" = $1', [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
//Actualizar 
Tarjeta.update = (req, result) => {
  const id = parseInt(req.params.id);
  const { nombreTitular, numFrente, fechaExp, idUsuario } = req.body;

  sql.query(
    'UPDATE "tarjeta" SET "nombreTitular" = $1, "numFrente" = $2, "fechaExp" = $3, "idUsuario" = $4 WHERE "idTarjeta" = $5',
    [nombreTitular, numFrente, fechaExp, idUsuario, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      console.log("Tarjeta: ", res);
      result(null, res);
    }
  );
};

module.exports = Tarjeta;