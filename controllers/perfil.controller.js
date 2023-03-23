const Perfil = require('../models/perfil.model');
//listar
exports.listar = (req, res) => {
    Perfil.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Error al recuperar los datos",
        });
      else {
        console.log(`Perfil.list $(data)`);
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
  
    const newPerfil = new Perfil({
      idPerfil: req.body.idPerfil,
      userTag: req.body.userTag,
      idFoto: req.body.idFoto,
      idUsuario: req.body.idUsuario,
    });
  
    Perfil.create(newPerfil, (err, data) => {
      if (err)
        res.status(500).json({
          message: err.message || "Error al crear un Perfil.",
        });
      else res.status(200).json(data);
    });
  };
//Actualizar
exports.actualizar = (req, res) => {
    Perfil.update(req, (err, perfil) => {
        if(err){
            res.status(500).send({
                message: err.message || "Error al actualizar perfil"
            })
        }else{
            console.log(perfil);
            res.status(200).send(data);
        }
    });
};
//Borrar
exports.eliminar = (req, res) => {
  Perfil.delete(req, (err, data) => {
    if (err)
      res.status(500).json({
        message: err.message || "Error al eliminar :C",
      });
    else res.json(data);
  });
};