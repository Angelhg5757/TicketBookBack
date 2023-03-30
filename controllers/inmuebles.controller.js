const Inmuebles = require("../models/inmuebles.model");
//listar
exports.listar = (req, res) => {
  Inmuebles.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al recuperar los datos",
      });
    else {
      //console.log(`Inmuebles.list $(data)`);
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

  const newInmuebles = new Inmuebles({
    idInmuebles: req.body.idInmuebles,
    nombre: req.body.nombre,
    capacidad: req.body.capacidad
  });

  Inmuebles.create(newInmuebles, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al crear.",
      });
    else res.status(200).json(data);
  });
};
//Actualizar
exports.actualizar = (req, res) => {
  Inmuebles.update(req, (err, inmuebles) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al actualizar",
      });
    } else {
      console.log(inmuebles);
      res.status(200).send(data);
    }
  });
};
//Borrar
exports.eliminar = (req, res) => {
  Inmuebles.delete(req, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al eliminar :C",
      });
    else res.json(data);
  });
};