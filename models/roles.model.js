const sql = require("./db.js");

const Roles = function (roles) {
  this.idRol = roles.idRol;
  this.nombre = roles.nombre;
};

Roles.getAll = (result) => {
  let query = 'SELECT * FROM "roles"';

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Roles: ", res);
    result(null, res);
  });
};

module.exports = Roles;