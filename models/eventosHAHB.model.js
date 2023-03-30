const sql = require('./db.js');
//Constructor
const EventosHAHB = function(eventosHAHB){
    this.idEventos = eventosHAHB.idEventos;
    this.idAsientos = eventosHAHB.idAsientos;
    this.idBoletos = eventosHAHB.idBoletos;
}
//Listar 
EventosHAHB.getAll = (result)=>{
    const text = 'SELECT *FROM "Eventos_has_asientos_has_boletos"';
    sql.query(text, (err, res)=>{
        if(err){
            console.log("error al listar: ", err);
            result(err, null);
            return;
        }
        console.log("Consulta exitosa", res);
        result(null, res);
    });
};
//Crear redes
EventosHAHB.create = (eventosHAHB, result)=>{
    const text = 'INSERT INTO "Eventos_has_asientos_has_boletos" ("idAsientos", "idBoletos") VALUES ($1,$2)';
    const values = [eventosHAHB.idAsientos, eventosHAHB.idBoletos];
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
EventosHAHB.delete = (eventosHAHB, result)=>{
    const text = 'DELETE FROM "Eventos_has_asientos_has_boletos" WHERE "idEventos" = $1';
    const values = [eventosHAHB.idEventos];
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
EventosHAHB.update = (eventosHAHB, result)=>{
    const text = 'UPDATE "Eventos_has_asientos_has_boletos" SET "idAsientos" = $2, "idBoletos" = $3 WHERE "idEventos" = $1';
    const values = [eventosHAHB.idAsientos, eventosHAHB.idBoletos, eventosHAHB.idEventos];
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

module.exports = EventosHAHB;