# 🏷️ FakeProductTracker (Blockchain Supply Chain Proof-of-Concept)

## 🌟 Project Overview

This project is a proof-of-concept for a decentralized application (dApp) designed to combat product counterfeiting and enhance supply chain transparency. It utilizes a Solidity Smart Contract deployed on a Hardhat development environment to create an immutable ledger for product registration and tracking.

The system ensures that the provenance (origin and history) of any product can be verified by the end-user, thereby building consumer trust and securing the supply chain.

## ⚙️ Technology Stack

* **Smart Contract Language:** [Solidity](https://soliditylang.org/) (`^0.8.20`)
* **Development Framework:** [Hardhat](https://hardhat.org/) (Compiler, testing, and local node environment)
* **Blockchain Interaction (Backend/Testing):** [Ethers.js](https://docs.ethers.org/v6/) (Integrated via Hardhat)
* **Environment:** Node.js, npm, Git

## 💡 Key Features (Smart Contract)

The core logic is handled by the `ProductTracker.sol` Smart Contract:

1.  **Product Registration:** Only the designated `manufacturer` can register a new product with a unique serial number and timestamp.
2.  **Immutable History:** Tracks the entire lifecycle of the product (e.g., Manufacturer -> Distributor -> Retailer) by appending transfer addresses to an immutable history array.
3.  **Authenticity Check:** Provides a `view` function for any party (e.g., consumers) to verify the product's existence and full transaction history.

## 🚀 Getting Started

### Prerequisites

You must have [Node.js](https://nodejs.org/en) and npm installed on your system.

### Installation

1.  **Clone the Repository:**
    ```bash
    git clone [SİZİN DEPO URL'NİZ]
    cd FakeProductTracker
    ```

2.  **Install Dependencies (Force Install due to compatibility on some systems):**
    ```bash
    npm install --save-dev hardhat ethers @nomicfoundation/hardhat-ethers --force
    ```

### Compilation

Compile the Solidity contract to generate the necessary artifacts (bytecode and ABI):

```bash
npx hardhat compile
