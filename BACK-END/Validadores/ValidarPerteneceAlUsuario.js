import { obtenerDatosPadreServicio } from "../Objetos/ObjectosServicio.js";
import EntidadNoExisteError from "./Errores/EntidadNoExisteError.js";
const ValidarPerteneceAlUsuario = async (req, res, next) => {
  try {
    console.log("ValidarPerteneceAlUsuario");
    const { IdUsuarios } = req.usuario;
    let Padre = undefined;
    if (!Padre && req.body?.Padre) {
      Padre = req.body.Padre;
    }
    if (!Padre && req.headers?.padre) {
      console.log("------------------Subiendo archivo------------------");
      Padre = req.headers.padre;
    }
    if (!Padre && req.params?.IdObjetos) {
      Padre = req.params.IdObjetos;
    }
    console.log(Padre);
    // const { Padre } = req.body;
    const padre = await obtenerDatosPadreServicio(Padre);
    if (!padre || padre.datos?.IdUsuarios != IdUsuarios) {
      console.log("---------------------No existe---------------");
      throw new EntidadNoExisteError("Este directorio no existe");
    }
    console.log(padre); 
    if (Padre && req.headers?.padre) {
      console.log('-------------header----------------');
      req.headers.padre = padre;
    } else {
      req.body.padre = padre;
    }
    return next();
  } catch (error) {
    console.log(error);
    let status = 500;
    let message = "Error en el servidor";
    if (error instanceof EntidadNoExisteError) {
      status = 404;
      message = error.message;
    }
    return res.status(status).json({
      status,
      message,
    });
  }
};
const ValidarPerteneceAlUsuarioHeader = async (req, res, next) => {
  try {
    const { IdUsuarios } = req.usuario;
    const { padre } = req.headers;
    console.log(padre);
    const padreR = await obtenerDatosPadreServicio(padre);
    console.log(padreR);
    if (!padreR || padreR.IdUsuarios != IdUsuarios) {
      throw new EntidadNoExisteError("No existe el padre");
    }
    req.headers.padre = padreR;
    return next();
  } catch (error) {
    console.log(error);
    let status = 500;
    let message = "Error en el servidor";
    if (error instanceof EntidadNoExisteError) {
      status = 404;
      message = error.message;
    }
    return res.status(status).json({
      status,
      message,
    });
  }
};
export { ValidarPerteneceAlUsuario, ValidarPerteneceAlUsuarioHeader };
