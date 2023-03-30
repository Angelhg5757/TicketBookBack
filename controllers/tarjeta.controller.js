const Tarjeta = require("../models/tarjeta.model");
//listar
exports.listar = (req, res) => {
  Tarjeta.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al recuperar los datos",
      });
    else {
      //console.log(`Tarjeta.list $(data)`);
      res.status(200).json(data.rows);
    }
  });
};
exports.listIDUser = (req, res) => {
  Tarjeta.getByIdUser(req, (err, data) => {
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

  const newTarjeta = new Tarjeta({
    idTarjeta: req.body.idTarjeta,
    nombreTitular: req.body.nombreTitular,
    numFrente: req.body.numFrente,
    fechaExp: req.body.fechaExp,
    
    idUsuario: req.body.idUsuario,
  });

  Tarjeta.create(newTarjeta, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al crear.",
      });
    else res.status(200).json(data);
  });
};

//eliminar
exports.eliminar = (req, res) => {
  Tarjeta.delete(req, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al eliminar :C",
      });
    else res.json(data);
  });
};

//Actualizar
exports.actualizar = (req, res) => {
  Tarjeta.update(req, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al actualizar :C",
      });
    else res.json(data);
  });
};
