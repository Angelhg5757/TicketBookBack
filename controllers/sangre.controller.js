const Sangre = require("../models/sangre.model");

exports.list = (req, res)=>{
    Sangre.getAll((err, data)=>{
        if(err)
            res.status(500).send({
                message: err.message || "Error al recuperar los datos",
            });
        else{
            console.log(`Sangre.list $(data)`);
            res.status(200).json(data);
        }
    });
};