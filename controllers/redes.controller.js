const Redes = require("../models/redes.model");
//listar
exports.list = (req, res) => {
  Redes.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al recuperar los datos",
      });
    else {
      console.log(`Redes.list $(data)`);
      res.status(200).json(data);
    }
  });
};