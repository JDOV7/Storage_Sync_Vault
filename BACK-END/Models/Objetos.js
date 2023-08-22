import { DataTypes } from "sequelize";
import db from "../Config/db.js";

const Objetos = db.define("Objetos", {
  IdObjetos: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  NombreVista: { type: DataTypes.STRING },
  NombreLogico: { type: DataTypes.STRING },
  UbicacionVista: { type: DataTypes.STRING },
  UbicacionLogica: { type: DataTypes.STRING },
  Padre: { type: DataTypes.STRING },
  EsDirectorio: { type: DataTypes.BOOLEAN },
  Mime: { type: DataTypes.STRING },
  PesoMB: { type: DataTypes.FLOAT },
  FechaCreacion: { type: DataTypes.DATE },
  FechaActualizacion: { type: DataTypes.DATE },
});

export default Objetos;
