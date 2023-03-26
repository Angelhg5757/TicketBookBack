const Boletos = require("../models/boletos.model");
//Listar Boletos
exports.list = (req, res) => {
  Boletos.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al recuperar los datos",
      });
    else {
      console.log(`Boletos.list $(data)`);
      res.status(200).json(data);
    }
  });
};
//Crear Boletos
exports.create = (req, res) => {
  if (!req.body) {
    res.status(404).send({
      message: "No puede estar vacia la peticion",
    });
  }

  const newBoletos = new Boletos({
    idBoletos: req.body.idBoletos,
    idAsientos: req.body.idBoletos,
    descripcion: req.body.descripcion,
    idEventos: req.body.idEventos,
  });

  Boletos.create(newBoletos, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al crear Boletos.",
      });
    else res.status(200).json(data);
  });
};
//Eliminar Boletos
exports.eliminar = (req, res) => {
  Boletos.delete(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al eliminar Boletos",
      });
    else res.status(200).json(data);
  });
};
//Actualizar Boletos
exports.actualizar = (req, res) => {
  Boletos.update(req, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al actualizar Boletos",
      });
    else res.status(200).json(data);
  });
};



// exports.findAll = (req, res) => {
//     Imagen.findAll()
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message:
//                     err.message || "Ocurrio un error al recuperar todos los Roles."
//             });
//         });
// };
