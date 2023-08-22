import { check, validationResult } from "express-validator";

const validarVacios = async (valores = [], req) => {
  for (const valor of valores) {
    await check(valor.nombre).trim().escape().notEmpty().run(req);
  }
  let errores = validationResult(req);
  return errores.errors.length === 0;
};

const validarLongitudMinMax = async (valores = [], req) => {
  for (const valor of valores) {
    await check(valor.nombre)
      .trim()
      .escape()
      .isLength({ min: valor.longMin, max: valor.longMax })
      .run(req);
  }
  let errores = validationResult(req);
  return errores.errors.length === 0;
};

const validarUUID = async (valores = [], req) => {
  for (const valor of valores) {
    await check(valor.nombre).trim().escape().isUUID().run(req);
  }
  let errores = validationResult(req);
  return errores.errors.length === 0;
};

const validarCorreo = async (valores = [], req) => {
  for (const valor of valores) {
    await check(valor.nombre).trim().escape().isEmail().run(req);
  }
  let errores = validationResult(req);
  return errores.errors.length === 0;
};

const validarSoloPalabras = async (valores = [], req) => {
  for (const valor of valores) {
    await check(valor.nombre)
      .trim()
      .escape()
      .custom((value) => /^[A-Za-z\s]+$/.test(value))
      .run(req);
  }
  let errores = validationResult(req);
  return errores.errors.length === 0;
};

const validarPassword = async (valores = [], req) => {
  for (const valor of valores) {
    await check(valor.nombre)
      .trim()
      .escape()
      .custom((value) => /^[A-Za-z0-9\-\_\+\*\.]+$/.test(value))
      .run(req);
  }
  let errores = validationResult(req);
  return errores.errors.length === 0;
};

export {
  validarVacios,
  validarLongitudMinMax,
  validarUUID,
  validarCorreo,
  validarSoloPalabras,
  validarPassword,
};
