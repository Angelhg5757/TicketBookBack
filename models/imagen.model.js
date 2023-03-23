const sql = require("./db.js");
//Constructor
const Imagen = function (imagen) {
  this.idImagen = imagen.id;
  this.urlImagen = imagen.urlImagen;
};
//Listar imagenes
Imagen.getAll = (result) => {
  let query = 'SELECT * FROM "Imagen"';

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Imagen: ", res);
    result(null, res);
  });
};
//Crear imagen
Imagen.create = (imagen, result) => {
  const query = 'INSERT INTO "Imagen" ("urlImagen") VALUES ($1)';
  const values = [imagen.urlImagen];
  sql.query(query, values, (err, res) => {
    if(err){
      console.log("Error al crear imagen: ", err);
      result(err, null);
      return;
    }
    console.log("Imagen creada: ", res);
    result(null, res);
  });
};
//Eliminar imagen
Imagen.delete = (req, result) => {
  const id = parseInt(req.params.id);

  sql.query('DELETE FROM "Imagen" WHERE "idImagen" = $1', [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

//Actualizar imagen
Imagen.update = (imagen, result) => {
  const query = 'UPDATE "Imagen" SET "urlImagen" = $1 WHERE "idImagen" = $2';
  const values = [imagen.urlImagen, imagen.idImagen];
  sql.query(query, values, (err, res) => {
    if(err){
      console.log("Error al actualizar imagen: ", err);
      result(err, null);
      return;
    }
    console.log("Imagen actualizada: ", res);
    result(null, res);
  });
};


module.exports = Imagen;