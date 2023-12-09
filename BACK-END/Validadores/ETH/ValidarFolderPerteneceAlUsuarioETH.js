import { Web3 } from "web3";
import fs from "fs";
import { config } from "dotenv";
config();

const validarObjectoETH = async (IdUsuario, IdObjecto) => {
  try {
    console.log(
      `ETH validarObjectoETH: -${IdUsuario}------------${IdObjecto}-`
    );
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RED_ETH));
    const signer = web3.eth.accounts.privateKeyToAccount(
      process.env.ACCOUNT_PRIVATE_KEY_ETH
    );
    web3.eth.accounts.wallet.add(signer);

    const data = fs.readFileSync(process.env.CONTRACT_ABI);
    const obj = JSON.parse(data);
    const abi = obj["abi"];
    const contrato = new web3.eth.Contract(
      abi,
      process.env.CONTRACT_ADDRESS_ETH,
      signer
    );

    const bExisteFolder = await contrato.methods
      .getCID(IdUsuario, IdObjecto)
      .call();

    if (!bExisteFolder) {
      throw new Error("Error:validarObjectoETH No existe el objecto en la ETH");
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const validarFolderPadrePerteneceAlUsuarioETH = async (
  request,
  response,
  next
) => {
  try {
    const {
      usuario: { IdUsuarios },
      body: { Padre },
    } = request;
    console.log(
      `ETH validarFolderPerteneceAlUsuarioETH: -${IdUsuarios}------------${Padre}-`
    );

    const bvalidar = await validarObjectoETH(IdUsuarios, Padre);

    if (!bvalidar) {
      throw new Error(
        "Error:validarFolderPadrePerteneceAlUsuarioETH No existe el objecto en la ETH"
      );
    }

    return next();
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message:
        "Error: validarFolderPadrePerteneceAlUsuarioETH al validar si petenerce al usuario en la blockchain",
      data: {},
    });
  }
};

const validarFolderParamPerteneceAlUsuarioETH = async (
  request,
  response,
  next
) => {
  try {
    const {
      usuario: { IdUsuarios },
      params: { IdObjetos },
    } = request;
    console.log(
      `ETH validarFolderParamPerteneceAlUsuarioETH: -${IdUsuarios}------------${IdObjetos}-`
    );

    const bvalidar = await validarObjectoETH(IdUsuarios, IdObjetos);

    if (!bvalidar) {
      throw new Error(
        "Error:validarFolderParamPerteneceAlUsuarioETH No existe el objecto en la ETH"
      );
    }

    return next();
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message:
        "Error: validarFolderParamPerteneceAlUsuarioETH al validar si petenerce al usuario en la blockchain",
      data: {},
    });
  }
};

const validarFolderHeaderPadrePerteneceAlUsuarioETH = async (
  request,
  response,
  next
) => {
  try {
    const {
      usuario: { IdUsuarios },
      headers: { padre },
    } = request;
    console.log(
      `ETH validarFolderHeaderPadrePerteneceAlUsuarioETH: -${IdUsuarios}------------${padre}-`
    );

    const bvalidar = await validarObjectoETH(IdUsuarios, padre);

    if (!bvalidar) {
      throw new Error(
        "Error:validarFolderHeaderPadrePerteneceAlUsuarioETH No existe el objecto en la ETH"
      );
    }

    return next();
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message:
        "Error: validarFolderHeaderPadrePerteneceAlUsuarioETH al validar si petenerce al usuario en la blockchain",
      data: { headers: request.headers },
    });
  }
};

export {
  validarObjectoETH,
  validarFolderPadrePerteneceAlUsuarioETH,
  validarFolderParamPerteneceAlUsuarioETH,
  validarFolderHeaderPadrePerteneceAlUsuarioETH,
};
