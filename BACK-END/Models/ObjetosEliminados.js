import { DataTypes } from "sequelize";
import db from "../Config/db.js";

const ObjetosEliminados = db.define("ObjetosEliminados", {
  IdObjetosEliminados: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  FechaEliminado: { type: DataTypes.DATE },
});
export default ObjetosEliminados;
