import { check, validationResult } from "express-validator";
const validarVacios = async (valores = [], req) => {
  for (const valor of valores) {
    await check(valor, `${valor} no puede ir vacio -`)
      .trim()
      .escape()
      .notEmpty()
      .run(req);
  }
  let errores = validationResult(req);
  return errores.errors.length === 0;
};

export { validarVacios };
