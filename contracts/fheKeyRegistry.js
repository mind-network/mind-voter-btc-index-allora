const { Contract, JsonRpcProvider, Network, Wallet, ZeroAddress } = require('ethers')
const logger = require("../logger")
const config = require("../config")
const abi = require("../abi/FheKeyRegistry.json")

const provider = new JsonRpcProvider(config.mindChain.rpc, config.mindChain.chainID, {
    staticNetwork: Network.from(config.mindChain.chainID)
})
const contract = new Contract(config.mindChain.fheKeyRegistry.address, abi, provider)

async function getFheKeySet(id) {
    return contract.fheKeySets(id)
}

module.exports = {
    getFheKeySet,
}