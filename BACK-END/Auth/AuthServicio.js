import { creandoUsuario } from "./AuthDAO.js";

const creandoUsuarioServicio = async (usuario = {}) => {
  const respuesta = await creandoUsuario(usuario);
  return respuesta;
};

export { creandoUsuarioServicio };
