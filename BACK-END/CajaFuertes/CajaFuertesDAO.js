import db from "../Config/db.js";
import CajaFuertes from "../Models/CajaFuertes.js";
import {
  crearDirectorioRaiz,
  crearDirectorio,
} from "../Objetos/ObjectosDAO.js";
const crearCajaFuerte = async (IdUsuario = "", transaction) => {
  if (!transaction) {
    transaction = await db.transaction();
  }

  try {
    const cajaFuerteDatos = {
      IdUsuarios: IdUsuario,
      TokenAcceso: "",
    };
    const cajaFuerte = await CajaFuertes.create(cajaFuerteDatos, {
      transaction,
    });
    // throw new Error("");
    const datosDir = {
      IdUsuario,
      IdCajaFuertes: cajaFuerte.IdCajaFuertes,
    };
    await crearDirectorioRaiz(datosDir);

    const datosDirRaiz = {
      IdObjetos: IdUsuario,
      IdUsuarios: IdUsuario,
      NombreVista: "root",
      UbicacionVista: "/root",
      UbicacionLogica: `/${IdUsuario}`,
      Padre: "/",
      EsDirectorio: true,
      Mime: "directory",
      PesoMB: 0,
      FechaCreacion: new Date(),
      FechaActualizacion: new Date(),
      EstaEliminado: false,
    };

    const dicRoot = await crearDirectorio(datosDirRaiz, transaction);

    // await transaction.commit();
    return {
      status: 200,
      message: "Caja fuerte creada",
      data: {
        cajaFuerte: cajaFuerte.IdCajaFuertes,
      },
    };
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    let status = 500;
    let message = "Error en el servidor";
    return {
      status,
      message,
    };
  }
};

export { crearCajaFuerte };
