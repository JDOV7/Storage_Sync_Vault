import { Op } from "sequelize";
import {
  mkdir,
  rmdir,
  rm,
  chmod,
  cp,
  readdir,
  unlink,
  lstat,
  stat,
} from "node:fs/promises";
import {
  rmSync,
  rmdirSync,
  existsSync,
  lstatSync,
  readdirSync,
  unlinkSync,
  statSync,
  cpSync,
} from "node:fs";
import path from "path";
import { fileURLToPath } from "url";
import { removeSync, moveSync } from "fs-extra/esm";

import db from "../Config/db.js";
import { Objetos } from "../Models/index.js";
import {
  crearObjectosEliminadosServicio,
  crearCarpetaEliminadaServicio,
  restaurarDirectorioDBServicio,
} from "../ObjectosEliminados/ObjectosEliminadosServicio.js";
import EntidadNoExisteError from "../Validadores/Errores/EntidadNoExisteError.js";
import EntidadNoCreadaError from "../Validadores/Errores/EntidadNoCreadaError.js";
import OperacionUsuarioNoValidaError from "../Validadores/Errores/OperacionUsuarioNoValidaError.js";

import { moverDir } from "../Helpers/FileSystem.js";

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
    return {
      status: 200,
      message: "Directorio creado correctamente",
      data: {
        IdObjetos: directorio.IdObjetos,
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
    const { IdUsuario, IdCajaFuertes, IdEliminado } = datos;
    const cajaFuerte = new URL(
      `../public/uploads/${IdUsuario}/${IdCajaFuertes}/`,
      import.meta.url
    );
    const crearCajaFuerte = await mkdir(cajaFuerte, { recursive: true });
    const cambiarPermisosCajaFuerte = await chmod(cajaFuerte, 0o777);

    const dirEliminado = new URL(
      `../public/uploads/${IdUsuario}/${IdEliminado}/`,
      import.meta.url
    );
    const crearDirEliminado = await mkdir(dirEliminado, { recursive: true });
    const cambiarPermisosDirEliminado = await chmod(dirEliminado, 0o777);
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

const obtenerCarpetaDestinoEliminados = async (IdUsuarios = "") => {
  try {
    const carpetaEliminados = await Objetos.findOne({
      where: {
        [Op.and]: [
          {
            IdUsuarios,
          },
          { UbicacionVista: `/root/Eliminados-${IdUsuarios}` },
        ],
      },
    });
    return {
      UbicacionLogica: carpetaEliminados.UbicacionLogica,
      UbicacionVista: carpetaEliminados.UbicacionVista,
    };
  } catch (error) {
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
      attributes: ["IdObjetos", "UbicacionLogica"],
    });
    if (!todosLosObjetos) {
      throw new EntidadNoCreadaError("No se pudo eliminar la carpeta");
    }
    const buscarCarpetaUbicacionEliminados =
      await obtenerCarpetaDestinoEliminados(IdUsuarios);
    if (!buscarCarpetaUbicacionEliminados) {
      throw new EntidadNoExisteError("No se pudo eliminar la carpeta");
    }
    const lugarActual = `${__dirname}../../public/uploads${todosLosObjetos.UbicacionLogica}`;
    const lugarDestino = `${__dirname}../../public/uploads${buscarCarpetaUbicacionEliminados.UbicacionLogica}/${IdObjetos}`;

    const descendencia = await obtenerDesendenciaFolder(IdObjetos, false);
    // console.log(descendencia);
    console.log("---------------------MUEVO EL DIR----------------------");

    for (
      let index = 0;
      index < descendencia.data.descendencia.length;
      index++
    ) {
      const objecto = await descendencia.data.descendencia[index];
      const moverObjectoBDUno = await moverObjectoBD(
        objecto,
        transaction,
        IdObjetos,
        buscarCarpetaUbicacionEliminados.UbicacionLogica,
        buscarCarpetaUbicacionEliminados.UbicacionVista
      );
      if (moverObjectoBDUno.status != 200) {
        throw new EntidadNoExisteError("");
      }
    }
    console.log(
      "---------------------ACT las ubciaciones----------------------"
    );
    // console.log(obtenerCarpetaDestinoEliminados);
    // throw new Error();

    const respuestaEliminarCarpeta = await crearCarpetaEliminadaServicio(
      todosLosObjetos.IdObjetos,
      transaction
    );
    if (respuestaEliminarCarpeta.status != 200) {
      throw new EntidadNoCreadaError("No se pudo eliminar la carpeta");
    }
    console.log(
      "---------------------crearCarpetaEliminadaServicio----------------------"
    );
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
    const moviendoDir = await cp(lugarActual, lugarDestino, {
      recursive: true,
      force: true,
    });
    await removeSync(lugarActual);

    await transaction.commit();
    // await transaction.rollback();

    return {
      status: 200,
      message: "Carpeta Eliminada Correctamente",
      // datos: { ...datos, todosLosObjetos, resEliminarReal },
      // datos: { ...datos, eliminarObjectos },
      // datos: { ...datos, todosLosObjetos, respuestaEliminarObjectos },
    };
  } catch (error) {
    console.log(error);
    let status = 500;
    let message = "Error en el servidor";
    if (error instanceof EntidadNoExisteError) {
      status = 404;
      message = error.message;
    } else if (error instanceof EntidadNoCreadaError) {
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

const eliminandoDirectoriosReal = async (ubicacion = "") => {
  try {
    console.log(
      "------------------eliminandoDirectoriosReal-------------------"
    );

    const ubicacionGlobal = `${__dirname}../../public/uploads${ubicacion}`;
    console.log(ubicacionGlobal);
    try {
      await removeSync(ubicacionGlobal);
      // await rm(ubicacionGlobal, { recursive: true, force: true });
      // await rm(ubicacionGlobal, { recursive: true, force: true });
      // const eliminarDir = await rmSync(ubicacionGlobal, {
      //   force: true,
      //   recursive: true,
      //   // maxRetries: 5,
      //   // retryDelay: 200,
      // });
      // await rm(`${__dirname}../../public/uploads${ubicacion}`, {
      //   force: true,
      //   recursive: true,
      //   maxRetries: 5,
      //   retryDelay: 200,
      // });
    } catch (error) {
      console.log(error);
    }
    // await rm(`${__dirname}../../public/uploads${ubicacion}`, {
    //   force: true,
    //   recursive: true,
    //   maxRetries: 5,
    //   retryDelay: 200,
    // });
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

const deleteFolderRecursive = function (path) {
  if (existsSync(path)) {
    const files = readdirSync(path);

    if (files.length > 0) {
      files.forEach(function (filename) {
        if (statSync(path + "/" + filename).isDirectory()) {
          deleteFolderRecursive(path + "/" + filename);
        } else {
          unlinkSync(path + "/" + filename);
        }
      });
    } else {
      console.log("No files found in the directory.");
    }
  } else {
    console.log("Directory path not found.");
  }
};

const recuperarDirectorio = async (datos = {}) => {
  let transaction = await db.transaction();
  try {
    const {
      infoObjecto: { UbicacionLogica, IdUsuarios, IdObjetos, UbicacionVista },
    } = datos;

    const descendencia = await obtenerDesendenciaFolder(IdObjetos, true);
    const lugarActual = `${__dirname}../../public/uploads${UbicacionLogica}`;
    const lugarDestino = `${__dirname}../../public/uploads/${IdUsuarios}/${IdObjetos}`;
    // console.log(descendencia);

    const buscarCarpetaUbicacionEliminados =
      await obtenerCarpetaDestinoEliminados(IdUsuarios);
    if (!buscarCarpetaUbicacionEliminados) {
      throw new EntidadNoExisteError("No se pudo eliminar la carpeta");
    }

    // TODO: LLEGA hasta aqui, checar si funcionan bien UbicacionVista, UbicacionLogica
    for (const obje of descendencia.data.descendencia) {
      const moverObjectoBDUno = await moverObjectoBD(
        obje,
        transaction,
        IdObjetos,
        `/${IdUsuarios}`,
        `/root`
      );
      if (moverObjectoBDUno.status != 200) {
        throw new EntidadNoExisteError("No se pudo restaurar el directorio");
      }
    }

    const cambiarEstadoObjectoAExiste = await Objetos.update(
      { EstaEliminado: false },
      {
        where: {
          [Op.and]: [
            {
              UbicacionLogica: {
                [Op.like]: `%${IdObjetos}%`,
              },
            },
            { IdUsuarios },
            { EstaEliminado: true },
          ],
        },
        transaction,
      }
    );

    if (!cambiarEstadoObjectoAExiste) {
      throw new EntidadNoExisteError("No se pudo restaurar el directorio");
    }

    const cambiarPadreAlDirectorioEliminado = await Objetos.update(
      {
        Padre: IdUsuarios,
      },
      {
        where: {
          IdObjetos,
        },
        transaction,
      }
    );
    if (!cambiarPadreAlDirectorioEliminado) {
      throw new EntidadNoExisteError("No se pudo restaurar el directorio");
    }

    const resDirDbEliminada = await restaurarDirectorioDBServicio(
      IdObjetos,
      transaction
    );
    if (resDirDbEliminada.status != 200) {
      throw new EntidadNoExisteError("No se pudo restaurar el directorio");
    }

    const moviendoDir = await cp(lugarActual, lugarDestino, {
      recursive: true,
      force: true,
    });
    await removeSync(lugarActual);

    await transaction.commit();
    return {
      status: 200,
      message: "Directorio recuperado",
      data: {
        // datos,
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
    } else {
      await transaction.rollback();
    }
    return {
      status,
      message,
    };
  }
};

const obtenerDesendenciaFolder = async (IdObjetos = "", EstaEliminado) => {
  try {
    const descendencia = await Objetos.findAll({
      where: {
        [Op.and]: [
          {
            UbicacionLogica: {
              [Op.like]: `%${IdObjetos}%`,
            },
          },
          {
            EstaEliminado,
          },
        ],
      },
    });
    // console.log(descendencia);
    if (!descendencia) {
      throw new EntidadNoExisteError("No existen registros");
    }

    return {
      status: 200,
      data: {
        descendencia,
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

const moverObjectoBD = async (
  Objecto = {},
  transaction,
  padre,
  nuevoPadreLogico,
  nuevoPadreVista
) => {
  if (!transaction) {
    transaction = await db.transaction();
  }
  try {
    let { IdObjetos, NombreVista, UbicacionLogica, UbicacionVista, Padre } =
      Objecto;

    let separadorUbicacionLogica = UbicacionLogica.split("/");
    separadorUbicacionLogica = separadorUbicacionLogica.filter(
      (dato, index) => index != 0
    );
    const indexID = separadorUbicacionLogica.indexOf(padre ? padre : IdObjetos);
    separadorUbicacionLogica = separadorUbicacionLogica.filter(
      (dato, index) => index >= indexID
    );
    let separadorUbicacionVista = UbicacionVista.split("/");
    separadorUbicacionVista = separadorUbicacionVista.filter(
      (dato, index) => index != 0
    );
    separadorUbicacionVista = separadorUbicacionVista.filter(
      (dato, index) => index >= indexID
    );
    UbicacionLogica =
      nuevoPadreLogico +
      separadorUbicacionLogica.reduce(
        (accumulator, currentValue) => accumulator + "/" + currentValue,
        ""
      );
    UbicacionVista =
      nuevoPadreVista +
      separadorUbicacionVista.reduce(
        (accumulator, currentValue) => accumulator + "/" + currentValue,
        ""
      );
    console.log(UbicacionLogica);
    console.log(UbicacionVista);
    console.log(padre == IdObjetos ? nuevoPadreLogico.split("/")[2] : Padre);
    // return {
    //   status: 200,
    //   // objectoDB,
    //   indexID,
    //   UbicacionLogica,
    //   separadorUbicacionLogica,
    //   UbicacionVista,
    //   separadorUbicacionVista,
    //   Padre: padre == IdObjetos ? nuevoPadreLogico.split("/")[2] : Padre,
    // };
    console.log("--------------------ANTES DEL act ubicaciones---------------");
    const objectoDB = await Objetos.update(
      {
        UbicacionLogica,
        UbicacionVista,
        Padre: padre == IdObjetos ? nuevoPadreLogico.split("/")[2] : Padre,
      },
      {
        where: {
          IdObjetos,
        },
        transaction,
      }
    );
    console.log(objectoDB);
    // await transaction.commit();
    return {
      status: 200,
      objectoDB,
    };
  } catch (error) {
    await transaction.rollback();
    console.log(error);
    let status = 500;
    let message = "Error en el servidor eliminandoDirectoriosReal";
    // if (error.code === "ENOTEMPTY") {
    //   await eliminandoDirectoriosReal(ubicacion);
    // }
    // if (error instanceof EntidadNoExisteError) {
    //   status = 404;
    //   message = error.message;
    // }
    return {
      status,
      message,
    };
  }
};

const moverFolder = async (datos = {}) => {
  const transaction = await db.transaction();
  try {
    const {
      Objecto: { datos: datosO },
      Padre: { datos: datosP },
    } = datos;

    const descendenciaObjecto = await obtenerDesendenciaFolder(
      datosO.IdObjetos,
      false
    );

    if (!descendenciaObjecto) {
      throw new EntidadNoExisteError("No existe este directorio");
    }
    console.log("-----------Antes de act la bd----------------");

    const elDirectorioDestinoEsSuHijo = await Objetos.findOne({
      where: {
        [Op.and]: [
          {
            UbicacionLogica: {
              [Op.like]: `%${datosO.IdObjetos}%`,
            },
          },
          {
            UbicacionLogica: {
              [Op.like]: `%${datosP.Padre}`,
            },
          },
        ],
      },
    });

    if (elDirectorioDestinoEsSuHijo) {
      throw new OperacionUsuarioNoValidaError(
        "El directorio destino es subcarpeta del origen "
      );
    }

    for (const obje of descendenciaObjecto.data.descendencia) {
      const moverObjectoBDUno = await moverObjectoBD(
        obje,
        transaction,
        datosO.IdObjetos,
        `${datosP.UbicacionLogica}`,
        `${datosP.UbicacionVista}`
      );
      if (moverObjectoBDUno.status != 200) {
        throw new EntidadNoCreadaError("No se pudo restaurar el directorio");
      }
    }

    const nuevoPadreCarpetaOrigen = await Objetos.update(
      {
        Padre: datosP.Padre,
      },
      {
        where: {
          IdObjetos: datosO.IdObjetos,
        },
        transaction,
      }
    );

    const lugarActual = `${__dirname}../../public/uploads${datosO.UbicacionLogica}/`;
    const lugarDestino = `${__dirname}../../public/uploads${datosP.UbicacionLogica}/${datosO.IdObjetos}`;
    console.log(lugarActual);
    console.log(lugarDestino);

    const moviendoDir = await cp(lugarActual, lugarDestino, {
      recursive: true,
      force: true,
    });
    await removeSync(lugarActual);

    await transaction.commit();
    return {
      status: 200,
      message: "moverFolder",
      data: {
        datosO,
        descendenciaObjecto,
        datosP,
      },
    };
  } catch (error) {
    console.log(error);
    let status = 500,
      message = "Error en el servidor";

    if (!(error instanceof EntidadNoCreadaError)) {
      await transaction.rollback();
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
    };
  }
};

const obtenerInformacionArchivo = async (IdObjetos = "") => {
  try {
    const archivo = await Objetos.findByPk(IdObjetos, {
      attributes: [
        "NombreVista",
        "UbicacionVista",
        "UbicacionLogica",
        "PesoMB",
        "Mime",
        "FechaCreacion",
        "FechaActualizacion",
      ],
    });

    return {
      status: 200,
      message: "Archivo ",
      data: { archivo },
    };
  } catch (error) {
    console.log(error);
    let status = 500,
      message = "Error en el servidor";

    if (!(error instanceof EntidadNoCreadaError)) {
      await transaction.rollback();
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

const archivoExiste = async (IdObjetos = "") => {
  try {
    const archivo = await Objetos.findByPk(IdObjetos);
    if (!archivo) {
      throw new EntidadNoExisteError("El archivo no existe");
    }

    if (archivo.EsDirectorio) {
      throw new EntidadNoExisteError("El archivo no existe");
    }

    return { status: 200, message: "Archivo", data: { archivo } };
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

const eliminarArchivo = async (datos = "") => {
  return {
    status: 200,
    message: "eliminarArchivo",
    data: { datos },
  };
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
      attributes: ["IdObjetos", "UbicacionLogica"],
    });
    if (!todosLosObjetos) {
      throw new EntidadNoCreadaError("No se pudo eliminar la carpeta");
    }
    const buscarCarpetaUbicacionEliminados =
      await obtenerCarpetaDestinoEliminados(IdUsuarios);
    if (!buscarCarpetaUbicacionEliminados) {
      throw new EntidadNoExisteError("No se pudo eliminar la carpeta");
    }
    const lugarActual = `${__dirname}../../public/uploads${todosLosObjetos.UbicacionLogica}`;
    const lugarDestino = `${__dirname}../../public/uploads${buscarCarpetaUbicacionEliminados.UbicacionLogica}/${IdObjetos}`;

    const descendencia = await obtenerDesendenciaFolder(IdObjetos, false);
    // console.log(descendencia);
    console.log("---------------------MUEVO EL DIR----------------------");

    for (
      let index = 0;
      index < descendencia.data.descendencia.length;
      index++
    ) {
      const objecto = await descendencia.data.descendencia[index];
      const moverObjectoBDUno = await moverObjectoBD(
        objecto,
        transaction,
        IdObjetos,
        buscarCarpetaUbicacionEliminados.UbicacionLogica,
        buscarCarpetaUbicacionEliminados.UbicacionVista
      );
      if (moverObjectoBDUno.status != 200) {
        throw new EntidadNoExisteError("");
      }
    }
    console.log(
      "---------------------ACT las ubciaciones----------------------"
    );
    // console.log(obtenerCarpetaDestinoEliminados);
    // throw new Error();

    const respuestaEliminarCarpeta = await crearCarpetaEliminadaServicio(
      todosLosObjetos.IdObjetos,
      transaction
    );
    if (respuestaEliminarCarpeta.status != 200) {
      throw new EntidadNoCreadaError("No se pudo eliminar la carpeta");
    }
    console.log(
      "---------------------crearCarpetaEliminadaServicio----------------------"
    );
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
    const moviendoDir = await cp(lugarActual, lugarDestino, {
      recursive: true,
      force: true,
    });
    await removeSync(lugarActual);

    await transaction.commit();
    // await transaction.rollback();

    return {
      status: 200,
      message: "Carpeta Eliminada Correctamente",
      // datos: { ...datos, todosLosObjetos, resEliminarReal },
      // datos: { ...datos, eliminarObjectos },
      // datos: { ...datos, todosLosObjetos, respuestaEliminarObjectos },
    };
  } catch (error) {
    console.log(error);
    let status = 500;
    let message = "Error en el servidor";
    if (error instanceof EntidadNoExisteError) {
      status = 404;
      message = error.message;
    } else if (error instanceof EntidadNoCreadaError) {
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

const archivoPerteneceAlUsuario = async (IdObjetos = "", IdUsuarios = "") => {
  try {
    const archivo = await Objetos.findByPk(IdObjetos);
    if (!archivo) {
      throw new EntidadNoExisteError("El archivo no existe");
    }
    if (archivo.EsDirectorio) {
      throw new EntidadNoExisteError("No es un archivo");
    }
    if (archivo.IdUsuarios !== IdUsuarios) {
      throw new EntidadNoExisteError("El archivo no pertenece al usuario");
    }
    return { status: 200, message: "Archivo pertenece", data: { archivo } };
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

const ArchivoNoEliminado = async (IdObjetos = "") => {
  try {
    const archivo = await Objetos.findByPk(IdObjetos);
    if (!archivo) {
      throw new EntidadNoExisteError("El archivo no existe");
    }
    if (archivo.EstaEliminado) {
      throw new EntidadNoExisteError("El archivo esta eliminado");
    }
    return { status: 200, message: "Archivo existe", data: { archivo } };
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

export {
  subiendoArchivos,
  crearDirectorioRaiz,
  crearDirectorio,
  obtenerDatosPadre,
  crearDirectorioReal,
  obtenerElementosDirectorio,
  eliminarDirectorio,
  recuperarDirectorio,
  obtenerDesendenciaFolder,
  moverObjectoBD,
  moverFolder,
  obtenerInformacionArchivo,
  eliminarArchivo,
  archivoExiste,
  archivoPerteneceAlUsuario,
  ArchivoNoEliminado,
};
