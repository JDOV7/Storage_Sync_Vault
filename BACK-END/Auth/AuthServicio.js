import {
  validarCodeGithub,
  obtenerDatosCuentaGithub,
  existeCuentaRegistradaGitHub,
  crearCuentaGitHub,
  verificarSiLaCuentaEstaConfirmadaGithub,
  loginGithub,
  validarFacebook,
  obtenerDatosCuentaFacebook,
  existeCuentaRegistradaFacebook,
  crearCuentaFacebook,
  verificarSiLaCuentaEstaConfirmadaFacebook,
  loginFacebook,
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

const validarCodeFacebookServicio = async (code = "") => {
  const respuesta = await validarFacebook(code);
  return respuesta;
};

const obtenerDatosCuentaFacebookServicio = async (access_token = "") => {
  const respuesta = await obtenerDatosCuentaFacebook(access_token);
  return respuesta;
};

const existeCuentaRegistradaFacebookServicio = async (
  IdAutorizacion = "",
  Correo = ""
) => {
  const respuesta = await existeCuentaRegistradaFacebook(
    IdAutorizacion,
    Correo
  );
  return respuesta;
};

const crearCuentaFacebookServicio = async (datos = {}) => {
  const respuesta = await crearCuentaFacebook(datos);
  return respuesta;
};

const verificarSiLaCuentaEstaConfirmadaFacebookServicio = async (
  IdAutorizacion = ""
) => {
  const respuesta = await verificarSiLaCuentaEstaConfirmadaFacebook(
    IdAutorizacion
  );
  return respuesta;
};

const loginFacebookServicio = async (IdAutorizacion = "") => {
  const respuesta = await loginFacebook(IdAutorizacion);
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
  validarCodeFacebookServicio,
  obtenerDatosCuentaFacebookServicio,
  existeCuentaRegistradaFacebookServicio,
  crearCuentaFacebookServicio,
  verificarSiLaCuentaEstaConfirmadaFacebookServicio,
  loginFacebookServicio,
  creandoUsuarioServicio,
  confirmarCuentaServicio,
  LoginServicio,
};
