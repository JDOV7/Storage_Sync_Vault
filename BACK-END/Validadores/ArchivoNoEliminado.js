import { ArchivoNoEliminadoServicio } from "../Objetos/ObjectosServicio.js";
import EntidadNoExisteError from "./Errores/EntidadNoExisteError.js";

const ArchivoNoEliminado = async (req, res, next) => {
  try {
    const {
      params: { IdObjetos },
    } = req;
    console.log(IdObjetos);
    const ArchivoNoEliminadoServicioRespuesta =
      await ArchivoNoEliminadoServicio(IdObjetos);
    console.log(ArchivoNoEliminadoServicioRespuesta);
    if (
      !ArchivoNoEliminadoServicioRespuesta ||
      ArchivoNoEliminadoServicioRespuesta.status != 200
    ) {
      throw new EntidadNoExisteError("Este Archivo esta eliminado");
    }
    return next();
  } catch (error) {
    console.log("-------ArchivoNoEliminado------");
    console.log(error);
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
export default ArchivoNoEliminado;
