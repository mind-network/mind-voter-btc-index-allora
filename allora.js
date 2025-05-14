const logger = require("./logger")
const config = require("./config")

async function getBtc8HourPrediction() {
    const res = await fetch(config.allora.url, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'x-api-key': config.allora.apiKey,
        }
    });
    const data = await res.json();
    const price = data.data.inference_data.network_inference_normalized
    logger.info({ price })
    return price
}

module.exports = {
    getBtc8HourPrediction,
}