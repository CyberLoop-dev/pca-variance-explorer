<div align="center">

![Header](https://capsule-render.vercel.app/api?type=waving&color=0:0d1928,100:0e7490&height=170&section=header&text=pca-variance-explorer&fontColor=ffffff&fontSize=38)

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=21&pause=1000&center=true&vCenter=true&width=620&lines=Explore+Principal+Component+Analysis;See+variance+and+projection+in+2D" alt="Typing title"/>

[![License](https://img.shields.io/github/license/CyberLoop-dev/pca-variance-explorer)](LICENSE)
![Language](https://img.shields.io/github/languages/top/CyberLoop-dev/pca-variance-explorer)
[![Stars](https://img.shields.io/github/stars/CyberLoop-dev/pca-variance-explorer?style=social)](https://github.com/CyberLoop-dev/pca-variance-explorer/stargazers)
![Last commit](https://img.shields.io/github/last-commit/CyberLoop-dev/pca-variance-explorer)

<img src="assets/mark.svg" width="520" alt="Principal component axes illustration"/>

</div>

## 🧭 Overview
A local, dependency-free 2D Principal Component Analysis explorer. Paste coordinate pairs to calculate the covariance matrix, eigenvalues, principal directions, explained variance, and projected coordinates.

## ✨ Features
- 📊 Parses a small two-column dataset from text.
- 🧮 Computes the 2×2 covariance matrix and analytic eigenpairs.
- 🧭 Draws PC1 and PC2 directions over the scatter plot.
- 📉 Reports explained variance and projected coordinates.
- 🔒 Processes data in the browser without an API.

## 🖥️ Demo
Run the local Node.js server; no hosted demo is configured.

## 🚀 Quick Start
```bash
npm start
```
Open `http://127.0.0.1:4177`. Run calculation tests with `npm test`.

## 🧰 Tech Stack
- Node.js built-in HTTP server
- Vanilla JavaScript ES modules
- HTML Canvas
- Node.js built-in test runner

## 🗂️ Folder Structure
```text
.
├── assets/mark.svg
├── public/app.js
├── public/index.html
├── public/pca.js
├── public/styles.css
├── tests/pca.test.js
├── package.json
└── server.js
```

## 🗺️ Roadmap
- [ ] Add optional standardization (z-score scaling).
- [ ] Add a covariance-matrix heatmap.
- [ ] Support CSV upload with a selected pair of columns.

## 🤝 Contributing
Include a reproducible point set and expected numerical behavior for algorithm changes. Keep all calculations local.

## 📄 License
MIT. See [LICENSE](LICENSE).

<div align="center">

![Footer](https://capsule-render.vercel.app/api?type=waving&color=0:0e7490,100:0d1928&height=100&section=footer)

</div>
