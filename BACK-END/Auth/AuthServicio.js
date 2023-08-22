import { creandoUsuario, confirmarCuenta, Login } from "./AuthDAO.js";

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

export { creandoUsuarioServicio, confirmarCuentaServicio, LoginServicio };
