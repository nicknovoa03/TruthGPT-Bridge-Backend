const BridgeEth = artifacts.require('./BridgeEth.sol');

module.exports = async (done) => {
  const [recipient, _] = await web3.eth.getAccounts();
  const bridgeEth = await BridgeEth.deployed();
  await bridgeEth.transferTokens(recipient, 1000);
  done();
};
