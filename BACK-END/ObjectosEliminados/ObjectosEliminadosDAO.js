import { Op } from "sequelize";
import { ObjetosEliminados, Objetos } from "../Models/index.js";
import EntidadNoExisteError from "../Validadores/Errores/EntidadNoExisteError.js";
import {
  obtenerCarpetaDestinoEliminados,
  moverObjectoBD,
} from "../Objetos/ObjectosDAO.js";
import db from "../Config/db.js";

import { moveSync } from "fs-extra/esm";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const crearObjectosEliminados = async (datos = [], transaction) => {
  if (!transaction) {
    transaction = await db.transaction();
  }
  try {
    const newDatos = [];
    datos.forEach((dato) => {
      const diasASumar = 30;
      const milisegundosPorDia = 24 * 60 * 60 * 1000;
      const fechaResultado = new Date(
        new Date().getTime() + diasASumar * milisegundosPorDia
      );

      dato.dataValues.FechaEliminado = new Date();
      dato.dataValues.FechaMaxRecuperacion = new Date(fechaResultado);
      const newDato = dato.dataValues;
      newDatos.push(newDato);
    });
    // console.log(newDatos);
    const objectosEliminados = await ObjetosEliminados.bulkCreate(newDatos, {
      transaction,
    });
    // console.log(datos);
    return {
      status: 200,
      message: "Datos eliminados correctamente",
      data: {
        datos,
      },
    };
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    let status = 500;
    let message = "Error en el servidor";
    if (error instanceof EntidadNoExisteError) {
      status = 404;
      message = error.message;
    }
    return {
      status,
      message,
    };
  }
};

