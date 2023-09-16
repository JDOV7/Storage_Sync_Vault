import { validarCodeGithubServicio } from "../Auth/AuthServicio.js";
import OperacionUsuarioNoValidaError from "./Errores/OperacionUsuarioNoValidaError.js";

const ValidarCodeGitHub = async (req, res, next) => {
  try {
    const {
      query: { code },
    } = req;

    const respuesta = await validarCodeGithubServicio(code);
    if (!respuesta || respuesta?.status != 200) {
      throw new OperacionUsuarioNoValidaError(
        "No se pudo crear la cuenta con Github"
      );
    }
    // console.log(respuesta);
    req.body.access_token = respuesta.data.datos.access_token;
    return next();
  } catch (error) {
    console.log(error);
    let status = 500,
      message = "Error en el servidor ValidarCodeGitHub M";

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

export default ValidarCodeGitHub;
