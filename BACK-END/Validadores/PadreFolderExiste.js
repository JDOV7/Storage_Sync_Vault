import { existeFolderServicio } from "../Objetos/ObjectosServicio.js";
import EntidadNoExisteError from "./Errores/EntidadNoExisteError.js";

const PadreFolderExiste = async (req, res, next) => {
  try {
    const {
      body: { Padre },
    } = req;
    const existeFolderServicioRespuesta = await existeFolderServicio(Padre);
    console.log("------PadreFolderExiste mid---------");
    console.log(existeFolderServicioRespuesta);
    if (
      !existeFolderServicioRespuesta ||
      existeFolderServicioRespuesta.status != 200
    ) {
      throw new EntidadNoExisteError("El folder no existe");
    }
    return next();
  } catch (error) {
    console.log(error);
    console.log("-------PadreFolderExiste------");
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
export default PadreFolderExiste;
