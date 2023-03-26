const sql = require('./db.js');
//Constructor
const UsuarioBoletos = function(usuarioBoletos){
    this.idUsuario = usuarioBoletos.idUsuario;
    this.idBoletos = usuarioBoletos.idBoletos;
}
//Listar 
UsuarioBoletos.getAll = (result)=>{
    const text = 'SELECT *FROM "Usuario_has_Boleto"';
    sql.query(text, (err, res)=>{
        if(err){
            console.log("error al listar redes: ", err);
            result(err, null);
            return;
        }
        console.log("Consulta exitosa", res);
        result(null, res);
    });
};
//Crear redes
UsuarioBoletos.create = (usuarioBoletos, result)=>{
    const text = 'INSERT INTO "Usuario_has_Boleto" ("idUsuario", "idBoletos") VALUES ($1,$2)';
    const values = [usuarioBoletos.idUsuario, usuarioBoletos.idBoletos];
    sql.query(text, values, (err, res)=>{
        if(err){
            console.log("error al crear: ", err);
            result(err, null);
            return;
        }
        console.log("Creado exitosamente", res);
        result(null, res);
    });
};
//Eliminar redes
UsuarioBoletos.delete = (usuarioBoletos, result)=>{
    const text = 'DELETE FROM "Usuario_has_Boleto" WHERE "idUsuario" = $1 AND "idBoletos" = $2';
    const values = [usuarioBoletos.idUsuario, usuarioBoletos.idBoletos];
    sql.query(text, values, (err, res)=>{
        if(err){
            console.log("error al eliminar: ", err);
            result(err, null);
            return;
        }
        console.log("Eliminado exitosamente", res);
        result(null, res);
    });
};
//Actualizar redes
UsuarioBoletos.update = (usuarioBoletos, result)=>{
    const text = 'UPDATE "Usuario_has_Boleto" SET "idBoletos" = $2 WHERE "idUsuario" = $1';
    const values = [usuarioBoletos.idBoletos, usuarioBoletos.idUsuario];
    sql.query(text, values, (err, res)=>{
        if(err){
            console.log("error al actualizar: ", err);
            result(err, null);
            return;
        }
        console.log("Actualizado exitosamente", res);
        result(null, res);
    });
};

module.exports = UsuarioBoletos;