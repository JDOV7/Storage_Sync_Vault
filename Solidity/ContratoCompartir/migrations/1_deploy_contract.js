const CompartirObjecto = artifacts.require("CompartirObjecto.sol");

module.exports = function (deployer) {
  deployer.deploy(CompartirObjecto);
};
