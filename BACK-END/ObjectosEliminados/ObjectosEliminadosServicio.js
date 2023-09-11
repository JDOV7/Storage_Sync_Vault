import {
  crearObjectosEliminados,
  crearCarpetaEliminada,
  esUnObjectoEliminado,
  restaurarDirectorioDB,
  archivoEliminado,
  recuperarArchivo,
} from "./ObjectosEliminadosDAO.js";

const crearObjectosEliminadosServicio = async (datos = [], transaction) => {
  try {
    const respuesta = await crearObjectosEliminados(datos, transaction);
    return respuesta;
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

const crearCarpetaEliminadaServicio = async (id = "", transaction) => {
  try {
    const respuesta = await crearCarpetaEliminada(id, transaction);
    return respuesta;
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message,
    };
  }
};

const esUnObjectoEliminadoServicio = async (IdObjetos, EsDirectorio) => {
  try {
    const respuesta = await esUnObjectoEliminado(IdObjetos, EsDirectorio);
    return respuesta;
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

const restaurarDirectorioDBServicio = async (IdObjetos, transaction) => {
  try {
    const respuesta = await restaurarDirectorioDB(IdObjetos, transaction);
    return respuesta;
  } catch (error) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

const archivoEliminadoServicio = async (IdObjetos = "") => {
  try {
    const respuesta = await archivoEliminado(IdObjetos);
    return respuesta;
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error en el servidor",
    };
  }
};

const recuperarArchivoServicio = async (IdObjetos = "", IdUsuarios = "") => {
  try {
    const respuesta = await recuperarArchivo(IdObjetos, IdUsuarios);
    return respuesta;
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error en el servidor",
    };
  }
};

export {
  crearObjectosEliminadosServicio,
  crearCarpetaEliminadaServicio,
  esUnObjectoEliminadoServicio,
  restaurarDirectorioDBServicio,
  archivoEliminadoServicio,
  recuperarArchivoServicio,
};
