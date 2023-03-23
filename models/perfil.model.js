const sql = require("./db.js");

//Constructor
const Perfil = function (perfil) {
  this.id = perfil.id;
  this.userTag = perfil.userTag;
  this.idFoto = perfil.idFoto;
  this.idUsuario = perfil.idUsuario;
};
//Crear
Perfil.create = (perfil, result) => {
  const text =
    'INSERT INTO "Perfil" ("userTag", "idFoto", "idUsuario") VALUES ($1, $2, $3)';
  const values = [perfil.userTag, perfil.idFoto, perfil.idUsuario];
  sql.query(text, values, (err, res) => {
    if (err) {
      console.log("Error al crear el perfil: ", err);
      result(err, null);
      return;
    }
    console.log("Perfil guardado!", res);
    result(null, res);
  });
};
//Obtener
Perfil.getAll = (result) => {
  let query = 'SELECT * FROM "Perfil"';

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Perfil: ", res);
    result(null, res);
  });
};
//Eliminar
Perfil.delete = (req, result) => {
  const id = parseInt(req.params.id);

  sql.query('DELETE FROM "Perfil" where "idPerfil" = $1', [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
//Actualizar
Perfil.update = function (perfil, result) {
  const text =
    'UPDATE "perfil" SET "userTag" = $1, "idFoto" = $2, "idUsuario" = $3 WHERE "idPerfil" = $4';
  const values = [perfil.userTag, perfil.idFoto, perfil.idUsuario, perfil.id];
  sql.query(text, values, function (err, res) {
    if (err) {
      console.log("Error al actualizar el perfil", err);
      result(err, null);
      return;
    }
    console.log("Perfil actualizado");
    result(null, res);
  });
};

module.exports = Perfil;
