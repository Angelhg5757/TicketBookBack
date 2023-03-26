const Eventos = require('../models/eventos.model');
//listar
exports.listar = (req, res) => {
    Eventos.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Error al recuperar los datos",
        });
      else {
        console.log(`Eventos.list $(data)`);
        res.status(200).json(data);
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
  
    const newEventos = new Eventos({
      idEventos: req.body.idEventos,
      inmueble: req.body.inmueble,
      ciudad: req.body.ciudad,
      fecha: req.body.fecha,
      horario: req.body.horario,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
    });
  
    Eventos.create(newEventos, (err, data) => {
      if (err)
        res.status(500).json({
          message: err.message || "Error al crear un Evento.",
        });
      else res.status(200).json(data);
    });
  };
//Actualizar
exports.actualizar = (req, res) => {
    Eventos.update(req, (err, eventos) => {
        if(err){
            res.status(500).send({
                message: err.message || "Error al actualizar"
            })
        }else{
            console.log(eventos);
            res.status(200).send(data);
        }
    });
};
//Borrar
exports.eliminar = (req, res) => {
  Eventos.delete(req, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al eliminar :C",
      });
    else res.json(data);
  });
};