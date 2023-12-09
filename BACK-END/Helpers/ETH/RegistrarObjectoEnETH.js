import { Web3 } from "web3";
import fs from "fs";
import { config } from "dotenv";
config();

const registrarObjectoEnETH = async (IdUsuario, IdObjecto) => {
  try {
    console.log(`ETH registrar: -${IdUsuario}------------${IdObjecto}-`);

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

    await contrato.methods
      .set(IdUsuario, IdObjecto)
      .send({ from: signer.address });

    return true;
  } catch (error) {
    console.log(
      "----------------ERROR: registrarObjectoEnETH------------------------- "
    );
    console.log(error);
    return false;
  }
};

export default registrarObjectoEnETH;
