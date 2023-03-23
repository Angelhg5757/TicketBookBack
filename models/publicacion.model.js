// const { DataTypes } = require('sequelize');
// const sequelize = require('../models/db');

const sql = require("./db.js");
//constructor
const Publicacion = function (publicacion) {
  this.idPublicaciones = publicacion.idPublicaciones;
  this.fechaPublicacion = publicacion.fechaPublicacion;
  this.titulo = publicacion.titulo;
  this.descripcion = publicacion.descripcion;
  this.isActive = publicacion.isActive;
  this.idImagen = publicacion.idImagen;
  this.idUsuario = publicacion.idUsuario;
};
//Listar Publicaciones
Publicacion.getAll = (result) => {
  let query = 'SELECT "Usuario".*, "Publicaciones".*, "TipoSangre".tipo, "Contacto".* FROM "Usuario" INNER JOIN "Publicaciones" ON "Publicaciones"."idUsuario" = "Usuario"."idUsuario" \
   INNER JOIN "TipoSangre" ON "TipoSangre"."idSangre" = "Usuario"."idSangre" INNER JOIN "Contacto" ON "Contacto"."idUsuario" = "Usuario"."idUsuario" WHERE "Publicaciones"."isActive" = TRUE'; // SELECT * FROM "Usuario" INNER JOIN "Publicaciones" ON "Publicaciones"."idUsuario" = "Usuario"."idUsuario" WHERE "Publicaciones"."isActive" = TRUE'

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
//Crear Publicaciones
Publicacion.create = (publicacion, result) => {
  const fecha = new Date();
  const estado = true;

  const query = 'INSERT INTO "Publicaciones" ("fechaPublicacion", "titulo", "descripcion","isActive","idImagen","idUsuario") VALUES ($1, $2, $3, $4,$5,$6)';
  const values = [fecha, publicacion.titulo, publicacion.descripcion, estado, publicacion.idImagen, publicacion.idUsuario];
  sql.query(query, values, (err, res) => {
    if(err) {
      console.log("Error al crear publicación: ", err);
      result(err, null);
      return;
    }
    console.log("Publicacion creada con éxito: ", res);
    result(null, res);
  });
};
//Eliminar Publicaciones
Publicacion.delete = (req, result) => {
  const id = parseInt(req.params.id);

  sql.query('DELETE FROM "Publicaciones" WHERE "idPublicaciones" = $1', [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};
// Update status publicacion
Publicacion.updateStatus = (req, result) => {
  const id = parseInt(req.params.id);
  const active = false;

  const query = 'UPDATE "Publicaciones" SET "isActive" = $1 WHERE "idPublicaciones" = $2';
  const values = [active, id];
  sql.query(query, values, (err, res) => {
    if (err){
      console.log("Error al actualizar publicación: ", err);
      result(err, null);
      return;
    }
    console.log("Publicación actualizada con éxito: ", res);
    result(null, res);
  });
};

//Actualizar Publicaciones
// Publicacion.update = (publicacion, result) => {
//   const query = 'UPDATE "Publicaciones" SET "fechaPublicacion" = $1, "titulo" = $2, "descripcion" = $3, "isActive" = $4, "idImagen" = $5, "idUsuario" = $6 WHERE "idPublicaciones" = $7';
//   const values = [publicacion.fechaPublicacion, publicacion.titulo, publicacion.descripcion, publicacion.isActive, publicacion.idImagen, publicacion.idUsuario];
//   sql.query(query, values, (err, res) => {
//     if (err){
//       console.log("Error al actualizar publicación: ", err);
//       result(err, null);
//       return;
//     }
//     console.log("Publicación actualizada con éxito: ", res);
//     result(null, res);
//   });
// };

module.exports = Publicacion;

// Publicacion.create = (publicacion, result) => {
//   sql.query(
//     "SELECT id FROM Publicaciones ORDER BY id DESC LIMIT 1",
//     (err, res) => {
//       if (err) {
//         throw err;
//       }

//       const ultimoId = res.rows[0].id;
//       const nuevoId = ultimoId + 1;

//       const fechaActual = new Date();
//       const estado = true;
//       //const idUsuarioActual = localStorage.getItem('idUsuario'); //Al iniciar sesion guardar el idUsuario


//       // Insertar el nuevo registro con el nuevo id
//       sql.query(
//         "INSERT INTO Publicaciones (idPublicaciones, fechaPublicacion, titulo, descripcion, isActive, idImagen, idUsuario) VALUES ($1, $2, $3, $4, $5, $6, $7)",
//         [
//           nuevoId,
//           fechaActual,
//           publicacion.titulo,
//           publicacion.descripcion,
//           estado,
//           publicacion.idUsuario,
//         ],
//         (err, res) => {
//           if (err) {
//             throw err;
//           }
//           console.log("Row created publicacion: ", {
//             id: result.insertId,
//             ...publicacion,
//           });
//           console.log("Row created Publicacion: ", {
//             id: result.insertId,
//             ...publicacion,
//           });
//           result(null, { id: result.insertId, ...publicacion });
//         }
//       );
//     }
//   );
// };



// Publicacion.getById = (req, result) => {
//   const id = req.params.id;

//   sql.query("SELECT * FROM Publicaciones WHERE id = $1", [id], (err, res) => {
//     if (err) {
//       console.log("Error: ", err);
//       result(err, null);
//       return;
//     }
//     console.log("publicacion: ", res);
//     result(null, res);
//   });
// };

