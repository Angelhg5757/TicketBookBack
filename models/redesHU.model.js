const sql = require('./db.js');
//Constructor
const RedesUsuario = function(redesUsuario){
    this.idUsuario = redesUsuario.idUsuario;
    this.idRedes = redesUsuario.idRedes;
    this.url = redesUsuario.url;
}
//Listar redes
RedesUsuario.getAll = (result)=>{
    const text = 'SELECT *FROM "Redes_has_Usuario"';
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
RedesUsuario.create = (redesUsuario, result)=>{
    const text = 'INSERT INTO "Redes_has_Usuario" ("Usuario_idUsuario", "Redes_idRedes", "url") VALUES ($1,$2)';
    const values = [redesUsuario.idUsuario, redesUsuario.idRedes,redesUsuario.url];
    sql.query(text, values, (err, res)=>{
        if(err){
            console.log("error al crear red de usuario: ", err);
            result(err, null);
            return;
        }
        console.log("Red creada exitosamente", res);
        result(null, res);
    });
};
//Eliminar redes
RedesUsuario.delete = (redesUsuario, result)=>{
    const text = 'DELETE FROM "Redes_has_Usuario" WHERE "Usuario_idUsuario" = $1 AND "Redes_idRedes" = $2';
    const values = [redesUsuario.idUsuario, redesUsuario.idRedes];
    sql.query(text, values, (err, res)=>{
        if(err){
            console.log("error al eliminar red de usuario: ", err);
            result(err, null);
            return;
        }
        console.log("Red eliminada exitosamente", res);
        result(null, res);
    });
};
//Actualizar redes
RedesUsuario.update = (redesUsuario, result)=>{
    const text = 'UPDATE "Redes_has_Usuario" SET "Redes_idRedes" = $2, "url" = $3 WHERE "Usuario_idUsuario" = $1';
    const values = [redesUsuario.idUsuario, redesUsuario.idRedes, redesUsuario.url];
    sql.query(text, values, (err, res)=>{
        if(err){
            console.log("error al actualizar red de usuario: ", err);
            result(err, null);
            return;
        }
        console.log("Red actualizada exitosamente", res);
        result(null, res);
    });
};

module.exports = RedesUsuario;