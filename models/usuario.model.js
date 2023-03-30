const sql = require("./db.js");
const bcrypt = require("bcrypt");

//constructor
const Usuario = function (usuario) {
  this.nombre = usuario.nombre;
  this.apePat = usuario.apePat;
  this.apeMat = usuario.apeMat;
  this.telefono = usuario.telefono;
  this.correo = usuario.correo;
  this.password = usuario.password;
  this.fechaNac = usuario.fechaNac;
  this.idRol = usuario.idRol;
};

Usuario.create = (usuario, result) => {
  const checkExistingEmailQuery = 'SELECT COUNT(*) as count FROM "usuario" WHERE correo = $1';
  const values = [usuario.correo];

  // Verificar si el correo ya existe en la base de datos
  sql.query(checkExistingEmailQuery, values, (err, res) => {
    if (err) {
      console.log("Error al verificar el correo existente: ", err);
      result(err, null);
      return;
    }
    const count = res.rows[0].count;
    if (count > 0) {
      console.log("El correo electrónico ya está registrado.");
      result("El correo electrónico ya está registrado.", null);
      return;
    }
    // Si el correo no existe, procedemos a crear el nuevo usuario
    const insertUserQuery = 'INSERT INTO "usuario" ("nombre", "apePat", "apeMat", "telefono", "correo", "password", "fechaNac", "idRol") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const hashedPassword = bcrypt.hashSync(usuario.password, 10);

    const insertUserValues = [
      usuario.nombre,
      usuario.apePat,
      usuario.apeMat,
      usuario.telefono,
      usuario.correo,
      hashedPassword,
      usuario.fechaNac,
      usuario.idRol,
    ];
    sql.query(insertUserQuery, insertUserValues, (err, res) => {
      if (err) {
        console.log("Error al crear el usuario: ", err);
        result(err, null);
        return;
      }
      console.log("Usuario guardado!", res);
      result(null, res);
    });
  });
};

//Obtener
Usuario.getAll = (result) => {
  let query = 'SELECT * FROM "usuario"';

  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("usuario: ", res);
    result(null, res);
  });
};

//Obtener por id
Usuario.getById = (req, result) => {
  const id = req.params.id;

  sql.query(
    'SELECT * FROM "usuario" WHERE "idUsuario" = $1',
    [id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};
//Actualizar
Usuario.update = (req, result) => {
  const id = parseInt(req.params.id);
  const {
    nombre,
    apePat,
    apeMat,
    telefono,
    correo,
    password,
    fechaNac,
    idRol,
  } = req.body;

  sql.query(
    'UPDATE "usuario" SET "nombre" = $1, "apePat" = $2, "apeMat" = $3, "telefono" = $4, "correo" = $5, "password" = $6, "fechaNac" = $7, "idRol" = $8 WHERE "idUsuario" = $9',
    [
      nombre,
      apePat,
      apeMat,
      telefono,
      correo,
      password,
      fechaNac,
      idRol,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      console.log("Usuario: ", res);
      result(null, res);
    }
  );
};

// Usuario.updateStatus = (req, result) => {
//   const id = parseInt(req.params.id);
//   const estado = false;

//   sql.query(
//     'UPDATE "Usuario" SET "isActive" = $1 WHERE "idUsuario" = $2',
//     [estado, id],
//     (err, res) => {
//       if (err) {
//         console.log("Error: ", err);
//         result(err, null);
//         return;
//       }
//       console.log("Usuario: ", res);
//       result(null, res);
//     }
//   );
// };


//Eliminar
Usuario.delete = (req, result) => {
  const id = req.params.id;

  sql.query(
    'DELETE FROM "usuario" WHERE "idUsuario" = $1',
    [id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

//Obtener usuario por correo
Usuario.findOne = async (correo) => {
  const query = `SELECT "usuario".* FROM "usuario" WHERE "usuario"."correo" = $1`; //AND "isActive" = true
  const values = [correo];
  const { rows } = await sql.query(query, values);
  return rows[0];
};


module.exports = Usuario;

//Crear
// Usuario.create = (usuario, result) => {
//   const text =
//     'INSERT INTO "Usuario" ("nombre", "apePat", "apeMat", "correo", "password", "fechaNac", \
//   "isActive", "idRoles", "idSangre", "sexo") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
//   const hashedPassword = bcrypt.hashSync(usuario.password, 10);
//   const active = true;

//   const values = [
//     usuario.nombre,
//     usuario.apePat,
//     usuario.apeMat,
//     usuario.correo,
//     hashedPassword,
//     usuario.fechaNac,
//     active,
//     usuario.idRoles,
//     usuario.idSangre,
//     usuario.sexo,
//   ];
//   sql.query(text, values, (err, res) => {
//     if (err) {
//       console.log("Error al crear el usuario: ", err);
//       result(err, null);
//       return;
//     }
//     console.log("Usuario guardado!", res);
//     result(null, res);
//   });
// };

//Actualizar conforme al periodo de donación
// Usuario.updateStatus2 = (req, result) => {
//   const id = parseInt(req.params.id);
//   const estado = true;

//   sql.query(
//     'UPDATE "Usuario" SET "isActive" = $1 WHERE "idUsuario" = $2',
//     [estado, id],
//     (err, res) => {
//       if (err) {
//         console.log("Error: ", err);
//         result(err, null);
//         return;
//       }
//       console.log("Usuario: ", res);
//       result(null, res);
//     }
//   );
// };