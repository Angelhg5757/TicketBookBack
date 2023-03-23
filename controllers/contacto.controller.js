const Contacto = require("../models/contacto.model");
//listar
exports.listar = (req, res) => {
  Contacto.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al recuperar los datos",
      });
    else {
      console.log(`Contacto.list $(data)`);
      res.status(200).json(data);
    }
  });
};
exports.listIDUser = (req, res) => {
  Contacto.getByIdUser(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al recuperar los datos",
      });
    else {
      res.status(200).json(data.rows);
    }
  });
};

//crear
exports.create = (req, res) => {
  if (!req.body) {
    res.status(404).send({
      message: "No puede estar vacia la peticion",
    });
  }

  const newContacto = new Contacto({
    idContacto: req.body.idContacto,
    telefono: req.body.telefono,
    correoPublico: req.body.correoPublico,
    idUsuario: req.body.idUsuario,
  });

  Contacto.create(newContacto, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al crear.",
      });
    else res.status(200).json(data);
  });
};

//eliminar
exports.eliminar = (req, res) => {
  Contacto.delete(req, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al eliminar :C",
      });
    else res.json(data);
  });
};

//Actualizar
exports.actualizar = (req, res) => {
  Contacto.update(req, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al actualizar :C",
      });
    else res.json(data);
  });
};
