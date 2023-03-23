const Publicacion = require("../models/publicacion.model");
// const db = require("../models/db");
// const config = require("../config/db.config");
// const express = require("express");

// const Publicacion = db.Publicaciones;
// const app = express();
// app.set("llave", config.llave);

// exports.findAll = (req, res) => {
//   Publicacion.findAll({
//     include: [
//       {
//         model: db.Imagen,
//       }],
//   })
//     .then(publicaciones => {
//       res.status(200).send(publicaciones);
//     })
//     .catch(err => {
//       res.status(500).send({
//         mensaje:
//           err.message || "Ocurrio un error al recuperar todos los Usuario."
//       });
//     });
// };
//listar
exports.list = (req, res) => {
  Publicacion.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al recuperar los datos",
      });
    else {
      //console.log(`Publicacion.list $(data)`);
      res.status(200).json(data.rows);
    }
  });
};
//Crear
exports.create = (req, res) => {
  if (!req.body) {
    res.status(404).send({
      message: "No puede estar vacia la peticion",
    });
  }

  const newPublicacion = new Publicacion({
    idPublicaciones: req.body.idPublicaciones,
    fechaPublicacion: req.body.fechaPublicacion,
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    isActive: req.body.isActive,
    idImagen: req.body.idImagen,
    idUsuario: req.body.idUsuario,
  });

  Publicacion.create(newPublicacion, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al crear una Publicacion.",
      });
    else res.status(200).json(data);
  });
};
//Actualizar
exports.actualizarStatus = (req, res) => {
  Publicacion.updateStatus(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al actualizar la publicacion",
      });
    else {
      console.log(`Publicacion.actualizar $(data)`);
      res.status(200).json(data);
    }
  });
};
//Eliminar
exports.eliminar = (req, res) => {
  Publicacion.delete(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al eliminar la publicacion",
      });
    else {
      console.log(`Publicacion.eliminar $(data)`);
      res.status(200).json(data);
    }
  });
};
// exports.getPublicaciones = (req, res) => {
//   try {
//     const publicaciones = Publicacion.findAll();
//     res.json(publicaciones);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error interno del servidor' });
//   }
// };

// export async function getTasks(req, res) {
//     try {
//       const tasks = await Publicacion.findAll({
//         attributes: ["idPublicaciones", "fechaPublicacion", "titulo", "descripcion", "isActive", "idImagen", "idUsuario"],
//         order: [["idPublicaciones", "DESC"]],
//       });
//       res.json(tasks);
//     } catch (error) {
//       return res.status(500).json({ message: error.message });
//     }
//   }
