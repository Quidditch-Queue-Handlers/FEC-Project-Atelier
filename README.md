# Quidditch Queue Handlers FEC Project Atelier

## Overview

Completely redesign and modernize a retail portal from the ground up.

## Table of Contents

To be set up later

## Description

Building out product detail page, search, browse, add to cart, and checkout features using preexisting API calls and populated database.


## Installation

Use the package manager [npm](https://www.npmjs.com/) to install dependencies.

```bash
npm install
```

## Usage

Look in the package.json scripts to find the following commands:

server-dev
client-dev

Run the following command in the repositories root directory to start the client:

```bash
npm run client-dev
```
run the following command in the repositories root directory to start the server:

```bash
npm run server-dev
```


## Team Members

[Burhan Syed](https://github.com/burhan-syed)
[Derek Williams](https://github.com/squeakypickles33)
[Justin Cordova](https://github.com/justcord10)
[Yuxin Lu](https://github.com/yuxinlu1)

## Road Map

[Trello](https://trello.com/b/yqDl65OT/rfp2310-fcp-quiddich-queue-handl)

## Contributing Work

Every feature will be logged as a trello ticket
Create a new branch for every feature

New branches will follow the naming scheme:
twoletterprefix-featurename

The prefixes are as follows:
pd- for Product Details
rr- for Ratings and Reviews
qa- for Questions and Answers
ri- for Related Items and Outfit Creation

Always branch from main with the latest changes:
    - pull from origin main
    - branch from local main

To submit a PR:
    - assure all changed files have been committed into
    your (local) branch
    - push branch into origin:
        - git push origin branchname:branchname
    - Navigate to branch in github and click create PR
        - Or use the automatic create PR button
    - The title of the PR should match the ticket title and include
the ticket/card number:
        - ie:
          #12: [S] Create global.css file and import into React

## CSS rules

Each widget has its own two letter css class prefix that follows the same naming conventions
as outlined above in the Contributing Work section

No styling h1, h2, h3, h4, those will be done in global CSS file

use an h1 for product description title
use an h2 for all other section titles

only use REM units, NO PIXEL UNITS