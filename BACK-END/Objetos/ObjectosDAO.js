import { Op } from "sequelize";
import { mkdir, rmdir, rm, chmod } from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";
// import { removeSync, moveSync } from "fs-extra/esm";
import fs from "fs-extra";

import db from "../Config/db.js";
import { Objetos } from "../Models/index.js";
import {
  crearObjectosEliminadosServicio,
  crearCarpetaEliminadaServicio,
} from "../ObjectosEliminados/ObjectosEliminadosServicio.js";
import EntidadNoExisteError from "../Validadores/Errores/EntidadNoExisteError.js";
import EntidadNoCreadaError from "../Validadores/Errores/EntidadNoCreadaError.js";

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
    const cambiarPermisos = await chmod(projectFolder, 0o777);
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

const obtenerDatosPadre = async function (IdObjetos, EstaEliminado) {
  try {
    const padre = await Objetos.findOne({
      where: {
        [Op.and]: [{ IdObjetos }, { EsDirectorio: true }, { EstaEliminado }],
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
    const todosLosObjetos = await Objetos.findOne({
      where: {
        [Op.and]: [
          {
            UbicacionLogica: {
              [Op.like]: `%${IdObjetos}`,
            },
          },
          { IdUsuarios },
          { EstaEliminado: false },
        ],
      },
      attributes: ["IdObjetos"],
    });
    // console.log(todosLosObjetos.IdObjetos);
    // throw new Error();
    const respuestaEliminarCarpeta = await crearCarpetaEliminadaServicio(
      todosLosObjetos.IdObjetos
    );
    if (respuestaEliminarCarpeta.status != 200) {
      throw new EntidadNoCreadaError("No se pudo eliminar la carpeta");
    }
    const eliminarObjectos = await Objetos.update(
      { EstaEliminado: true },
      {
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
        transaction,
      }
    );
    // const resEliminarReal = await eliminandoDirectoriosReal(
    //   padre.datos.UbicacionLogica
    // );
    // if (resEliminarReal.status != 200) {
    //   throw new Error(resEliminarReal.message);
    // }
    await transaction.commit();
    return {
      status: 200,
      message: "Carpeta Eliminada Correctamente",
      // datos: { ...datos, todosLosObjetos, resEliminarReal },
      // datos: { ...datos, eliminarObjectos },
      // datos: { ...datos, todosLosObjetos, respuestaEliminarObjectos },
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
    if (error instanceof EntidadNoCreadaError) {
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
    // try {
    //   const ubicacionGlobal = `${__dirname}../../public/uploads${ubicacion}/`;
    //   // throw new Error("");
    //   const eliminarDir = await removeSync(ubicacionGlobal);
    // } catch (error) {
    //   if (error.code === "ENOTEMPTY") {
    //     await eliminandoDirectoriosReal(ubicacion);
    //   }
    // }

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

const recuperarDirectorio = async (datos = {}) => {
  //TODO: cuando se restaure algun objecto se movera a la carpeta /root
  try {
    const {
      infoObjecto: { UbicacionLogica, IdUsuarios, IdObjetos },
    } = datos;
    const nombreDir = "moveExample";
    // const lugarActual = `${__dirname}../../public/uploads${UbicacionLogica}`;
    // const lugarActual = `${__dirname}../../public/uploads/4cfb60b6-f6e5-4ed5-b876-cb26d3f92455/ff8bb2b5-afbf-4214-8c02-89f24faa3af8/move`;

    const lugarActual = `E:\\Desarrollo\\Node\\StorageSyncVault\\BACK-END\\public\\uploads\\4cfb60b6-f6e5-4ed5-b876-cb26d3f92455\\ff8bb2b5-afbf-4214-8c02-89f24faa3af8\\3c4b7ae0-6a72-4b74-b535-e7a3c1ce8eae\\38d05eea-b474-402a-a0ae-b1dc54b96fe4`;
    // const lugarActual = `E:\\Desarrollo\\Node\\StorageSyncVault\\BACK-END\\public\\uploads\\4cfb60b6-f6e5-4ed5-b876-cb26d3f92455\\aee5b324-ef6f-42e1-b50d-517f8cfa2dd0\\9bfb4012-7aad-4577-b003-c35fb046d9a3`;
    console.log(lugarActual);
    // const lugarDestino = `${__dirname}../../public/uploads/${IdUsuarios}/${IdObjetos}`;
    // const lugarDestino = `${__dirname}../../public/uploads/4cfb60b6-f6e5-4ed5-b876-cb26d3f92455/move`;
    // const lugarDestino = `E:\\Desarrollo\\Node\\StorageSyncVault\\BACK-END\\public\\uploads\\4cfb60b6-f6e5-4ed5-b876-cb26d3f92455\\9bfb4012-7aad-4577-b003-c35fb046d9a3`;
    const lugarDestino = `E:\\Desarrollo\\Node\\StorageSyncVault\\BACK-END\\public\\uploads\\4cfb60b6-f6e5-4ed5-b876-cb26d3f92455\\38d05eea-b474-402a-a0ae-b1dc54b96fe4`;
    console.log(lugarDestino);
    const moviendoDir = await fs.move(lugarActual, lugarDestino, {
      overwrite: true,
    });

    return {
      status: 200,
      message: "recuperarDirectorio",
      data: {
        // moviendoDir,
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
  recuperarDirectorio,
};
