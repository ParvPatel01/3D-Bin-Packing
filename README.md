![Banner](banner.png)
# 3D Bin Packing


A TypeScript implementation of the **3D Bin Packing** algorithm with a React-based visualizer built using Vite.  
This project demonstrates how boxes can be efficiently arranged into a container (pallet) by using an algorithmic approach to minimize unused space.  
The visualizer provides a 3D interactive representation to better understand the algorithm's results.


## Features

- **3D Bin Packing Algorithm** — Efficiently arranges boxes into a pallet using different orientations.
- **Layer Candidate System** — Implements skyline-based placement logic.
- **React + TypeScript + Vite** — Fast development and build process.
- **Interactive Visualizer** — View and inspect the packing result in a 3D space.
- **UI Controls** — Customize pallet and box dimensions, run the algorithm, and see results instantly.



## Project structure

```bash
├── public
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── components
│   │   ├── ControlPanel.tsx
│   │    └── Visualizer.tsx
│   ├── packing
│   │    ├── layers.ts
│   │    ├── packing.ts
│   │    ├── type.ts
│   │    └── utils.ts
│   ├── visualizer
│   │    ├── box.ts
│   │    ├── camera.ts
│   │    ├── controls.ts
│   │    ├── pallet.ts
│   │    ├── renderer.ts
│   │    └── scene.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── reportWebVitals.ts
├── node_modules
├── README.md
├── LICENSE
├── package.json
├── package-lock.json
├── tsconfig.json
└── .gitignore
```
## Installation

Install my-project with npm

```bash
git clone https://github.com/ParvPatel01/3D-Bin-Packing.git
cd 3D-Bin-Packing
npm install
```
## Run Locally

Clone the project

```bash
  git clone https://github.com/ParvPatel01/3D-Bin-Packing.git
```

Go to the project directory

```bash
  cd 3D-Bin-Packing
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Authors

- [@Parv Patel](https://github.com/ParvPatel01)

