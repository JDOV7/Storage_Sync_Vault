import { obtenerDatosCuentaGithubServicio } from "../Auth/AuthServicio.js";
import OperacionUsuarioNoValidaError from "./Errores/OperacionUsuarioNoValidaError.js";

const ObtenerDatosCuentaGitHub = async (req, res, next) => {
  try {
    const {
      body: { access_token },
    } = req;
    // console.log(access_token);
    // return next();
    console.log(
      "------------------------ObtenerDatosCuentaGitHub--------------------"
    );
    const respuesta = await obtenerDatosCuentaGithubServicio(access_token);
    if (!respuesta || respuesta?.status != 200) {
      throw new OperacionUsuarioNoValidaError(
        "No se pudo crear la cuenta con Github"
      );
    }
    req.body.perfil = respuesta.data.perfil;
    // console.log(respuesta);
    return next();
  } catch (error) {
    console.log(error);
    let status = 500,
      message = "Error en el servidor ObtenerDatosCuentaGitHub M";

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

export default ObtenerDatosCuentaGitHub;
