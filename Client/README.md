## Client

The client source code is all contained within the `src` folder. Source code is written in ES6 with JSX support. Babel is used to transpile the source to compatible ES5. The transpiled code is then bundled into specific output files inside the server's `static` folder using webpack.

ESLint rules are contained in `.eslintrc.json`.

#### Building
Building will first ensure the source code passes ESLint, following which it will be transpiled and bundled into the files specified in the webpack config, which is generally in the server's `static` folder.

`npm run build`

#### Testing
