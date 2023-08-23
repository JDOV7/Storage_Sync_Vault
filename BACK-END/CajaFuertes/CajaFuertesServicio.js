import { crearCajaFuerte } from "./CajaFuertesDAO.js";

const crearCajaFuerteServicio = async (IdUsuario = "") => {
  const respuesta = await crearCajaFuerte(IdUsuario);
  return respuesta;
};

export { crearCajaFuerteServicio };
