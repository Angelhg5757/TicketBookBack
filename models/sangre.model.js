const sql = require("./db.js");

const Sangre = function (sangre) {
  this.idSangre = sangre.id;
  this.Tipo = sangre.Tipo;
};

Sangre.getAll = (result) => {
  let query = 'SELECT * FROM "TipoSangre"';

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Tipo: ", res);
    result(null, res);
  });
};

module.exports = Sangre;
