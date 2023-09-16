import {
  validarCodeGithub,
  obtenerDatosCuentaGithub,
  creandoUsuario,
  confirmarCuenta,
  Login,
} from "./AuthDAO.js";

const validarCodeGithubServicio = async (code = "") => {
  const respuesta = await validarCodeGithub(code);
  return respuesta;
};

const obtenerDatosCuentaGithubServicio = async (access_token = "") => {
  const respuesta = await obtenerDatosCuentaGithub(access_token);
  return respuesta;
};

const creandoUsuarioServicio = async (usuario = {}) => {
  const respuesta = await creandoUsuario(usuario);
  return respuesta;
};

const confirmarCuentaServicio = async (usuario = {}) => {
  const respuesta = await confirmarCuenta(usuario);
  return respuesta;
};

const LoginServicio = async (usuario = {}) => {
  const respuesta = await Login(usuario);
  return respuesta;
};

export {
  validarCodeGithubServicio,
  obtenerDatosCuentaGithubServicio,
  creandoUsuarioServicio,
  confirmarCuentaServicio,
  LoginServicio,
};
