const Kudos = artifacts.require("Kudos");

module.exports = function (deployer, network, accounts) {
 deployer.deploy(Kudos, { from: accounts[0] });
};
