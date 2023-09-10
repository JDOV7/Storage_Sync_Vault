import { archivoExisteServicio } from "../Objetos/ObjectosServicio.js";
import EntidadNoExisteError from "./Errores/EntidadNoExisteError.js";

const ArchivoExiste = async (req, res, next) => {
  try {
    const {
      params: { IdObjetos },
    } = req;
    const archivoExisteServicioRespuesta = await archivoExisteServicio(
      IdObjetos
    );
    console.log(archivoExisteServicioRespuesta);
    if (
      !archivoExisteServicioRespuesta ||
      archivoExisteServicioRespuesta.status != 200
    ) {
      throw new EntidadNoExisteError("Este Archivo no existe");
    }
    return next();
  } catch (error) {
    console.log("-------ArchivoExiste------");
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

export default ArchivoExiste;
