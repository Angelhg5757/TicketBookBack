const sql = require('./db.js');
//Constructor
const UsuarioEventos = function(usuarioEventos){
    this.idUsuario = usuarioEventos.idUsuario;
    this.idEventos = usuarioEventos.idEventos;
}
//Listar 
UsuarioEventos.getAll = (result)=>{
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
UsuarioEventos.create = (usuarioEventos, result)=>{
    const text = 'INSERT INTO "Usuario_has_Boleto" ("idUsuario", "idEventos") VALUES ($1,$2)';
    const values = [usuarioEventos.idUsuario, usuarioEventos.idEventos];
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
UsuarioEventos.delete = (usuarioEventos, result)=>{
    const text = 'DELETE FROM "Usuario_has_Boleto" WHERE "idUsuario" = $1 AND "idEventos" = $2';
    const values = [usuarioEventos.idUsuario, usuarioEventos.idBoletos];
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
UsuarioEventos.update = (usuarioEventos, result)=>{
    const text = 'UPDATE "Usuario_has_Boleto" SET "idEventos" = $2 WHERE "idUsuario" = $1';
    const values = [usuarioEventos.idEventos, usuarioEventos.idUsuario];
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

module.exports = UsuarioEventos;