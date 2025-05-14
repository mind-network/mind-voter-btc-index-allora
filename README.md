# MindChain Bitcoin Price Prediction Client Using Allora API

A Node.js client that integrates Allora’s Bitcoin price prediction API with the Mind Network’s fully homomorphic encryption (FHE) consensus on Mind Chain. This tool:

- Fetches BTC price predictions from the Allora API.
- Encrypts each prediction using Mind Network’s FHE library.
- Submits encrypted predictions to Mind Chain for decentralized consensus.

## 🚀 Features

- **Automated Predictions**: Retrieve the latest BTC price forecasts programmatically.
- **End-to-End Encryption**: Encrypt prediction payloads with FHE before broadcasting.
- **Consensus Participation**: Seamlessly interact with Mind Chain to contribute to forecasting.

## 📥 Installation

1. **Clone the repository**

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure**

   - Copy the sample configuration:

     ```bash
     cp config_template.js config.js
     ```

   - Open `config.js` and fill in accordingly

## 💻 Usage

Run the client:

```bash
node main.js
```

The script will fetch a new prediction, encrypt it, and submit it to the network.

## 🛠️ References

[Mind Network](https://www.mindnetwork.xyz/)

[Allora Network](https://www.allora.network/)

## 📄 License

This project is licensed under the [MIT License](LICENSE).
