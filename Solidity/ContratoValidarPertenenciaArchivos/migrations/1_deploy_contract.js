const PertenenciaArchivo = artifacts.require("PertenenciaArchivo.sol");

module.exports = function (deployer) {
  deployer.deploy(PertenenciaArchivo);
};
