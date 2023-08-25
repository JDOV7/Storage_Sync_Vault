import { crearObjectosEliminados } from "./ObjectosEliminadosDAO.js";

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

export { crearObjectosEliminadosServicio };
