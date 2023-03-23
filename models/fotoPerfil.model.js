const sql = require("./db.js");

//Constructor
const FotoPerfil = function (fotoPerfil) {
  this.idFoto = fotoPerfil.idFoto;
  this.urlFoto = fotoPerfil.urlFoto;
};

//Obtener fotos de perfil
FotoPerfil.getAll = (result) => {
  let query = 'SELECT * FROM "FotoPerfil"';

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("FotoPerfil: ", res);
    result(null, res);
  });
};
//Crear foto de perfil
FotoPerfil.create = (fotoPerfil, result) => {
  const text = 'INSERT INTO "FotoPerfil" ("urlFoto") VALUES ($1)';
  const values = [fotoPerfil.urlFoto];
  sql.query(text, values, (err, res) => {
    if (err){
      console.log("Error al crear comentario: ", err);
      result(err, null);
      return;
    }
    console.log("Nueva foto de perfil guardada!", res);
    result(null, res);
  });
};
//Eliminar foto de perfil
FotoPerfil.delete = (req, result) => {
  const id = parseInt(req.params.id);

  sql.query('DELETE FROM "FotoPerfil" WHERE "idFoto" = $1', [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
//Actualizar foto de perfil
FotoPerfil.update = (fotoPerfil, result) => {
  const text = 'UPDATE "FotoPerfil" SET "urlFoto" = $1 WHERE "idFoto" = $2';
  const values = [fotoPerfil.urlFoto, fotoPerfil.idFoto];
  sql.query(text, values, (err, res) => {
    if (err){
      console.log("Error al actualizar foto de perfil: ", err);
      result(err, null);
      return;
    }
    console.log ("Foto de perfil actualizado!", res);
    result(null, res);
  });
};



module.exports = FotoPerfil;