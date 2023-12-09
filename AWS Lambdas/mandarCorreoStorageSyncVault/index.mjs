import { enviarCorreo } from "./EnviarCorreo.js";
export const handler = async (event) => {
  // TODO implement
  try {
    const respuesta = await enviarCorreo(event);
    const response = {
      statusCode: 200,
      message: "se envio el correo",
    };
    return response;
  } catch (error) {
    return {
      statusCode: 500,
      message: "no se pudo enviar el correo",
      data: {},
    };
  }
};

// console.log(
//   await handler({
//     Correo: "jesusmarzo7.v2@gmail.com",
//     Nombres: "jesus",
//     TokenAcceso: "123",
//   })
// );
