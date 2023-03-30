const Secciones = require("../models/secciones.model");
//listar
exports.list = (req, res) => {
  Secciones.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al recuperar los datos",
      });
    else {
      //console.log(`Secciones.list $(data)`);
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

  //Crear asiento
  const newSecciones = new Secciones({
    idSeccion: req.body.idSeccion,
    nombre: req.body.nombre,
    precio: req.body.precio,
    idInmueble: req.body.idInmueble
  });

  Secciones.create(newSecciones, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al crear",
      });
    else res.status(200).json(data.rowCount);
  });
};

//eliminar
exports.eliminar = (req, res) => {
  Secciones.delete(req, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al eliminar :C",
      });
    else res.json(data);
  });
};
//Actualizar
exports.actualizar = (req, res) => {
  Secciones.update(req, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al actualizar :C",
      });
    else res.json(data);
  });
};
