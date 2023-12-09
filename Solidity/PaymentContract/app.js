import { Web3 } from "web3";
import fs from "fs";
// import contract from "./build/contracts/PertenenciaArchivo.json";
// 0xcC889AeC298ee88AAd554C3E340B97f5784E9ff8
async function main() {
  // Configurando la conexión a un nodo Ethereum

  const web3 = new Web3(
    new Web3.providers.HttpProvider(`HTTP://127.0.0.1:7545`)
  );

  web3.eth
    .getBlockNumber()
    .then((result) => {
      console.log("Current block number: " + result);
    })
    .catch((error) => {
      console.error(error);
    });

  const chainId = "5777";

  // Creando una cuenta firmante desde la llave privada
  const signer = web3.eth.accounts.privateKeyToAccount(
    "0xdd84a660b0945b0c95dab8495c4db7b313fc772d6a9bf0ccc0b2b7dce574a41e"
  );
  web3.eth.accounts.wallet.add(signer);

  var abi = "";

  try {
    console.log("Lectura del ABI");
    const data = fs.readFileSync(
      "./build/contracts/PaymentContract.json",
      "utf8"
    );
    var obj = JSON.parse(data);
    abi = obj["abi"];
  } catch (err) {
    console.error(err);
    return;
  }
  //
  const contract_address = "0xc328A8f34D9E92887e86baCFDd4F6C1660772086";

  try {
    const contrato = new web3.eth.Contract(abi, contract_address, signer);

    // await contrato.methods.set("id2", "cid2_1").send({ from: signer.address });

    // const respuesta = await contrato.methods.get("e3d050a0-bdbf-43c3-9a26-efd63ba91174").call();
    // const respuesta = await contrato.methods.owner().call();
    // console.log(respuesta)

    // await contrato.methods.makePayment().send({
    //   from: "0x876F1eb45AB6B5b0A466dd14b0cbb692Be2Fb944", // Cambia esto según la cuenta que desees
    //   value: web3.utils.toWei("2", "ether"),
    // });

    const cliente = "0x973E1B06A807E1Dd5B698Cc0a94F52388eC7B1f4";
    const estaCuentaEstaSuscribta = await contrato.methods
      .hasPaid(cliente)
      .call();
    console.log(cliente);
    console.log(estaCuentaEstaSuscribta);

    // const respuesta2 = await contrato.methods.getCID("id1","cid1").call();
    // console.log(respuesta2);
  } catch (error) {
    console.error("Error => " + error);
  }

  web3.eth.clearSubscriptions();
}

main();
