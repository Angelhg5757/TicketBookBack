const Usuario = require("../models/usuario.model");
const sql = require("../models/db.js");
const bcrypt = require("bcrypt");
const pg = require("pg");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(404).send({
      message: "No puede estar vacia la peticion",
    });
  }

  //Crear persona
  const newUsuario = new Usuario({
    idUsuario: req.body.idUsuario,
    nombre: req.body.nombre,
    apePat: req.body.apePat,
    apeMat: req.body.apeMat,
    correo: req.body.correo || "test@gmail.com",
    password: req.body.password,
    fechaNac: req.body.fechaNac,
    isActive: req.body.isActive,
    idRoles: req.body.idRoles,
    idSangre: req.body.idSangre,
    sexo: req.body.sexo,
  });

  Usuario.create(newUsuario, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al crear un Usuario.",
      });
    else res.status(200).json(data);
  });
};

exports.list = (req, res) => {
  Usuario.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al recuperar los datos",
      });
    else {
      //console.log(`Usuario.list $(data)`);
      res.status(200).json(data.rows);
    }
  });
};

exports.listID = (req, res) => {
  Usuario.getById(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al recuperar los datos",
      });
    else {
      //console.log(`Usuario.list $(data)`);
      res.status(200).json(data.rows);
    }
  });
};

exports.actualizar = (req, res) => {
  Usuario.update(req, (err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message || "Error al actualizar el Usuario.",
      });
    } else {
      res.status(200).json(data);
    }
  });
};

exports.actualizarStatus = (req, res) => {
  Usuario.updateStatus(req, (err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message || "Error al actualizar el Usuario.",
      });
    } else {
      res.status(200).json(data);
    }
  });
};

// exports.actualizarStatus2 = (req, res) => {
//   Usuario.updateStatus2(req, (err, data) => {
//     if (err) {
//       res.status(500).json({
//         message: err.message || "Error al actualizar el Usuario."
//     });
//   } else {
//     res.status(200).json(data);
//   }
// });
// };

exports.borrar = (req, res) => {
  Usuario.delete(req, (err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message || "Error al borrar el Usuario.",
      });
    } else {
      res.status(200).json(data);
    }
  });
};

exports.login = async (req, res) => {
  const correo = req.body.correo;
  const pwd = req.body.password;
  console.log("correo: " + correo);
  try {
    const usuario = await Usuario.findOne(correo);
    if (usuario) {
      const verified = bcrypt.compareSync(pwd, usuario.password);
      if (verified) {
        const idUsuario = usuario.idUsuario;
        const nombre = usuario.nombre;
        const apePat = usuario.apePat;
        const apeMat = usuario.apeMat;
        const correo = usuario.correo;
        const fechaNac = usuario.fechaNac;
        const sangre = usuario.tipo;
        if (usuario.idRoles == 1) {
          return res.status(200).send({
            // message: "Donador", 
            idUsuario, nombre, apePat, apeMat, correo, fechaNac, sangre
            
          });
        } else if (usuario.idRoles == 2) {
          return res.status(201).send({
            // message: "Paciente", 
            idUsuario, nombre, apePat, apeMat, correo, fechaNac, sangre
          });
        } else if ((usuario, idRoles == 3)) {
          return res.status(202).send({
            // message: "Administrador", 
            idUsuario, nombre, apePat, apeMat, correo, fechaNac, sangre
          });
        }
      } else {
        return res.status(404).send({
          mensaje: "Error de validación",
        });
      }
    } else {
      return res.status(404).send({
        mensaje: "Error de validación",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      mensaje: "Ocurrió un error al logearse",
    });
  }
};
