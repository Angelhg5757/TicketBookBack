const sql = require("./db.js");

//Constructor
const Contacto = function (contacto) {
  this.idContacto = Contacto.idContacto;
  this.telefono = contacto.telefono;
  this.correoPublico = contacto.correoPublico;
  this.idUsuario = contacto.idUsuario;
};

//Crear contacto
Contacto.create = (contacto, result) => {
  const text = 'INSERT INTO "Contacto" ("telefono", "correoPublico", "idUsuario") VALUES ($1,$2,$3)';
  const values = [contacto.telefono, contacto.correoPublico, contacto.idUsuario];
  sql.query(text, values, (err, res) => {
    if (err){
      console.log("Error al crear el contacto: ", err);
      result(err, null);
      return;
    }
    console.log("Contacto guardado!", res);
    result(null, res);
  });
};

//Obtener contacto
Contacto.getAll = (result) => {
  let query = 'SELECT * FROM "Contacto"';

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Contacto: ", res);
    result(null, res);
  });
};

Contacto.getByIdUser = (req, result) => {
  const id = req.params.id;

  sql.query(
    'SELECT * FROM "Contacto" WHERE "idUsuario" = $1',
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
Contacto.delete = (req, result) => {
  const id = req.params.idContacto;

  sql.query('DELETE FROM "Contacto" WHERE "idContacto" = $1', [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
//Actualizar 
Contacto.update = (req, result) => {
  const id = parseInt(req.params.id);
  const { telefono, correoPublico, idUsuario } = req.body;

  sql.query(
    'UPDATE "Contacto" SET "telefono" = $1, "correoPublico" = $2, "idUsuario" = $3 WHERE "idContacto" = $4',
    [telefono, correoPublico, idUsuario, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      console.log("Usuario: ", res);
      result(null, res);
    }
  );
};


module.exports = Contacto;