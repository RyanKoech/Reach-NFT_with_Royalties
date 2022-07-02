<!-- PROJECT SHIELDS -->
<!--
* I'm using markdown "reference style" links for readability.
* Reference links are enclosed in brackets [ ] instead of parentheses ( ).
* See the bottom of this document for the declaration of the reference variables
* for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
* https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

![](https://img.shields.io/badge/Hackathon-blueviolet)

# Reach NFT with Royalties

> A simple DAPP where users can creators aution and sell their NFTs but most importantly get to enjoy royalty benefits when the NFT is resold.


## Built With

- Major languages: HTML, CSS, Javascript, Reach
- Frameworks: Tailwind CCS, React
- Technologies used: [Reach](https://reach.sh/)


## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites
- Running on [Ubuntu](https://ubuntu.com/) on similar OS.
- Installed [Make](https://linuxhint.com/install-make-ubuntu/).
- Installed [Docker](https://www.docker.com/) and Docker-Compose. **Use sudo apt command**
- Given docker command admin rights. [Here](https://docs.docker.com/engine/install/linux-postinstall/).
- Has a [MyAlgo](https://wallet.myalgo.com/) Wallet

### Install
```bash
git clone <this-repo>

npm install
```

### Usage
```bash
#Download Reach in src directory (<this-repo>/src)
curl https://docs.reach.sh/reach -o reach ; chmod +x reach

#Update Reach and Compile Reach code
./reach update
./reach compile

#Start the Reach Devnet
./reach devnet

#On Another terminal, in root directroy, Serve the frontend
npm start
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

## Show your support

Give a ⭐ if you like this project!

## Acknowledgments

- [Truffle Tutorial](https://trufflesuite.com/tutorial/index.html)

## 📝 License

This project is [MIT](./MIT.md) licensed.


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/RyanKoech/Reach-NFT_with_Royalties.svg?style=for-the-badge
[contributors-url]: https://github.com/RyanKoech/Reach-NFT_with_Royalties/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/RyanKoech/Reach-NFT_with_Royalties.svg?style=for-the-badge
[forks-url]: https://github.com/RyanKoech/Reach-NFT_with_Royalties/network/members
[stars-shield]: https://img.shields.io/github/stars/RyanKoech/Reach-NFT_with_Royalties.svg?style=for-the-badge
[stars-url]: https://github.com/RyanKoech/Reach-NFT_with_Royalties/stargazers
[issues-shield]: https://img.shields.io/github/issues/RyanKoech/Reach-NFT_with_Royalties.svg?style=for-the-badge
[issues-url]: https://github.com/RyanKoech/Reach-NFT_with_Royalties/issues
[license-shield]: https://img.shields.io/github/license/RyanKoech/Crypto_Fund.svg?style=for-the-badge
[license-url]: https://github.com/RyanKoech/Reach-NFT_with_Royalties/blob/master/LICENSE
