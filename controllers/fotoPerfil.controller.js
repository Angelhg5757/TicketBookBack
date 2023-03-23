const FotoPerfil = require("../models/fotoPerfil.model");
//listar
exports.list = (req, res) => {
  FotoPerfil.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al recuperar los datos",
      });
    else {
      console.log(`FotoPerfil.list $(data)`);
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

  //Crear persona
  const newFoto = new FotoPerfil({
    id: req.body.id,
    urlFoto: req.body.urlFoto,
  });

  FotoPerfil.create(newFoto, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al crear una Foto.",
      });
    else res.status(200).json(data);
  });
};

//eliminar
exports.eliminar = (req, res) => {
  FotoPerfil.delete(req, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al eliminar la foto :C",
      });
    else res.json(data);
  });
};
//Actualizar
exports.actualizar = (req, res) => {
  FotoPerfil.update(req, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al actualizar la foto :C",
      });
    else res.json(data);
  });
};