const crearCarpetaEliminada = async (IdObjetos, transaction) => {
  if (!transaction) {
    transaction = await db.transaction();
  }
  try {
    // console.log(IdObjetos);
    // return IdObjetos;
    const diasASumar = 30;
    const milisegundosPorDia = 24 * 60 * 60 * 1000;
    const fechaResultado = new Date(
      new Date().getTime() + diasASumar * milisegundosPorDia
    );
    const eliminarCarpeta = await ObjetosEliminados.create(
      {
        IdObjetos,
        FechaEliminado: new Date(),
        FechaMaxRecuperacion: fechaResultado,
      },
      { transaction }
    );
    return {
      status: 200,
      message: "Carpeta eliminada exitosamente",
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

const esUnObjectoEliminado = async (IdObjetos, EsDirectorio) => {
  try {
    const objectoEliminado = await ObjetosEliminados.findOne({
      where: {
        IdObjetos,
      },
    });
    console.log(objectoEliminado);
    if (!objectoEliminado) {
      throw new EntidadNoExisteError("No existe");
    }

    const objecto = await Objetos.findOne({
      where: {
        [Op.and]: [{ IdObjetos }, { EsDirectorio }],
      },
    });

    if (!objecto) {
      throw new EntidadNoExisteError("No existe");
    }
    return {
      status: 200,
      message: "Esta eliminado",
      data: {
        objecto,
      },
    };
  } catch (error) {
    console.log(error);
    let status = 500;
    let message = "Error en el servidor";
    if (error instanceof EntidadNoExisteError) {
      status = 400;
      message = error.message;
    }
    return {
      status,
      message,
    };
  }
};

const restaurarDirectorioDB = async (IdObjetos = "", transaction) => {
  if (!transaction) {
    transaction = await db.transaction();
  }
  try {
    const restaurar = await ObjetosEliminados.destroy({
      where: {
        IdObjetos,
      },
      transaction,
    });
    return {
      status: 200,
      message: "Directorio restaurado",
    };
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    let status = 500,
      message = "Error en el servidor";
    return { status, message };
  }
};

const archivoEliminado = async (IdObjetos = "") => {
  try {
    const archivo = await ObjetosEliminados.findOne({
      where: {
        IdObjetos,
      },
    });
    if (!archivo) {
      throw new EntidadNoExisteError("El archivo no existe");
    }

    return { status: 200, message: "Archivo eliminado", data: { archivo } };
  } catch (error) {
    console.log(error);
    let status = 500,
      message = "Error en el servidor";

    if (!(error instanceof EntidadNoCreadaError)) {
    }
    if (error instanceof EntidadNoCreadaError) {
      status = 400;
      message = error.message;
    }
    if (error instanceof EntidadNoExisteError) {
      status = 400;
      message = error.message;
    }
    if (error instanceof OperacionUsuarioNoValidaError) {
      status = 400;
      message = error.message;
    }

    return {
      status,
      message,
      data: {},
    };
  }
};

const recuperarArchivo = async (IdObjetos = "", IdUsuarios = "") => {
  let transaction = await db.transaction();
  try {
    // const {}
    const archivo = await Objetos.findOne({
      where: {
        [Op.and]: [
          {
            UbicacionLogica: {
              [Op.like]: `%${IdObjetos}`,
            },
          },
          { IdUsuarios },
          { EstaEliminado: true },
        ],
      },
      // attributes: ["IdObjetos", "UbicacionLogica"],
    });
    const extencion =
      archivo.NombreVista.split(".")[archivo.NombreVista.split(".").length - 1];
    const lugarActual = `${__dirname}../../public/uploads${archivo.UbicacionLogica}.${extencion}`;
    const lugarDestino = `${__dirname}../../public/uploads/${IdUsuarios}/${IdObjetos}.${extencion}`;
    // console.log(descendencia);

    const buscarCarpetaUbicacionEliminados =
      await obtenerCarpetaDestinoEliminados(IdUsuarios);
    if (!buscarCarpetaUbicacionEliminados) {
      throw new EntidadNoExisteError("No se pudo eliminar la carpeta");
    }

    // TODO: LLEGA hasta aqui, checar si funcionan bien UbicacionVista, UbicacionLogica
    const moverObjectoBDUno = await moverObjectoBD(
      archivo,
      transaction,
      IdObjetos,
      `/${IdUsuarios}`,
      `/root`
    );
    if (moverObjectoBDUno.status != 200) {
      throw new EntidadNoExisteError("No se pudo restaurar el archivo");
    }

    const cambiarEstadoArchivoAExiste = await Objetos.update(
      { EstaEliminado: false, Padre: IdUsuarios },
      {
        where: {
          [Op.and]: [
            {
              UbicacionLogica: {
                [Op.like]: `%${IdObjetos}`,
              },
            },
            { IdUsuarios },
            { EstaEliminado: true },
            { IdObjetos },
          ],
        },
        transaction,
      }
    );

    if (!cambiarEstadoArchivoAExiste) {
      throw new EntidadNoExisteError("No se pudo restaurar el directorio");
    }

    const resDirDbEliminada = await restaurarDirectorioDB(
      IdObjetos,
      transaction
    );
    if (resDirDbEliminada.status != 200) {
      throw new EntidadNoExisteError("No se pudo restaurar el directorio");
    }

    await moveSync(lugarActual, lugarDestino, { overwrite: true });

    await transaction.commit();
    // await transaction.rollback();
    return {
      status: 200,
      message: "Archivo recuperado",
      data: {
        archivo,
        lugarActual,
        lugarDestino,
        buscarCarpetaUbicacionEliminados,
        moverObjectoBDUno,
        resDirDbEliminada,
      },
    };
  } catch (error) {
    console.log(error);
    let status = 500;
    let message = "Error en el servidor eliminandoDirectoriosReal";
    // if (error.code === "ENOTEMPTY") {
    //   await eliminandoDirectoriosReal(ubicacion);
    // }
    if (error instanceof EntidadNoExisteError) {
      status = 404;
      message = error.message;
    } else {
      await transaction.rollback();
    }
    return {
      status,
      message,
    };
  }
};

export {
  crearObjectosEliminados,
  crearCarpetaEliminada,
  esUnObjectoEliminado,
  restaurarDirectorioDB,
  archivoEliminado,
  recuperarArchivo,
};
