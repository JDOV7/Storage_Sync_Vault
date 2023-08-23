import { body, validationResult } from "express-validator";
import {
  validarVacios,
  validarLongitudMinMax,
  validarUUID,
  validarCorreo,
  validarSoloPalabras,
  validarPassword,
} from "../Validadores/index.js";

const tipoDatos = ["uuid", "correo", "alpha", "numerico", "password"];

const validandoCrearUsuario = async (req, res, next) => {
  try {
    const datos = [
      { nombre: "IdPlanes", longMin: 36, longMax: 36, tipo: tipoDatos[0] },
      { nombre: "Correo", longMin: 15, longMax: 60, tipo: tipoDatos[1] },
      { nombre: "Nombres", longMin: 3, longMax: 45, tipo: tipoDatos[2] },
      { nombre: "Apellidos", longMin: 3, longMax: 45, tipo: tipoDatos[2] },
      { nombre: "Password", longMin: 8, longMax: 30, tipo: tipoDatos[4] },
    ];

    const validarVaciosRespuesta = await validarVacios(datos, req);
    if (!validarVaciosRespuesta) {
      throw new Error("Los campos no pueden ir vacios");
    }

    const validarMinMaxRespuesta = await validarLongitudMinMax(datos, req);
    if (!validarMinMaxRespuesta) {
      throw new Error("Los campos no cumplen con la logitud minima o maxima");
    }

    const uuids = datos.filter((dato) => dato.tipo === tipoDatos[0]);
    const validarUUIDRespuesta = await validarUUID(uuids, req);
    if (!validarUUIDRespuesta) {
      throw new Error("El campo no tiene un formato valido");
    }

    const correos = datos.filter((dato) => dato.tipo === tipoDatos[1]);
    const validarCorreoRespuesta = await validarCorreo(correos, req);
    if (!validarCorreoRespuesta) {
      throw new Error("El correo no tiene un formato valido");
    }

    const alpha = datos.filter((dato) => dato.tipo === tipoDatos[2]);
    const validarSoloPalabrasRespuesta = await validarSoloPalabras(alpha, req);
    if (!validarSoloPalabrasRespuesta) {
      throw new Error("Nombre(s) o apellido(s) no tienen un formato valido");
    }

    const password = datos.filter((dato) => dato.tipo === tipoDatos[4]);
    const validarPasswordRespuesta = await validarPassword(password, req);
    if (!validarPasswordRespuesta) {
      throw new Error("El password no tiene un formato valido");
    }

    return next();
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

const validandoConfirmarCuenta = async (req, res, next) => {
  try {
    console.log(req.params);
    const datos = [
      { nombre: "TokenAcceso", longMin: 10, longMax: 10, tipo: tipoDatos[4] },
    ];

    const validarVaciosRespuesta = await validarVacios(datos, req);
    if (!validarVaciosRespuesta) {
      throw new Error("Los campos no pueden ir vacios");
    }

    const validarMinMaxRespuesta = await validarLongitudMinMax(datos, req);
    if (!validarMinMaxRespuesta) {
      throw new Error("Los campos no cumplen con la logitud minima o maxima");
    }

    const password = datos.filter((dato) => dato.tipo === tipoDatos[4]);
    const validarPasswordRespuesta = await validarPassword(password, req);
    if (!validarPasswordRespuesta) {
      throw new Error("El token no tiene un formato valido");
    }

    return next();
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

const validandoLogin = async (req, res, next) => {
  try {
    const datos = [
      { nombre: "Correo", longMin: 15, longMax: 60, tipo: tipoDatos[1] },
      { nombre: "Password", longMin: 8, longMax: 30, tipo: tipoDatos[4] },
    ];

    const validarVaciosRespuesta = await validarVacios(datos, req);
    if (!validarVaciosRespuesta) {
      throw new Error("Los campos no pueden ir vacios");
    }

    const validarMinMaxRespuesta = await validarLongitudMinMax(datos, req);
    if (!validarMinMaxRespuesta) {
      throw new Error("Los campos no cumplen con la logitud minima o maxima");
    }

    const correos = datos.filter((dato) => dato.tipo === tipoDatos[1]);
    const validarCorreoRespuesta = await validarCorreo(correos, req);
    if (!validarCorreoRespuesta) {
      throw new Error("El correo no tiene un formato valido");
    }

    const password = datos.filter((dato) => dato.tipo === tipoDatos[4]);
    const validarPasswordRespuesta = await validarPassword(password, req);
    if (!validarPasswordRespuesta) {
      throw new Error("El password no tiene un formato valido");
    }

    return next();
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

export { validandoCrearUsuario, validandoConfirmarCuenta, validandoLogin };
