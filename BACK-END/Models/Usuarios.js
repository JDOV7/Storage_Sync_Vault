import { DataTypes } from "sequelize";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import db from "../Config/db.js";
import creandoTokenAcceso from "../Helpers/CreandoTokenAcceso.js";

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
  },
  {
    hooks: {
      async beforeCreate(usuario) {
        usuario.TokenAcceso = await creandoTokenAcceso();
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
export default Usuarios;
