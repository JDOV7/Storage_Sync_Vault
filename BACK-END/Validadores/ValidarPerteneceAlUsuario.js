import { obtenerDatosPadreServicio } from "../Objetos/ObjectosServicio.js";
import { esUnObjectoEliminadoServicio } from "../ObjectosEliminados/ObjectosEliminadosServicio.js";
import EntidadNoExisteError from "./Errores/EntidadNoExisteError.js";
const ValidarPerteneceAlUsuario = async (req, res, next) => {
  try {
    console.log("ValidarPerteneceAlUsuario");
    console.log(req.body);
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
    const padre = await obtenerDatosPadreServicio(Padre, false);
    if (!padre || padre.datos?.IdUsuarios != IdUsuarios) {
      console.log("---------------------No existe---------------");
      throw new EntidadNoExisteError("Este directorio no existe");
    }
    console.log(padre);
    if (Padre && req.headers?.padre) {
      console.log("-------------header----------------");
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

const ValidarAunPerteneceAlUsuario = async (req, res, next) => {
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
    const padre = await obtenerDatosPadreServicio(Padre, true);
    if (!padre || padre.datos?.IdUsuarios != IdUsuarios) {
      console.log("---------------------No existe---------------");
      throw new EntidadNoExisteError("Este directorio no existe");
    }
    console.log(padre);
    if (Padre && req.headers?.padre) {
      console.log("-------------header----------------");
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

const validarEsElDirectorioPrincipalEliminado = async (req, res, next) => {
  const { IdObjetos } = req.params;
  try {
    const validar = await esUnObjectoEliminadoServicio(IdObjetos, true);
    if (validar.status != 200) {
      throw new EntidadNoExisteError("No existe el directorio");
    }
    req.body.inforDir = validar.data.objecto;
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

const ValidarPerteneceAlUsuarioParams = async (req, res, next) => {
  try {
    console.log("ValidarPerteneceAlUsuario");
    const { IdUsuarios } = req.usuario;
    let directorio = undefined;
    if (!directorio && req.params?.IdObjetos) {
      directorio = req.params.IdObjetos;
    }
    console.log(directorio);
    // const { Padre } = req.body;
    const padre = await obtenerDatosPadreServicio(directorio, false);
    if (!padre || padre.datos?.IdUsuarios != IdUsuarios) {
      console.log("---------------------No existe---------------");
      throw new EntidadNoExisteError("Este directorio no existe");
    }
    console.log(padre);
    req.body.paramsObjecto = padre;
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
export {
  ValidarPerteneceAlUsuario,
  ValidarAunPerteneceAlUsuario,
  validarEsElDirectorioPrincipalEliminado,
  ValidarPerteneceAlUsuarioHeader,
  ValidarPerteneceAlUsuarioParams,
};
