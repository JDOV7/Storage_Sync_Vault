import { folderNoEliminadoServicio } from "../Objetos/ObjectosServicio.js";
import EntidadNoExisteError from "./Errores/EntidadNoExisteError.js";

const PadreFolderNoEliminado = async (req, res, next) => {
  try {
    const {
      body: { Padre },
    } = req;
    const folderNoEliminadoServicioRespuesta = await folderNoEliminadoServicio(
      Padre
    );
    console.log("------PadreFolderNoEliminado mid---------");
    console.log(folderNoEliminadoServicioRespuesta);
    if (
      !folderNoEliminadoServicioRespuesta ||
      folderNoEliminadoServicioRespuesta.status != 200
    ) {
      throw new EntidadNoExisteError("El folder no existe");
    }
    return next();
  } catch (error) {
    console.log(error);
    console.log("-------PadreFolderNoEliminado------");
    let status = 500,
      message = "Error en el servidor";
    if (error instanceof EntidadNoExisteError) {
      status = 400;
      message = error.message;
    }
    return res.status(status).json({
      status,
      message,
      data: {},
    });
  }
};

export default PadreFolderNoEliminado;
