import { DataTypes } from "sequelize";
import db from "../Config/db.js";

const Objetos = db.define(
  "Objetos",
  {
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
  },
  {
    hooks: {
      async beforeCreate(objecto) {
        if (objecto.IdObjetos != objecto.IdUsuarios) {
          // console.log(objecto);
          objecto.UbicacionLogica =
            objecto.UbicacionLogica + "/" + objecto.IdObjetos;
          objecto.UbicacionVista =
            objecto.UbicacionVista + "/" + objecto.NombreVista;
        }
        objecto.NombreLogico = objecto.IdObjetos;
      },
    },
  }
);

Objetos.prototype.obtenerDatos = function () {
  const datos = {
    IdObjetos: this.IdObjetos,
    NombreVista: this.NombreVista,
    UbicacionVista: this.UbicacionVista,
    FechaCreacion: this.FechaCreacion,
    FechaActualizacion: this.FechaActualizacion,
  };
  return datos;
};

export default Objetos;
