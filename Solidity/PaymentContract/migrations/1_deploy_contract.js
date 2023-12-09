const PaymentContract = artifacts.require("PaymentContract.sol");

// module.exports = function (deployer) {
//   deployer.deploy(PaymentContract);
// };

module.exports = function (deployer, network, accounts) {
  const ownerAddress = "0x1CEAF70f5B30249a1727941746F955c6d61b1455"; // Cambia esto por la dirección que desees como propietario

  deployer.deploy(PaymentContract, { from: ownerAddress });
};