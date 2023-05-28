const sql = require("./db.js");
//Constructor
const Boletos = function (boletos) {
  //this.idBoletos = boletos.idBoletos;
  this.idUsuario = boletos.idUsuario;
  this.idAsientos = boletos.idAsientos;
  this.idSecciones = boletos.idSecciones;
  this.cantidad = boletos.cantidad;
  this.costo_servicio = boletos.costo_servicio;
  this.precioBoleto = boletos.precioBoleto;
  this.total = boletos.total;
  this.idEventos = boletos.idEventos;
};

//Listar 
Boletos.getAll = (result) => {
  let query = 'SELECT * FROM "boletos"';

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Boletos: ", res);
    result(null, res);
  });
};
//Usuarios por boletos
Boletos.getBoletos = (req, result) => {
  const id = parseInt(req.params.id);
  sql.query('Select "boletos"."idUsuario", "boletos"."idEventos", "eventos"."nombre" from boletos INNER join "eventos" ON "boletos"."idEventos" = "eventos"."idEventos" where "boletos"."idUsuario" = $1', [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Boletos: ", res);
    result(null, res);
  });
};

//Boletos por evento
Boletos.getBoletosEvento = (req, result) => {
  const id = parseInt(req.params.id);
  sql.query('Select "boletos".*, "eventos"."nombre" from boletos INNER join "eventos" ON "boletos"."idEventos" = "eventos"."idEventos" where "boletos"."idEventos" = $1', [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Boletos: ", res);
    result(null, res);
  });
};

//Crear Boletos
Boletos.create = (boletos, result) => {
  const query = 'INSERT INTO "boletos" ("idUsuario", "idAsientos", "idSecciones", "cantidad", "costo_servicio", "precioBoleto", "total", "idEventos") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
  const values = [boletos.idUsuario, boletos.idAsientos, boletos.idSecciones, boletos.cantidad, boletos.costo_servicio, boletos.precioBoleto, boletos.total, boletos.idEventos];
  sql.query(query, values, (err, res) => {
    if(err){
      console.log("Error al crear: ", err);
      result(err, null);
      return;
    }
    console.log("Boleto creado: ", res);
    result(null, res);
  });
};
//Eliminar boletos
Boletos.delete = (req, result) => {
  const id = parseInt(req.params.id);

  sql.query('DELETE FROM "boletos" WHERE "idBoletos" = $1', [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

//Actualizar Boletos
Boletos.update = (req, result) => {
  const id = parseInt(req.params.id);
  const query = 'UPDATE "boletos" SET "idAsientos" = $1, "idSecciones" = $2, "cantidad" = $3 "costo_servicio" = $4, "precioBoleto" = $5, "total" = $6 WHERE "idUsuario" = $7';
  const values = [req.body.idAsientos, req.body.idSecciones, req.body.cantidad, req.body.costo_servicio, req.body.precioBoleto, req.body.total, id];
  sql.query(query, values, (err, res) => {
    if(err){
      console.log("Error al actualizar: ", err);
      result(err, null);
      return;
    }
    console.log("Boleto actualizado: ", res);
    result(null, res);
  });
};

//Boletos por usuario
// Boletos.getBoletosPorUsuario = (req, result) => {
//   const id = parseInt(req.params.id);
//   const query = 'Select asientos.numero, eventos.ciudad, eventos.descripcion, asientos.seccion, eventos.fecha, eventos.imagen, eventos.nombre, precio.precio from boletos inner join asientos ON asientos."idAsientos" = boletos."idAsientos" inner join eventos ON eventos."idEventos" = boletos."idEventos" inner join precio ON precio."idPrecio" = boletos."idPrecio" where boletos."idUsuario" = $1';
//   const values = [req.body.idUsuario];
//   sql.query(query, values, (err,res) =>{
//     if(err){
//       console.log("Error al obtener los boletos del usuario:", err);
//       result(err,null);
//       return;
//     }
//     console.log("Boletos del usuario: ",res);
//     result(null, res); 
//   });
// };

Boletos.getBoletosPorUsuario = (req, result) => {
  const id = parseInt(req.params.id);
  sql.query('Select inmuebles.nombre as inmueble_nombre, asientos.numero, eventos.ciudad, eventos.descripcion, asientos.seccion, eventos.fecha, eventos.imagen, eventos.nombre as eventos_nombre, precio.precio from boletos inner join asientos ON asientos."idAsientos" = boletos."idAsientos" inner join eventos ON eventos."idEventos" = boletos."idEventos" inner join precio ON precio."idPrecio" = boletos."idPrecio" inner join inmuebles ON inmuebles."idInmuebles" = eventos."idInmueble" where boletos."idUsuario" = $1', [id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    console.log("Boletos: ", res);
    result(null, res);
  });
};

Boletos.getBoletosCrud = (req,result)=>{
  sql.query('select boletos."idBoletos",eventos.nombre as eventos_nombre, usuario.nombre, asientos.numero, asientos.seccion, precio.precio, boletos.descripcion from boletos inner join asientos ON asientos."idAsientos" = boletos."idAsientos" inner join eventos ON eventos."idEventos" = boletos."idEventos" inner join precio ON precio."idPrecio" = boletos."idPrecio" inner join usuario on usuario."idUsuario" = boletos."idUsuario"',(err,res) => {
    if(err){
      console.log("Error: ", err);
      result(err,null);
      return;
    }
    console.log("Boletos: ",res);
    result(null,res);
  });
};

//Actualizar boletos
Boletos.actualizarAnidado = (req, result) => {
  const id = req.params.id;
  const {
    numero,
    seccion,
    eventos_nombre,
    precio,
    nombre,
    descripcion,
  } = req.body;
  
  const query = `
    UPDATE "boletos" 
    SET 
      "idAsientos" = (SELECT "idAsientos" FROM asientos WHERE numero = $1 AND seccion = $2 LIMIT 1), 
      "idEventos" = (SELECT "idEventos" FROM eventos WHERE nombre = $3), 
      "idPrecio" = (SELECT "idPrecio" FROM precio WHERE precio = $4), 
      "idUsuario" = (SELECT "idUsuario" FROM Usuario WHERE nombre = $5 LIMIT 1), 
      descripcion = $6 
    WHERE 
      "idBoletos" = $7
  `;

  sql.query(query, [numero, seccion, eventos_nombre, precio, nombre, descripcion, id], (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    console.log("Actualizado! ", res);
    result(null, res);
  });
};

module.exports = Boletos;