const Precio = require("../models/precio.model");
//listar
exports.listar = (req, res) => {
  Precio.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al recuperar los datos",
      });
    else {
      //console.log(`Precio.list $(data)`);
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

  const newPrecio = new Precio({
    idPrecio: req.body.idPrecio,
    precio: req.body.precio,
  });

  Precio.create(newPrecio, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al crear.",
      });
    else res.status(200).json(data);
  });
};
//Actualizar
exports.actualizar = (req, res) => {
  Precio.update(req, (err, precio) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error al actualizar",
      });
    } else {
      console.log(precio);
      res.status(200).send(data);
    }
  });
};
//Borrar
exports.eliminar = (req, res) => {
  Precio.delete(req, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al eliminar :C",
      });
    else res.json(data);
  });
};
