import { Op } from "sequelize";
import { mkdir, rmdir, rm } from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { removeSync } from "fs-extra/esm";

import db from "../Config/db.js";
import { Objetos } from "../Models/index.js";
import { crearObjectosEliminadosServicio } from "../ObjectosEliminados/ObjectosEliminadosServicio.js";
import EntidadNoExisteError from "../Validadores/Errores/EntidadNoExisteError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const subiendoArchivos = async (datos = {}) => {
  const IdUsuarios = datos.usuario.IdUsuarios;
  const UbicacionVista = datos.headers.padre.datos.UbicacionVista;
  const UbicacionLogica = datos.headers.padre.datos.UbicacionLogica;
  const Padre =
    UbicacionLogica.split("/")[UbicacionLogica.split("/").length - 1];
  const EsDirectorio = false;
  // const IdCajaFuertes = "";
  const FechaCreacion = new Date();
  const FechaActualizacion = FechaCreacion;
  const EstaEliminado = false;
  const archivos = [];
  datos.files.forEach((archivo) => {
    const dataArchivo = {
      IdObjetos: archivo.filename.split(".")[0],
      IdUsuarios,
      // IdCajaFuertes,
      UbicacionVista,
      UbicacionLogica,
      Padre,
      EsDirectorio,
      FechaCreacion,
      FechaActualizacion,
      NombreVista: archivo.originalname,
      Mime: archivo.mimetype,
      PesoMB: archivo.size,
      EstaEliminado,
    };
    archivos.push(dataArchivo);
  });

  const subiendoArchivos = await Objetos.bulkCreate(archivos);
  console.log(subiendoArchivos);

  return {
    status: 200,
    message: "Archivos subidos correctamente",
    data: {
      subiendoArchivos,
      // archivos,
      // files: datos.files,
    },
  };
};

const crearDirectorio = async (datos = {}, transaction) => {
  try {
    if (!transaction) {
      transaction = await db.transaction();
    }
    const directorio = await Objetos.create(datos, { transaction });
    await transaction.commit();
    return {
      status: 200,
      message: "Directorio creado correctamente",
      data: {
        UbicacionLogica: directorio.UbicacionLogica,
      },
    };
  } catch (error) {
    console.log(error);
    await transaction.rollback();
    return {
      status: 500,
      message: "No se pudo crear el directorio",
    };
  }
};

const crearDirectorioRaiz = async (datos = {}) => {
  try {
    const { IdUsuario, IdCajaFuertes } = datos;
    const projectFolder = new URL(
      `../public/uploads/${IdUsuario}/${IdCajaFuertes}/`,
      import.meta.url
    );
    const createDir = await mkdir(projectFolder, { recursive: true });
    return {
      status: 200,
      message: "Directorio creado",
    };
  } catch (error) {
    return {
      status: 500,
      message: "No se pudo crear el directorio",
    };
  }
};

const crearDirectorioReal = async (ubicacion) => {
  try {
    console.log(ubicacion);
    const projectFolder = new URL(
      `../public/uploads/${ubicacion}/`,
      import.meta.url
    );
    const createDir = await mkdir(projectFolder, { recursive: true });
    console.log(createDir);
    return {
      status: 200,
      message: "Directorio creado",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "No se pudo crear el directorio",
    };
  }
};

const obtenerDatosPadre = async function (IdObjetos) {
  try {
    const padre = await Objetos.findOne({
      where: {
        [Op.and]: [
          { IdObjetos },
          { EsDirectorio: true },
          { EstaEliminado: false },
        ],
      },
    });
    if (!padre) {
      throw new EntidadNoExisteError("Este directorio no existe");
    }
    const datos = {
      UbicacionVista: padre.UbicacionVista,
      UbicacionLogica: padre.UbicacionLogica,
      IdUsuarios: padre.IdUsuarios,
    };
    return {
      status: 200,
      datos,
    };
  } catch (error) {
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

const obtenerElementosDirectorio = async (datos = {}) => {
  try {
    const { IdObjetos, IdUsuarios } = datos;
    const elementos = await Objetos.findAll({
      where: {
        [Op.and]: [
          {
            UbicacionLogica: {
              [Op.like]: `%${IdObjetos}/________-____-____-____-____________`,
            },
          },
          { IdUsuarios },
          { EstaEliminado: false },
        ],
      },
      attributes: {
        exclude: [
          "NombreLogico",
          "IdCajaFuertes",
          "IdUsuarios",
          "UbicacionLogica",
          "Padre",
          "PesoMB",
          "EsDirectorio",
        ],
      },
    });
    if (!elementos) {
      throw new EntidadNoExisteError("No existe este directorio");
    }
    return {
      status: 200,
      message: "Elementos en el directorio",
      data: {
        elementos: elementos,
      },
    };
  } catch (error) {
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

const eliminarDirectorio = async (datos = {}) => {
  const transaction = await db.transaction();
  try {
    const { padre, IdObjetos, IdUsuarios } = datos;
    const todosLosObjetos = await Objetos.findAll({
      where: {
        [Op.and]: [
          {
            UbicacionLogica: {
              [Op.like]: `%${IdObjetos}%`,
            },
          },
          { IdUsuarios },
          { EstaEliminado: false },
        ],
      },
      attributes: ["IdObjetos"],
    });
    const respuestaEliminarObjectos = await crearObjectosEliminadosServicio(todosLosObjetos);
    // const eliminarObjectos = await Objetos.update(
    //   { EstaEliminado: true },
    //   {
    //     where: {
    //       [Op.and]: [
    //         {
    //           UbicacionLogica: {
    //             [Op.like]: `%${IdObjetos}%`,
    //           },
    //         },
    //         { IdUsuarios },
    //         { EstaEliminado: false },
    //       ],
    //     },
    //   }
    // );
    // const resEliminarReal = await eliminandoDirectoriosReal(
    //   padre.datos.UbicacionLogica
    // );
    // if (resEliminarReal.status != 200) {
    //   throw new Error(resEliminarReal.message);
    // }
    await transaction.commit();
    return {
      status: 200,
      // datos: { ...datos, todosLosObjetos, resEliminarReal },
      // datos: { ...datos, eliminarObjectos },
      datos: { ...datos, todosLosObjetos, respuestaEliminarObjectos },
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

const eliminandoDirectoriosReal = async (ubicacion = "") => {
  try {
    console.log(
      "------------------eliminandoDirectoriosReal-------------------"
    );
    console.log(ubicacion);
    const projectFolder = new URL(
      `../public/uploads${ubicacion}`,
      import.meta.url
    );
    try {
      const ubicacionGlobal = `${__dirname}../../public/uploads${ubicacion}/`;
      // throw new Error("");
      const eliminarDir = await removeSync(ubicacionGlobal);
    } catch (error) {
      if (error.code === "ENOTEMPTY") {
        await eliminandoDirectoriosReal(ubicacion);
      }
    }

    return {
      status: 200,
      // datos: { eliminarDirContenido, eliminarDir },
    };
  } catch (error) {
    console.log(error);
    console.log(error.code);
    let status = 500;
    let message = "Error en el servidor eliminandoDirectoriosReal";
    // if (error.code === "ENOTEMPTY") {
    //   await eliminandoDirectoriosReal(ubicacion);
    // }
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

export {
  subiendoArchivos,
  crearDirectorioRaiz,
  crearDirectorio,
  obtenerDatosPadre,
  crearDirectorioReal,
  obtenerElementosDirectorio,
  eliminarDirectorio,
};
