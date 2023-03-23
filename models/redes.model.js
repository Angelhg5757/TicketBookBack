const sql = require("./db.js");

//Constructor
const Redes = function (redes) {
  this.nombreRed = redes.nombreRed;
};


//Obtener redes
Redes.getAll = (result) => {
  let query = 'SELECT * FROM "Redes"';

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Redes: ", res);
    result(null, res);
  });
};


module.exports = Redes;