import { obtenerDatosCuentaFacebookServicio } from "../Auth/AuthServicio.js";
import OperacionUsuarioNoValidaError from "./Errores/OperacionUsuarioNoValidaError.js";
const ObtenerDatosCuentaFacebook = async (req, res, next) => {
  try {
    const {
      body: { access_token },
    } = req;
    // console.log(access_token);
    // return next();
    const respuesta = await obtenerDatosCuentaFacebookServicio(access_token);
    if (!respuesta || respuesta?.status != 200) {
      throw new OperacionUsuarioNoValidaError(
        "No se pudo crear la cuenta con Facebook"
      );
    }
    req.body.perfil = respuesta.data.perfil;
    // console.log(respuesta);
    return next();
  } catch (error) {
    console.log(error);
    let status = 500,
      message = "Error en el servidor ObtenerDatosCuentaFacebook M";

    if (error instanceof OperacionUsuarioNoValidaError) {
      status = 500;
      message = error.message;
    }

    return res.status(status).json({
      status,
      message,
    });
  }
};
export default ObtenerDatosCuentaFacebook;
