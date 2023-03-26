const Asientos = require("../models/asientos.model");
//listar
exports.list = (req, res) => {
  Asientos.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al recuperar los datos",
      });
    else {
      console.log(`Asientos.list $(data)`);
      res.status(200).json(data);
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

  //Crear asiento
  const newAsientos = new Asientos({
    idAsientos: req.body.idAsientos,
    numero: req.body.numero,
    seccion: req.body.seccion,
  });

  Asientos.create(newAsientos, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al crear una Foto.",
      });
    else res.status(200).json(data);
  });
};

//eliminar
exports.eliminar = (req, res) => {
  Asientos.delete(req, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al eliminar la foto :C",
      });
    else res.json(data);
  });
};
//Actualizar
exports.actualizar = (req, res) => {
  Asientos.update(req, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al actualizar la foto :C",
      });
    else res.json(data);
  });
};
