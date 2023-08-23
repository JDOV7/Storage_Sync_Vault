import { obtenerDatosPadreServicio } from "../Objetos/ObjectosServicio.js";
const ValidarPerteneceAlUsuario = async (req, res, next) => {
  try {
    const { IdUsuarios } = req.usuario;
    const { Padre } = req.body;
    const padre = await obtenerDatosPadreServicio(Padre);
    if (!padre || padre.IdUsuarios != IdUsuarios) {
      throw new EntidadNoExisteError("No existe el padre");
    }
    req.body.padre = padre;
    return next();
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Error, este archivo no existe",
    });
  }
};
const ValidarPerteneceAlUsuarioM = async (req, res, next) => {
  try {
    const { IdUsuarios } = req.usuario;
    const { padre } = req.headers;
    // console.log(padre);
    const padreR = await obtenerDatosPadreServicio(padre);
    if (!padreR || padreR.IdUsuarios != IdUsuarios) {
      throw new EntidadNoExisteError("No existe el padre");
    }
    req.headers.padre = padreR;
    return next();
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Error, este archivo no existe",
    });
  }
};
export { ValidarPerteneceAlUsuario, ValidarPerteneceAlUsuarioM };
