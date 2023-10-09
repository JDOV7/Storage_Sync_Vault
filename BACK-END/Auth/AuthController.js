import {
  validarCodeGithubServicio,
  crearCuentaGitHubServicio,
  verificarSiLaCuentaEstaConfirmadaGithubServicio,
  loginGithubServicio,
  crearCuentaFacebookServicio,
  verificarSiLaCuentaEstaConfirmadaFacebookServicio,
  loginFacebookServicio,
  creandoUsuarioServicio,
  confirmarCuentaServicio,
  LoginServicio,
} from "./AuthServicio.js";
import OperacionUsuarioNoValidaError from "../Validadores/Errores/OperacionUsuarioNoValidaError.js";
import generarJWT from "../Helpers/GenerarJWT.js";

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

const crearOIniciarCuentaGithubController = async (req, res) => {
  try {
    const {
      body: {
        existeCuenta: { status },
      },
    } = req;
    if (status && status == 404) {
      let {
        body: {
          perfil: { email, login, id },
        },
      } = req;
      const IdPlanes = "3e366d3d-54ea-11ee-a058-0250b7d1102c";
      const datos = { email, login, id, IdPlanes };
      // console.log(datos);
      const respuestaCrearCuentaGithub = await crearCuentaGitHubServicio(datos);
      console.log(respuestaCrearCuentaGithub);
      return res.status(respuestaCrearCuentaGithub.status).json({
        status: respuestaCrearCuentaGithub.status,
        message: "/github/iniciar-sesion",
        data: { respuestaCrearCuentaGithub },
      });
    } else if (status && status == 200) {
      const {
        body: {
          perfil: { id },
        },
      } = req;
      const respuestaVerificarCuenta =
        await verificarSiLaCuentaEstaConfirmadaGithubServicio(id);
      console.log(respuestaVerificarCuenta);

      if (
        !respuestaVerificarCuenta ||
        respuestaVerificarCuenta?.status != 200
      ) {
        throw new OperacionUsuarioNoValidaError("Error con la cuenta");
      }

      const respuestaLoginGithub = await loginGithubServicio(id);

      if (!respuestaLoginGithub || respuestaLoginGithub.status != 200) {
        throw new OperacionUsuarioNoValidaError("Error con la cuenta");
      }

      return res.status(200).json({
        status: 200,
        message: "/github/iniciar-sesion",
        data: { respuestaLoginGithub },
      });
    } else {
      throw new OperacionUsuarioNoValidaError("Error con la cuenta");
    }
  } catch (error) {
    console.log(error);
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

const crearOIniciarCuentaFacebookController = async (req, res) => {
  try {
    const {
      body: {
        existeCuenta: { status },
      },
    } = req;
    if (status && status == 404) {
      let {
        body: {
          perfil: { email, first_name: Nombres, last_name: Apellidos, id },
        },
      } = req;
      const IdPlanes = "3e366d3d-54ea-11ee-a058-0250b7d1102c";
      const datos = { email, Nombres, Apellidos, id, IdPlanes };
      // console.log(datos);
      const respuestaCrearCuenta = await crearCuentaFacebookServicio(datos);
      console.log(respuestaCrearCuenta);
      return res.status(respuestaCrearCuenta.status).json({
        status: respuestaCrearCuenta.status,
        message: "/facebook/iniciar-sesion",
        data: { respuestaCrearCuenta },
        data: { datos },
      });
    } else if (status && status == 200) {
      const {
        body: {
          perfil: { id },
        },
      } = req;
      const respuestaVerificarCuenta =
        await verificarSiLaCuentaEstaConfirmadaFacebookServicio(id);
      console.log(respuestaVerificarCuenta);

      if (
        !respuestaVerificarCuenta ||
        respuestaVerificarCuenta?.status != 200
      ) {
        throw new OperacionUsuarioNoValidaError("Error con la cuenta");
      }

      const respuestaLogin = await loginFacebookServicio(id);

      if (!respuestaLogin || respuestaLogin.status != 200) {
        throw new OperacionUsuarioNoValidaError("Error con la cuenta");
      }

      return res.status(200).json({
        status: 200,
        message: "/github/iniciar-sesion",
        data: { respuestaLogin },
      });
    } else {
      throw new OperacionUsuarioNoValidaError("Error con la cuenta");
    }
  } catch (error) {
    console.log(error);
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
  crearOIniciarCuentaGithubController,
  crearOIniciarCuentaFacebookController,
  creandoUsuarioController,
  confirmarCuentaController,
  LoginController,
};
