module.exports = {
    mindChain: {
        rpc: "https://rpc-testnet.mindnetwork.xyz",
        chainID: 192940,
        fheKeyRegistry: {
            address: "0x350D2819Df60aDE1D074EdB11f7900dDDA068Ab5"
        },
        hub: {
            address: ""
        }
    },
    paillier: {
        numBits: 24,
    },
    storage: {
        url: ""
    },
    voterPrivateKey: process.env.MIND_HUB_VOTER,
    allora: {
        url: "https://api.allora.network/v2/allora/consumer/price/ethereum-11155111/BTC/8h",
        apiKey: process.env.ALLORA_API_KEY,
    },
}