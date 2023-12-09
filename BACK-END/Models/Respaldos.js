import { DataTypes } from "sequelize";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import db from "../Config/db.js";
import creandoTokenAcceso from "../Helpers/CreandoTokenAcceso.js";

const Respaldos = db.define("Respaldos", {
  IdRespaldo: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  FechaDeRespaldo: { type: DataTypes.DATE },
});

export default Respaldos;
