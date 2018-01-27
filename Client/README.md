## Client

The client source code is all contained within the `src` folder. Source code is written in ES6 with JSX support. Babel is used to transpile the source to compatible ES5. The transpiled code is then bundled into specific output files inside the server's `static` folder using webpack.

ESLint rules are contained in `.eslintrc.json`.

#### Building
Building will first ensure the source code passes ESLint, following which it will be transpiled and bundled into the files specified in the webpack config, which is generally in the server's `static` folder.

`npm run build`

#### Testing
Testing is done with Mocha. It is important to note `import` syntax does not work in test since they are not transpiled, so be sure to use `const x = require("x")` instead.

`npm run test`

#### Linting
Linting is always done on build, and will cause the build to fail if the linting does not pass. However, you can also manually trigger the linting process if you want to lint without building.

`npm run lint`
