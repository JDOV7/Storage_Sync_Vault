import db from "../Config/db.js";
// import CajaFuertes from "../Models/CajaFuertes.js";
import {
  crearDirectorioRaiz,
  crearDirectorio,
} from "../Objetos/ObjectosDAO.js";
import registrarObjectoEnETH from "../Helpers/ETH/RegistrarObjectoEnETH.js";
const crearCajaFuerte = async (IdUsuario = "", transaction) => {
  if (!transaction) {
    transaction = await db.transaction();
  }

  try {
    const cajaFuerteDatos = {
      IdUsuarios: IdUsuario,
      TokenAcceso: "",
    };

    // console.log(`crearCajaFuerte: -${cajaFuerteDatos.IdUsuarios}`);
    // const cajaFuerte = await CajaFuertes.create(cajaFuerteDatos, {
    //   transaction,
    // });
    // throw new Error("");

    const datosDirRaiz = {
        IdObjetos: IdUsuario,
        IdUsuarios: IdUsuario,
        Cid: IdUsuario,
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
      },
      datosEliminados = {
        IdUsuarios: IdUsuario,
        NombreVista: `Eliminados-${IdUsuario}`,
        UbicacionVista: "/root",
        UbicacionLogica: `/${IdUsuario}`,
        Padre: IdUsuario,
        EsDirectorio: true,
        Mime: "directory",
        PesoMB: 0,
        FechaCreacion: new Date(),
        FechaActualizacion: new Date(),
        EstaEliminado: false,
      };

    const dicRoot = await crearDirectorio(datosDirRaiz, transaction);
    const dicEliminados = await crearDirectorio(datosEliminados, transaction);
    const datosDir = {
      IdUsuario,
      // IdCajaFuertes: cajaFuerte.IdCajaFuertes,
      IdEliminado: dicEliminados.data.IdObjetos,
    };

    console.log(`cajaFuerteDatos.IdUsuarios: ${cajaFuerteDatos.IdUsuarios}`);
    const registrarCarpetaRaizEnETH = await registrarObjectoEnETH(
      cajaFuerteDatos.IdUsuarios,
      cajaFuerteDatos.IdUsuarios
    );
    // const registrarCajaFuerteEnETH = await registrarObjectoEnETH(
    //   cajaFuerteDatos.IdUsuarios,
    //   datosDir.IdCajaFuertes
    // );
    const registrarCarpetaEliminadosEnETH = await registrarObjectoEnETH(
      cajaFuerteDatos.IdUsuarios,
      datosDir.IdEliminado
    );
    if (
      !registrarCarpetaRaizEnETH ||
      // !registrarCajaFuerteEnETH ||
      !registrarCarpetaEliminadosEnETH
    ) {
      throw new Error("No se pudo registrar el objecto en ETH");
    }

    //Si quiero crear el folder real sin IPFS descomentar este codigo
    // await crearDirectorioRaiz(datosDir);

    await transaction.commit();
    return {
      status: 200,
      message: "Caja fuerte creada",
      data: {
        // cajaFuerte: cajaFuerte.IdCajaFuertes,
        datosDir,
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
