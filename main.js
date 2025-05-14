const paillier = require("./paillier")

async function main() {
    await paillier.init()
    await paillier.voteBtc8HourPrediction()
}

main().then(() => {
    console.info("Done")
    process.exit()
})