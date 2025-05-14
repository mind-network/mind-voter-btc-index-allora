const ethers = require("ethers")
const paillier = require("mind-paillier-voting-sdk")
const logger = require("./logger")
const config = require("./config")
const hub = require("./contracts/hub")
const fheKeyRegistry = require("./contracts/fheKeyRegistry")
const allora = require("./allora")
const storage = require("./storage")

let VOTER;

async function init() {
    if (!VOTER) {
        const keySetId = await hub.getFheKeySetId()
        const [[publicKeyUrl]] = await fheKeyRegistry.getFheKeySet(keySetId)
        logger.info({ publicKeyUrl })
        const response = await fetch(publicKeyUrl);
        const sPublicKey = await response.text();
        const publicKey = paillier.deserializePublicKey(sPublicKey);
        VOTER = new paillier.Voter(config.paillier.numBits, publicKey);
        logger.info("FHE init completed")
    }
}

async function voteBtc8HourPrediction() {
    const { currentRoundNumber, hasVoted, roundDeadline } = await hub.hasVoted()
    logger.info({ currentRoundNumber, hasVoted, roundDeadline })
    if (currentRoundNumber == 0n) {
        return
    }
    const now = Math.floor(Date.now() / 1000)
    if (roundDeadline < now || !hasVoted) {
        await init()
        logger.info("Getting prediction from Allora")
        const price = await allora.getBtc8HourPrediction()
        const priceInt = Math.floor(price)
        logger.info("Encrypting price with FHE")
        const proofs = JSON.stringify(VOTER.encryptNumber(priceInt), (_, value) =>
            typeof value === 'bigint' ? value.toString() : value
        )
        logger.info({ proofLength: proofs.length })
        const hash = ethers.keccak256(ethers.toUtf8Bytes(proofs))
        logger.info("Calculated cypher text hash:" + hash)
        const savedHash = await storage.upload(proofs)
        logger.info("Saved to storage, server replied hash:" + savedHash)
        await hub.submitVote(hash)
        logger.info("Submitted on chain")
    } else {
        logger.info("Round number", currentRoundNumber, "has voted", hasVoted)
        logger.info(`Already voted, next round in ${Math.floor(Number(roundDeadline) - Date.now() / 1000)} seconds`)
    }
}

module.exports = {
    init,
    voteBtc8HourPrediction,
}