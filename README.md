<a id='readme-top'> </a>

<br />
<div align="center">
  <a href="https://github.com/Quidditch-Queue-Handlers/FEC-Project-Atelier">
    <!-- <img src="" alt="logo" width="50" height="50" /> -->
  </a>
  <h3 align="center">
    Project Atelier
  </h3>
  <!-- <p align="center">
    <br />
    <a href="https://github.com/Quidditch-Queue-Handlers/FEC-Project-Atelier"><strong>Explore the docs »</strong></a>
    <br />
  </p> -->
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About</a>
      <ul>
        <li>
          <a href="#built-with">Built With</a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li>
          <a href="#prerequisites">Prerequisites</a>
        </li>
        <li>
          <a href="#installation">Installation</a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
    </li>
    <li>
      <a href="#contributing">Contributing</a>
    </li>
    <li>
      <a href="#contact">Contact</a>
    </li>
  </ol>
</details>

## About

<div align="center">
  <img src="./assets/AtelierDemo.gif" alt="project landing page image" width="700px" />
</div>

<br />
<p>
  Atelier is an e-commerce application build with React and Express enabling users to browse through a collection of over 15 million products, add them to their outfits, read through a robust Q&A section, peruse the products ratings and reviews, and add products to their cart.
</p>

### Built With

![node.js](https://img.shields.io/badge/node-%23000000.svg?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-%23000000.svg?style=for-the-badge&logo=react&logoColor)
![Webpack](https://img.shields.io/badge/webpack-%23000000.svg?style=for-the-badge&logo=webpack)
![Babel](https://img.shields.io/badge/babel-%23000000.svg?style=for-the-badge&logo=babel)
![axios](https://img.shields.io/badge/axios-%23000000.svg?style=for-the-badge&logo=axios)
![jest](https://img.shields.io/badge/jest-%23000000.svg?style=for-the-badge&logo=jest)

<p align="right">
  (<a href="#readme-top">back to top</a>)
</p>

## Getting Started

<p>
    Instructions to setup Project Atelier on your local machine below.
</p>

### Prerequisites

![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Quidditch-Queue-Handlers/FEC-Project-Atelier
   ```
1. Install NPM packages
   ```sh
   npm install
   ```
1. Create a `.env` file using the `example.env` file as an example
   ```sh
    GITHUB_TOKEN = (your github token)
    API_HOST_URI = (the URI endpoint for the backend API)
    PORT = (optional, port to server application. defaults to 3000)
   ```
1. Run build command.
   ```sh
   npm run build
   ```
1. Run in production environment
   ```sh
   npm run server
   ```

## Usage

### Development

For development start the express back end with

```
npm run server-dev
```

then the React front end with

```
npm run client-dev
```

Open localhost:8080

In development, Webpack is configured to hot reload changes on the client on port 8080 and requests to port 8080 are proxied to port 3000 for the server

### Tests

Run tests: `npm run test `

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

<p>
Every feature is logged as a trello ticket
Following feature branch workflow: create a new branch for every feature

New branches will follow the naming scheme:
twoletterprefix-featurename

The prefixes are as follows:
pd- for Product Details
rr- for Ratings and Reviews
qa- for Questions and Answers
ri- for Related Items and Outfit Creation

Always branch from main with the latest changes:

<ul>
  <li>pull from origin main</li>
  <li>branch from local main</li>
</ul>

To submit a PR:

<ul>
  <li>assure all changed files have been committed into
    your (local) branch</li>
  <li>push branch into origin:
     <ul>
     <li>git push origin branchname:branchname</li>
     </ul>
  </li>
  <li>Navigate to branch in github and click create PR
   <ul>
     <li>Or use the automatic create PR button</li>
     </ul>
  </li>
  <li>Navigate to branch in github and click create PR
   <ul>The title of the PR should match the ticket title and include
the ticket/card number:
     <li>ie: #12: [S] Create global.css file and import into React</li>
     </ul>
  </li>
</ul>
</p>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

<h3 align='center'>Burhan Syed</h3>
<h4 align='center'>
  <a href="https://github.com/burhan-syed">GitHub</a>
</h4>

<h3 align='center'>Derek Williams</h3>
<h4 align='center'>
  <a href="https://github.com/squeakypickles33">GitHub</a>
</h4>

<h3 align='center'>Justin Cordova</h3>
<h4 align='center'>
  <a href="https://github.com/justcord10">GitHub</a>
</h4>

<h3 align='center'>Yuxin Lu</h3>
<h4 align='center'>
  <a href="https://github.com/yuxinlu1">GitHub</a>
</h4>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
