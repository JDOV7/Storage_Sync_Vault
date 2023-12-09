import { Web3 } from "web3";
import fs from "fs";
import { config } from "dotenv";
config();

const ValidarCuentasAutorizadasETH = async (IdUsuarios, IdObjetos) => {
  try {
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RED_ETH));
    const signer = web3.eth.accounts.privateKeyToAccount(
      process.env.ACCOUNT_PRIVATE_KEY_ETH_COMPARTIR_OBJECTO
    );
    web3.eth.accounts.wallet.add(signer);

    const data = fs.readFileSync(process.env.CONTRACT_ABI_COMPARTIR_OBJECTO);
    const obj = JSON.parse(data);
    const abi = obj["abi"];
    const contrato = new web3.eth.Contract(
      abi,
      process.env.CONTRACT_ADDRESS_ETH_COMPARTIR_OBJECTO,
      signer
    );

    const cuentasAutorizadas = await contrato.methods
      .get(IdUsuarios, IdObjetos)
      .call();
    return cuentasAutorizadas;
  } catch (error) {
    return [];
  }
};

const ValidarExistenCuentasAutorizadasETH = async (request, response, next) => {
  try {
    const {
      usuario: { IdUsuarios },
      params: { IdObjetos },
    } = request;
    const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RED_ETH));
    const signer = web3.eth.accounts.privateKeyToAccount(
      process.env.ACCOUNT_PRIVATE_KEY_ETH_COMPARTIR_OBJECTO
    );
    web3.eth.accounts.wallet.add(signer);

    const data = fs.readFileSync(process.env.CONTRACT_ABI_COMPARTIR_OBJECTO);
    const obj = JSON.parse(data);
    const abi = obj["abi"];
    const contrato = new web3.eth.Contract(
      abi,
      process.env.CONTRACT_ADDRESS_ETH_COMPARTIR_OBJECTO,
      signer
    );

    const cuentasAutorizadas = await contrato.methods
      .get(IdUsuarios, IdObjetos)
      .call();
    console.log(cuentasAutorizadas);
    request.cuentasAutorizadas = cuentasAutorizadas;
    return next();
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message:
        "Error: ValidarExistenCuentasAutorizadasETH, al validar en la blockchain",
      data: { headers: request.headers },
    });
  }
};

export { ValidarExistenCuentasAutorizadasETH, ValidarCuentasAutorizadasETH };
