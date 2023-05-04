const {Client} = require('pg');
//const dbconfig = require("../config/db.config.js");

//Crear conexion con posgresql
//const con = new Client(process.env.DATABASE_URL);
 const con = new Client({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER ,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB ,
    port: process.env.DATABASE_PORT
}); 
/* const con = new Client({
    host:dbconfig.HOST,
    user:dbconfig.USER,
    password:dbconfig.PASSWORD,
    database:dbconfig.DB,
    port:dbconfig.PORT
});  */


//abrir conexion
con.connect((error)=>{
    if(error) console.error('connection error', error.stack);
    else console.log("Conexion correcta a la base de datos");
});


module.exports = con;