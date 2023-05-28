const sql = require("./db.js");

//Constructor
const Precio = function (precio) {
  this.idPrecio = precio.idPrecio;
  this.precio = precio.precio;
};
//Crear
Precio.create = (precio, result) => {
  const text =
    'INSERT INTO "precio" ("precio") VALUES ($1)';
  const values = [precio.precio];
  sql.query(text, values, (err, res) => {
    if (err) {
      console.log("Error al crear: ", err);
      result(err, null);
      return;
    }
    console.log("Precio guardado!", res);
    result(null, res);
  });
};
//Obtener
Precio.getAll = (result) => {
  let query = 'SELECT * FROM "precio"';

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Precio: ", res);
    result(null, res);
  });
};
//Eliminar
Precio.delete = (req, result) => {
  const id = parseInt(req.params.id);

  sql.query('DELETE FROM "precio" where "idPrecio" = $1', [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
//Actualizar
Precio.update = function (req, result) {
  const id = parseInt(req.params.id);

  const text =
    'UPDATE "precio" SET "precio" = $1 WHERE "idPrecio" = $2';
  const values = [req.body.precio, id];
  sql.query(text, values, function (err, res) {
    if (err) {
      console.log("Error al actualizar el evento", err);
      result(err, null);
      return;
    }
    console.log("Precio actualizado");
    result(null, res);
  });
};

//Precios
Precio.getPrecios = (result) => {
  sql.query("Select precio from precio",(err, res) => {
    if (err) {
      console.log("Error al obtener el precio", err);
      result(err, null);
      return;
    }
    console.log("Precios obtenidos",res);
    result(null, res);
  });
};

module.exports = Precio;