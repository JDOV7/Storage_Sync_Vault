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
import Usuarios from "../Models/Usuarios.js";
import { Op } from "sequelize";

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
    console.log(
      "-------------------crearOIniciarCuentaGithubController-------------------"
    );
    const {
      body: {
        existeCuenta: { status },
      },
    } = req;
    if (status && status == 404) {
      console.log(
        "-----------------------crearOIniciarCuentaGithubController: proceso para crear la cuenta--------------"
      );
      let {
        body: {
          perfil: { email, login, id },
        },
      } = req;
      // const IdPlanes = "3e366d3d-54ea-11ee-a058-0250b7d1102c";
      // const datos = { email, login, id, IdPlanes };
      const datos = { email, login, id };
      // console.log(datos);
      const respuestaCrearCuentaGithub = await crearCuentaGitHubServicio(datos);
      console.log(respuestaCrearCuentaGithub);
      return res.status(respuestaCrearCuentaGithub.status).json({
        status: respuestaCrearCuentaGithub.status,
        message: "/github/iniciar-sesion",
        data: { respuestaCrearCuentaGithub },
      });
    } else if (status && status == 200) {
      console.log(
        "-----------------------crearOIniciarCuentaGithubController: proceso para iniciar--------------"
      );
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
        data: respuestaLoginGithub.data,
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

const validarCuentaGithub = async (request, response) => {
  try {
    const {
      params: { IdUsuarios, direccion },
    } = request;

    const buscarUsuario = await Usuarios.findOne({
      where: {
        [Op.and]: [
          { IdUsuarios },
          { ServidorAutorizacion: "Github" },
          { Activo: false },
        ],
      },
    });
    console.log(buscarUsuario);
    if (!buscarUsuario) {
      throw new Error("No se pudo validar el usuario de github");
    }

    await Usuarios.update(
      { Activo: true, direccion },
      {
        where: {
          Activo: false,
          IdUsuarios,
        },
      }
    );
    return response.status(200).json({
      status: 200,
      message: "validarCuentaGithub exitosa",
      data: {},
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "Error al validar la cuenta de github",
      data: {},
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
      // const IdPlanes = "3e366d3d-54ea-11ee-a058-0250b7d1102c";
      // const datos = { email, Nombres, Apellidos, id, IdPlanes };
      const datos = { email, Nombres, Apellidos, id };
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
    const { Correo, Nombres, Apellidos, Password, direccion } = req.body;
    const usuario = { Correo, Nombres, Apellidos, Password, direccion };
    console.log(req.body);
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

const validarSesionController = async (req, res) => {
  try {
    const { usuario } = req;

    if (!usuario) {
      throw new Error("No existe el usuario");
    }

    return res.status(200).json(usuario);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

export {
  validarCodeGithubController,
  crearOIniciarCuentaGithubController,
  validarCuentaGithub,
  crearOIniciarCuentaFacebookController,
  creandoUsuarioController,
  confirmarCuentaController,
  LoginController,
  validarSesionController,
};
