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
    "0xa17a09dc1ff6908d9b768f8e803c26fd6d035ba34b290b8157d9f83fb8358334"
  );
  web3.eth.accounts.wallet.add(signer);

  var abi = "";

  try {
    console.log("Lectura del ABI");
    const data = fs.readFileSync(
      "./build/contracts/CompartirObjecto.json",
      "utf8"
    );
    var obj = JSON.parse(data);
    abi = obj["abi"];
  } catch (err) {
    console.error(err);
    return;
  }
  //
  const contract_address = "0xBc91b01fbE8B33484e561BD11e68853180C7851E";

  try {
    const contrato = new web3.eth.Contract(abi, contract_address, signer);

    // await contrato.methods
    //   .set(
    //     "13e0f761-1912-4cb6-a109-2e88895fc604",
    //     "Qmd8nQ1h3ofLH1RAvSrgM7ceKVV7PsPFBE8yLeDgjBKw4E",
    //     "7b99fcc0-59e2-4fb2-a517-3d633c5942de"
    //   )
    //   .send({ from: signer.address });

    // const respuesta = await contrato.methods.get("e3d050a0-bdbf-43c3-9a26-efd63ba91174").call();
    // console.log(respuesta);

    const respuesta2 = await contrato.methods
      .get(
        "13e0f761-1912-4cb6-a109-2e88895fc604",
        "28a68ab2-7fd2-4daa-b1a5-9c79d0a0033d"
      )
      .call();
    console.log(respuesta2);

    // const respuesta3 = await contrato.methods
    //   .getTienePermiso(
    //     "13e0f761-1912-4cb6-a109-2e88895fc604",
    //     "Qmd8nQ1h3ofLH1RAvSrgM7ceKVV7PsPFBE8yLeDgjBKw4E",
    //     "6b99fcc0-59e2-4fb2-a517-3d633c5942de"
    //   )
    //   .call();
    // console.log(respuesta3);
  } catch (error) {
    console.error("Error => " + error);
  }

  web3.eth.clearSubscriptions();
}

main();
