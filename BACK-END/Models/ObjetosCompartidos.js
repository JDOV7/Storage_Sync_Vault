import { DataTypes } from "sequelize";
import db from "../Config/db.js";

const ObjetosCompartidos = db.define("ObjetosCompartidos", {
  IdObjetosEliminados: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
});
export default ObjetosCompartidos;
