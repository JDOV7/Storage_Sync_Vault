import {
  validarCodeGithub,
  obtenerDatosCuentaGithub,
  existeCuentaRegistradaGitHub,
  crearCuentaGitHub,
  loginGithub,
  creandoUsuario,
  confirmarCuenta,
  verificarSiLaCuentaEstaConfirmadaGithub,
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

const existeCuentaRegistradaGitHubServicio = async (
  IdAutorizacion = "",
  Correo = ""
) => {
  const respuesta = await existeCuentaRegistradaGitHub(IdAutorizacion, Correo);
  return respuesta;
};

const crearCuentaGitHubServicio = async (datos = {}) => {
  const respuesta = await crearCuentaGitHub(datos);
  return respuesta;
};

const verificarSiLaCuentaEstaConfirmadaGithubServicio = async (
  IdAutorizacion = ""
) => {
  const respuesta = await verificarSiLaCuentaEstaConfirmadaGithub(
    IdAutorizacion
  );
  return respuesta;
};

const loginGithubServicio = async (IdAutorizacion = "") => {
  const respuesta = await loginGithub(IdAutorizacion);
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
  existeCuentaRegistradaGitHubServicio,
  crearCuentaGitHubServicio,
  verificarSiLaCuentaEstaConfirmadaGithubServicio,
  loginGithubServicio,
  creandoUsuarioServicio,
  confirmarCuentaServicio,
  LoginServicio,
};
