import {
  subiendoArchivos,
  crearDirectorio,
  obtenerDatosPadre,
  crearDirectorioReal,
  obtenerElementosDirectorio,
  eliminarDirectorio,
  recuperarDirectorio,
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
  const respuesta = await eliminarDirectorio(datos);
  return respuesta;
};

const recuperarDirectorioServicio = async (datos = {}) => {
  const respuesta = await recuperarDirectorio(datos);
  return respuesta;
};

export {
  subiendoArchivosServicio,
  crearDirectorioServicio,
  obtenerDatosPadreServicio,
  crearDirectorioRealServicio,
  obtenerElementosDirectorioServicio,
  eliminarDirectorioServicio,
  recuperarDirectorioServicio,
};
