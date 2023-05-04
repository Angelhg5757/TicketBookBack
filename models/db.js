const {Client} = require('pg');
//const dbconfig = require("../config/db.config.js");

//Crear conexion con posgresql
//const con = new Client(process.env.DATABASE_URL);
 const con = new Client({
    host: process.env.DATABASE_HOST || "raja.db.elephantsql.com",
    user: process.env.DATABASE_USER || "ubnxqmse",
    password: process.env.DATABASE_PASSWORD || "Bkfho7mMeDOJji91Yoc-7KhI3NJg7X3H",
    database: process.env.DATABASE_DB || "ubnxqmse",
    port: process.env.DATABASE_PORT || 5432
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