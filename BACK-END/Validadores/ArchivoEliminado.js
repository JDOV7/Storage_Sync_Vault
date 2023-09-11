import { archivoEliminadoServicio } from "../ObjectosEliminados/ObjectosEliminadosServicio.js";
import EntidadNoExisteError from "./Errores/EntidadNoExisteError.js";

const ArchivoEliminado = async (req, res, next) => {
  try {
    const {
      params: { IdObjetos },
    } = req;
    console.log(IdObjetos);
    const ArchivoEliminadoServicioRespuesta = await archivoEliminadoServicio(
      IdObjetos
    );
    console.log(ArchivoEliminadoServicioRespuesta);
    if (
      !ArchivoEliminadoServicioRespuesta ||
      ArchivoEliminadoServicioRespuesta.status != 200
    ) {
      throw new EntidadNoExisteError("Este Archivo no esta eliminado");
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
export default ArchivoEliminado;
