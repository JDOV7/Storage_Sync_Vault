import { compartirFolderConOtrosUsuariosParaLectura } from "./ObjectosCompartidosDAO.js";

const compartirFolderConOtrosUsuariosParaLecturaServicio = async (
  datos = {}
) => {
  try {
    const respuesta = await compartirFolderConOtrosUsuariosParaLectura(datos);
    return respuesta;
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error en el servidor",
    };
  }
};

export { compartirFolderConOtrosUsuariosParaLecturaServicio };
