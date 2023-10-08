import { existeCuentaRegistradaFacebookServicio } from "../Auth/AuthServicio.js";
import OperacionUsuarioNoValidaError from "./Errores/OperacionUsuarioNoValidaError.js";
const ExisteCuentaRegistradaFacebook = async (req, res, next) => {
  try {
    const {
      body: {
        perfil: { id, email },
      },
    } = req;
    console.log(req.body);
    const respuesta = await existeCuentaRegistradaFacebookServicio(id, email);
    console.log(respuesta);
    if (!respuesta || (respuesta?.status != 200 && respuesta?.status != 404)) {
      throw new OperacionUsuarioNoValidaError(
        "No se pudo crear la cuenta con Facebook"
      );
    }
    req.body.existeCuenta = respuesta;
    // console.log(respuesta);
    return next();
  } catch (error) {
    console.log(error);
    let status = 500,
      message = "Error en el servidor ExisteCuentaRegistradaFacebook M";

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

export default ExisteCuentaRegistradaFacebook;
