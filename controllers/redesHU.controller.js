const RedesHU = require("../models/redesHU.model");
//listar
exports.listar = (req, res) => {
  RedesHU.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al listar las RedesHU",
      });
    } else {
      res.status(200).send(data);
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

  //Crear persona
  const newRedesHU = new RedesHU({
    idRedes: req.body.idRedes,
    nombreRed: req.body.nombreRed,
  });

  RedesHU.create(newRedesHU, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al crear la Red Social.",
      });
    else res.status(200).json(data);
  });
};
//Actualizar
exports.actualizar = (req, res) => {
  RedesHU.update(req, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al actualizar el redes",
      });
    } else {
      res.status(200).send(data);
    }
  });
};
//borrar
exports.borrar = (req, res) => {
  RedesHU.delete(req, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al borrar el redes",
      });
    } else {
      res.status(200).send(data);
    }
  });
};
