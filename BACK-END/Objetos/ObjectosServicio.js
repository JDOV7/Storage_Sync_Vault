import {
  subiendoArchivos,
  crearDirectorio,
  obtenerDatosPadre,
  crearDirectorioReal,
  obtenerElementosDirectorio,
  eliminarDirectorio,
} from "./ObjectosDAO.js";

const subiendoArchivosServicio = async (datos = {}) => {
  const respuesta = await subiendoArchivos(datos);
  return respuesta;
};

const crearDirectorioServicio = async (datos = {}) => {
  const respuesta = await crearDirectorio(datos);
  return respuesta;
};

const obtenerDatosPadreServicio = async (IdObjetos) => {
  const respuesta = await obtenerDatosPadre(IdObjetos);
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
  const respuesta = await eliminarDirectorio(datos);
  return respuesta;
};

export {
  subiendoArchivosServicio,
  crearDirectorioServicio,
  obtenerDatosPadreServicio,
  crearDirectorioRealServicio,
  obtenerElementosDirectorioServicio,
  eliminarDirectorioServicio,
};
