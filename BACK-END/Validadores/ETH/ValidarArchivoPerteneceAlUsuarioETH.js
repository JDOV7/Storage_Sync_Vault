import { validarObjectoETH } from "./ValidarFolderPerteneceAlUsuarioETH.js";

const validarArchivoPerteneceAlUsuarioETH = async (request, response, next) => {
  try {
    const {
      usuario: { IdUsuarios },
      body: { Cid },
    } = request;
    console.log(
      `ETH validarArchivoPerteneceAlUsuarioETH: -${IdUsuarios}------------${Cid}-`
    );

    const bvalidar = await validarObjectoETH(IdUsuarios, Cid);

    if (!bvalidar) {
      throw new Error(
        "Error:validarArchivoPerteneceAlUsuarioETH No existe el objecto en la ETH"
      );
    }

    return next();
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message:
        "Error: validarArchivoPerteneceAlUsuarioETH al validar si petenerce al usuario en la blockchain",
      data: { headers: request.headers },
    });
  }
};

export { validarArchivoPerteneceAlUsuarioETH };
