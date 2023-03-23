const Roles = require("../models/roles.model");
//listar
exports.list = (req, res)=>{
    Roles.getAll((err, data)=>{
        if(err)
            res.status(500).send({
                message: err.message || "Error al recuperar los datos",
            });
        else{
            console.log(`Roles.list $(data)`);
            res.status(200).json(data);
        }
    });
};
