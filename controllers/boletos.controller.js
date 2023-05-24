const Boletos = require("../models/boletos.model");
//Listar Boletos
exports.list = (req, res) => {
  Boletos.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al recuperar los datos",
      });
    else {
      //console.log(`Boletos.list $(data)`);
      res.status(200).json(data.rows);
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
    //idBoletos: req.body.idBoletos,
    idUsuario: req.body.idUsuario,
    idAsientos: req.body.idAsientos,
    idSecciones: req.body.idSecciones,
    cantidad: req.body.cantidad,
    costo_servicio: req.body.costo_servicio, 
    precioBoleto: req.body.precioBoleto,
    total: req.body.total,
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

exports.usuarioporboleto = (req, res) => {
  Boletos.getBoletos(req,(err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al recuperar los datos",
      });
    else {
      //console.log(`Boletos.list $(data)`);
      res.status(200).json(data.rows);
    }
  });
};

exports.boletoporevento = (req, res) => {
  Boletos.getBoletosEvento(req,(err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error al recuperar los datos",
      });
    else {
      //console.log(`Boletos.list $(data)`);
      res.status(200).json(data.rows);
    }
  });
};

exports.boletoporusuario = (req, res) => {
  Boletos.getBoletosPorUsuario(req,(err,data) =>{
    if(err)
      res.status(500).send({
        message: err.message || "Error al mostrar los boletos por usuario",
      });
      else{
        res.status(200).json(data.rows);
      }
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
