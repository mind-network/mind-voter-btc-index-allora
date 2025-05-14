const { Wallet, Contract, JsonRpcProvider, Network } = require('ethers')
const logger = require("../logger")
const config = require("../config")
const abi = [
    "function fheKeySetId() external view returns (bytes32)",
    "function currentRoundNumber() external view returns (uint256)",
    "function hasVoted(address) external view returns (bool, uint256)",
    "function submitRandomCt(string calldata uri) external",
]

const provider = new JsonRpcProvider(config.mindChain.rpc, config.mindChain.chainID, {
    staticNetwork: Network.from(config.mindChain.chainID)
})
const voter = new Wallet(config.voterPrivateKey, provider)
const contract = new Contract(config.mindChain.hub.address, abi, voter)

async function getFheKeySetId() {
    return contract.fheKeySetId()
}

async function hasVoted() {
    const currentRoundNumber = await contract.currentRoundNumber()
    const [hasVoted, roundDeadline] = await contract.hasVoted(voter.address)
    return { currentRoundNumber, hasVoted, roundDeadline }
}

async function submitVote(ct) {
    const tx = await contract.submitRandomCt(ct, { gasLimit: 2000000n })
    logger.info({ txHash: tx.hash })
    await tx.wait().catch((err) => {
        console.error(err)
        throw err
    })
}

module.exports = {
    getFheKeySetId,
    hasVoted,
    submitVote
}