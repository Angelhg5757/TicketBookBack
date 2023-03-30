const EventosHAHB = require("../models/eventosHAHB.model");
//listar
exports.listar = (req, res) => {
  EventosHAHB.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al listar los Eventos",
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
  const newEventosHAHB = new EventosHAHB({
    idEventos: req.body.idEventos,
    idAsientos: req.body.idAsientos,
    idBoletos: req.body.idBoletos,

  });

  EventosHAHB.create(newEventosHAHB, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al crear",
      });
    else res.status(200).json(data);
  });
};
//Actualizar
exports.actualizar = (req, res) => {
  EventosHAHB.update(req, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al actualizar",
      });
    } else {
      res.status(200).send(data);
    }
  });
};
//borrar
exports.borrar = (req, res) => {
  EventosHAHB.delete(req, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al borrar",
      });
    } else {
      res.status(200).send(data);
    }
  });
};
