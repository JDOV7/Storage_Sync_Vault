import { Web3 } from "web3";
import fs from "fs";
import { config } from "dotenv";
config();
const EliminarAccesoCompartidoETH = async (
  idPropietario,
  IdObjecto,
  idNuevoUsuario
) => {
  try {
    console.log(
      `ETH EliminarAccesoCompartidoETH: -${idPropietario}------------${IdObjecto}-------${idNuevoUsuario}`
    );

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

    await contrato.methods
      .eliminarAcceso(idPropietario, IdObjecto, idNuevoUsuario)
      .send({ from: signer.address });

    return true;
  } catch (error) {
    console.log(
      "----------------ERROR: EliminarAccesoCompartidoETH------------------------- "
    );
    console.log(error);
    return false;
  }
};

export default EliminarAccesoCompartidoETH;
