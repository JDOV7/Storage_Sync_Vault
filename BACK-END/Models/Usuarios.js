import { DataTypes } from "sequelize";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import db from "../Config/db.js";
import creandoTokenAcceso from "../Helpers/CreandoTokenAcceso.js";
import { enviarCorreo } from "../Helpers/EnviarCorreo.js";

const Usuarios = db.define(
  "Usuarios",
  {
    IdUsuarios: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    Correo: { type: DataTypes.STRING },
    Password: { type: DataTypes.STRING },
    Nombres: { type: DataTypes.STRING },
    Apellidos: { type: DataTypes.STRING },
    TokenAcceso: { type: DataTypes.STRING },
    Activo: { type: DataTypes.BOOLEAN },
    IdAutorizacion: { type: DataTypes.STRING },
    ServidorAutorizacion: { type: DataTypes.STRING },
  },
  {
    hooks: {
      async beforeCreate(usuario) {
        if (usuario.ServidorAutorizacion != "Github") {
          const token = await creandoTokenAcceso(10);
          usuario.TokenAcceso = token;
          await enviarCorreo({
            Correo: usuario.Correo,
            Nombres: usuario.Nombres,
            TokenAcceso: token,
          });
        }

        usuario.Password = Usuarios.prototype.hashPassword(usuario.Password);
      },
    },
  }
);

Usuarios.prototype.validarPassword = function (password) {
  return compareSync(password, this.Password);
};

Usuarios.prototype.hashPassword = function (password) {
  return hashSync(password, genSaltSync(10), null);
};

Usuarios.prototype.obtenerDatos = function () {
  const datos = {
    Nombres: this.Nombres,
    IdUsuarios: this.IdUsuarios,
    IdPlanes: this.IdPlanes,
  };
  return datos;
};

export default Usuarios;
