const Asesor = artifacts.require("Asesor");

module.exports = function(deployer) {
  deployer.deploy(Asesor);
};
