import {
  validarCodeGithubServicio,
  creandoUsuarioServicio,
  confirmarCuentaServicio,
  LoginServicio,
} from "./AuthServicio.js";
import OperacionUsuarioNoValidaError from "../Validadores/Errores/OperacionUsuarioNoValidaError.js";

const validarCodeGithubController = async (req, res) => {
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
    return res.status(respuesta.status).json(respuesta);
  } catch (error) {
    let status = 500,
      message = "Error en el servidor";

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

const creandoUsuarioController = async (req, res) => {
  try {
    const { IdPlanes, Correo, Nombres, Apellidos, Password } = req.body;
    const usuario = { IdPlanes, Correo, Nombres, Apellidos, Password };
    const respuesta = await creandoUsuarioServicio(usuario);
    if (respuesta.status !== 200) {
      return res.status(respuesta.status).json({
        status: respuesta.status,
        message: respuesta.message,
      });
    }
    return res.status(200).json(respuesta);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const confirmarCuentaController = async (req, res) => {
  try {
    const { TokenAcceso } = req.params;
    const usuario = { TokenAcceso };
    const respuesta = await confirmarCuentaServicio(usuario);
    if (respuesta.status !== 200) {
      return res.status(respuesta.status).json({
        status: respuesta.status,
        message: respuesta.message,
      });
    }
    return res.status(200).json(respuesta);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const LoginController = async (req, res) => {
  try {
    const { Correo, Password } = req.body;
    const usuario = { Correo, Password };
    const respuesta = await LoginServicio(usuario);
    if (respuesta.status !== 200) {
      return res.status(respuesta.status).json({
        status: respuesta.status,
        message: respuesta.message,
      });
    }
    return res.status(200).json(respuesta);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export {
  validarCodeGithubController,
  creandoUsuarioController,
  confirmarCuentaController,
  LoginController,
};
