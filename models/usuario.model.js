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
  //let query = 'SELECT * FROM "usuario"';
  let query = 'SELECT usuario."idUsuario", usuario.nombre, usuario."apePat", usuario."apeMat", usuario.telefono, usuario.correo, usuario."password", usuario."fechaNac",usuario."idRol", roles.nombre as rol_nombre FROM "usuario" INNER Join roles ON roles."idRol" = "usuario"."idRol"';
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
    idRol
  } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  sql.query(
    'UPDATE "usuario" SET "nombre" = $1, "apePat" = $2, "apeMat" = $3, "telefono" = $4, "correo" = $5, "password" = $6, "fechaNac" = $7, "idRol" = $8 WHERE "idUsuario" = $9',
    [
      nombre,
      apePat,
      apeMat,
      telefono,
      correo,
      hashedPassword,
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

//Actualizar para perfil
const moment = require("moment");

Usuario.updatePerfil = (req, result) => {
  const id = parseInt(req.params.id);
  const {
    nombre,
    apePat,
    apeMat,
    telefono,
    // correo,
    password,
    fechaNac,
  } = req.body;

  // Verificar si el campo de contraseña se proporcionó
  if (password) {
    // Si se proporcionó una nueva contraseña, generar el hash
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Formatear la fecha en el formato deseado (YYYY-MM-DD)
    const formattedFechaNac = moment(fechaNac, "DD-MM-YYYY").format("YYYY-MM-DD");

    // Realizar la actualización de todos los campos, incluyendo la nueva contraseña y la fecha formateada
    sql.query(
      'UPDATE "usuario" SET "nombre" = $1, "apePat" = $2, "apeMat" = $3, "telefono" = $4, "password" = $5, "fechaNac" = $6 WHERE "idUsuario" = $7',
      [
        nombre,
        apePat,
        apeMat,
        telefono,
        // correo,
        hashedPassword,
        formattedFechaNac,
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
  } else {
    // Si no se proporcionó una nueva contraseña, obtener la contraseña actual del usuario
    sql.query(
      'SELECT "password" FROM "usuario" WHERE "idUsuario" = $1',
      [id],
      (err, res) => {
        if (err) {
          console.log("Error: ", err);
          result(err, null);
          return;
        }

        // Obtener la contraseña actual del usuario
        const hashedPassword = res.rows[0].password;

        // Formatear la fecha en el formato deseado (YYYY-MM-DD)
        const formattedFechaNac = moment(fechaNac, "DD-MM-YYYY").format("YYYY-MM-DD");

        // Realizar la actualización de todos los campos, manteniendo la contraseña actual y usando la fecha formateada
        sql.query(
          'UPDATE "usuario" SET "nombre" = $1, "apePat" = $2, "apeMat" = $3, "telefono" = $4, "password" = $5, "fechaNac" = $6 WHERE "idUsuario" = $7',
          [
            nombre,
            apePat,
            apeMat,
            telefono,
            // correo,
            hashedPassword,
            formattedFechaNac,
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
      }
    );
  }
};



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
//Nombre por id
Usuario.findNombre = (req, result) => {
    const id = req.params.id;
    sql.query(
      'SELECT "nombre" FROM "usuario" where "idUsuario" = $1',
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
}

Usuario.getNombres = (req, result)=>{
  sql.query('Select "nombre" from "usuario"',(err, res)=>{
    if(err){
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  })
}

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