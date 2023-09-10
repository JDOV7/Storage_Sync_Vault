import {
  subiendoArchivos,
  crearDirectorio,
  obtenerDatosPadre,
  crearDirectorioReal,
  obtenerElementosDirectorio,
  eliminarDirectorio,
  recuperarDirectorio,
  moverFolder,
  obtenerInformacionArchivo,
  eliminarArchivo,
  archivoExiste,
  archivoPerteneceAlUsuario,
  ArchivoNoEliminado,
} from "./ObjectosDAO.js";

const subiendoArchivosServicio = async (datos = {}) => {
  const respuesta = await subiendoArchivos(datos);
  return respuesta;
};

const crearDirectorioServicio = async (datos = {}, transaction) => {
  const respuesta = await crearDirectorio(datos, transaction);
  return respuesta;
};

const obtenerDatosPadreServicio = async (IdObjetos, EstaEliminado) => {
  const respuesta = await obtenerDatosPadre(IdObjetos, EstaEliminado);
  return respuesta;
};

const crearDirectorioRealServicio = async (ubicacion) => {
  const respuesta = await crearDirectorioReal(ubicacion);
  return respuesta;
};

const obtenerElementosDirectorioServicio = async (datos = {}) => {
  const respuesta = await obtenerElementosDirectorio(datos);
  return respuesta;
};

const eliminarDirectorioServicio = async (datos = {}) => {
  try {
    const respuesta = await eliminarDirectorio(datos);
    return respuesta;
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error en el servidor",
    };
  }
};

const recuperarDirectorioServicio = async (datos = {}) => {
  const respuesta = await recuperarDirectorio(datos);
  return respuesta;
};

const moverFolderServicio = async (datos = {}) => {
  try {
    const respuesta = await moverFolder(datos);
    return respuesta;
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error en el servidor",
    };
  }
};

const obtenerInformacionArchivoServicio = async (IdObjetos = "") => {
  try {
    const respuesta = await obtenerInformacionArchivo(IdObjetos);
    return respuesta;
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error en el servidor",
    };
  }
};

const eliminarArchivoServicio = async (IdObjetos = "") => {
  try {
    const respuesta = await eliminarArchivo(IdObjetos);
    return respuesta;
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error en el servidor",
    };
  }
};

const archivoExisteServicio = async (IdObjetos = "") => {
  try {
    const respuesta = await archivoExiste(IdObjetos);
    return respuesta;
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error en el servidor",
    };
  }
};

const archivoPerteneceAlUsuarioServicio = async (
  IdObjetos = "",
  IdUsuarios = ""
) => {
  try {
    const respuesta = await archivoPerteneceAlUsuario(IdObjetos, IdUsuarios);
    return respuesta;
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error en el servidor",
    };
  }
};

const ArchivoNoEliminadoServicio = async (IdObjetos = "") => {
  try {
    const respuesta = await ArchivoNoEliminado(IdObjetos);
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
  subiendoArchivosServicio,
  crearDirectorioServicio,
  obtenerDatosPadreServicio,
  crearDirectorioRealServicio,
  obtenerElementosDirectorioServicio,
  eliminarDirectorioServicio,
  recuperarDirectorioServicio,
  moverFolderServicio,
  obtenerInformacionArchivoServicio,
  eliminarArchivoServicio,
  archivoExisteServicio,
  archivoPerteneceAlUsuarioServicio,
  ArchivoNoEliminadoServicio,
};
