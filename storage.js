const config = require("./config")

async function upload(fhe_content) {
    const payload = { fhe_content };
    const res = await fetch(config.storage.url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    const data = await res.json();
    return data.hash;
}

module.exports = { upload }