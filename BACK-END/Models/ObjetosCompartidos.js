import { DataTypes } from "sequelize";
import db from "../Config/db.js";

const ObjetosCompartidos = db.define(
  "ObjetosCompartidos",
  {
    IdObjetosCompartidos: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    FechaCompartido: { type: DataTypes.DATE },
  },
  // {
  //   hooks: {
  //     async beforeBulkCreate(archivos) {
  //       archivos.forEach((archivo) => {
  //         if (archivo.IdObjetos != archivo.IdUsuarios) {
  //           // console.log(objecto);
  //           archivo.UbicacionLogica =
  //             archivo.UbicacionLogica + "/" + archivo.IdObjetos;
  //           archivo.UbicacionVista =
  //             archivo.UbicacionVista + "/" + archivo.NombreVista;
  //         }
  //         archivo.NombreLogico = archivo.IdObjetos;
  //       });
  //     },
  //   },
  // }
);
export default ObjetosCompartidos;
