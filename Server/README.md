## Server
The server source code is all contained within the `src` folder. Source code is written in ES6. Babel is used to transpile the source to compatible ES5. The transpiled code is then output into the `dist` folder.

ESLint rules are contained in `.eslintrc.json`.

#### Building
Building will first ensure the source code passes ESLint, following which it will be transpiled and output into the `dist` folder.

**Building will also run the built files!**

`npm run build`

#### Testing
Testing is done with Mocha. It is important to note `import` syntax does not work in test since they are not transpiled, so be sure to use `const x = require("x")` instead.

`npm run test`

#### Linting
Linting is always done on build, and will cause the build to fail if the linting does not pass. However, you can also manually trigger the linting process if you want to lint without building.

`npm run lint`

#### Deploying
When the application gets deployed, only the server folder gets deployed, since the client folder is only the "recipe" required to create the static files in the `static` folder of the server.

It should also be noted, that when the server gets deployed, the source should **NOT** be built, since all building should be done before deploying the application. The server can therefore be started without building.

`npm run start`
