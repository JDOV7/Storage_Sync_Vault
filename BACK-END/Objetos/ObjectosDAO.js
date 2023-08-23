import { Op } from "sequelize";
import { mkdir } from "node:fs/promises";
import db from "../Config/db.js";
import { Objetos } from "../Models/index.js";
import EntidadNoExisteError from "../Validadores/Errores/EntidadNoExisteError.js";

const subiendoArchivos = async (datos = {}) => {
  return {
    status: 200,
    message: "creandoNuevoObjecto",
    data: {
      usuario: datos.usuario,
      body: datos.body,
      files: datos.files,
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
  const padre = await Objetos.findByPk(IdObjetos);
  const datos = {
    UbicacionVista: padre.UbicacionVista,
    UbicacionLogica: padre.UbicacionLogica,
    IdUsuarios: padre.IdUsuarios,
  };
  return datos;
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
          { EsDirectorio: true },
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
      status = 400;
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
};
