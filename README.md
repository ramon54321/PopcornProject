# The Popcorn Project
Innovation Project where as a small team we develop an application to improve promotion efficiency.

## Overview
Project is currently under development.

### Development Conduct
 - Development is done on its own feature branch.
 - Master branch is always in a deploy state. (Auto deployed with CI)
 - ESLint is required.
 - JSDoc comments are required.

### Development Stack
 Client
 
 - ES6
 - React
 - Babel
 - Webpack
 
 Server
 
 - ES6
 - Babel
 - PostgreSQL
 - Travis CI
 
### Development Process
Feature

1. `git branch myNewFeature`
2. `git checkout myNewFeature`
3. Commits...

When feature development is finished.

4. `git merge development`
5. Resolve any conflicts
6. Open pull request to development branch

When a deployable version is ready on development branch.

1. Open pull request to master branch

## Contributing
Unfortunately this is a closed project, but feel free to browse the source!

## Technical Theory
### Buy / Sell Rates
Coins are bought and sold from the central coin bank at different rates, depending on the balance of coins. When there are more coins in the bank's posession, the coins are cheaper to buy from the bank. When there are more coins posessed by entites, and the bank is running low, the coins are more expensive to buy, but carry a higher value to return to the bank (Sell). This means the value of the trade is also so to balance the distrabution of coins between the coin bank and the entities.

#### [Spreadsheet showing rates.](https://docs.google.com/spreadsheets/d/1vNhVOCuQdh3lWDyBjttVlwAYqeRCn8KUIPiAbkN6ePk/edit?usp=sharing)
