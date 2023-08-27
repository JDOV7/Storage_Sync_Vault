import {
  crearObjectosEliminados,
  crearCarpetaEliminada,
  esUnObjectoEliminado,
  restaurarDirectorioDB,
} from "./ObjectosEliminadosDAO.js";

const crearObjectosEliminadosServicio = async (datos = []) => {
  try {
    const respuesta = await crearObjectosEliminados(datos);
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

export {
  crearObjectosEliminadosServicio,
  crearCarpetaEliminadaServicio,
  esUnObjectoEliminadoServicio,
  restaurarDirectorioDBServicio,
};
