# Working on the library

## Making Changes

This project uses GitFlow

- `master` contains only viable releases
- `develop` should be used for all PRs
- `feature/<feature name>` should be used for all feature branches when working on this repository

When working on a fork, merge to `develop`


## Code Style

This project is currently written in a combination of `coffeescript` and `es6`.

We are gradually migrating modules to `es6` so new modules should all be written
using javascript.

For the `es6`, we are using `eslint` to lint and verify the format of the JS,
based on the rules provided by the
[AirBnB Javascript Styleguide](https://github.com/airbnb/javascript) (and
provided via [eslint-plugin-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base))

For coffeescript, any style you want goes at the moment as it is being phased out
in preference of javascript.

We are using [Buble](https://buble.surge.sh/) to transpile from ES6 to ES5. Avoid
any features in ES6 that are not supported by buble:
https://buble.surge.sh/guide/#unsupported-features



## Running the development site

Firstly you need to have nodejs and npm installed: Go here for that [https://nodejs.org](https://nodejs.org)

After cloning the repository to your machine, install the dependencies with:

    npm install


The development environment can then be started with:

    npm start


This starts up a series of jobs that watch the JS and CSS for changes as well as
a server for viewing the demos and tests in the browser.

The `dist`, `demo` and `coverage` directories will be auto-generated when
running this script and should not be pushed to the repository.

Once you see a line like `[TIMESTAMP] waiting for changes...`, hexagon has
finished building and you can navigate to the following URLs in your browser:

- `http://localhost:10001/demo/` - The built version of `src/demo`
- `http://localhost:10001/test/` - The tests, built from `src/hexagon.spec.js`
- `http://localhost:10001/coverage/` - Code coverage (only available after running the tests at least once)



## Tests

To run the tests (by default on phantomjs)

    npm test

To run the tests on local browsers

    npm run test-phantomjs
    npm run test-chrome
    npm run test-firefox
    npm run test-safari

To run the tests in saucelabs (you need to install saucelabs connect first)

    npm run test-saucelabs

The tests will also be run in travis on saucelabs for every commit, which means
don't have to get saucelabs set up to run locally - you can just check everything
passes with `npm test` and then rely on the CI tests to pick up any browser specific
peculiarities.



## Publishing the library
The following script prepares the `dist` and `demo` directories for publish:

```
npm run dist
```

This can be used to verify that the build works prior to publish.

When the changes on `master` are ready to be released, update the `package.json`
to bump the version, push the change and tag the commit with the same version.

When releasing a `beta` or `rc` version, update the `publishConfig.tag` in
package.json to `beta`

Tags should always match the `package.json` version exactly (no `v` prefix etc.)

All publishing is handled by `travis` and can only be triggered by those with
access to push tags.



# Working on the documentation

## Updating the documentation

To start the docs site locally, run:

    cd docs
    npm install
    npm start

This will use [QuantumJS](https://ocadotechnology.github.io/quantumjs/) to build
the documentation and watch for changes.

This will be served at `http://localhost:9000`

Make any changes to content inside `docs/content`. The documentation for modules
is inside `docs/content/docs/<module-name>`.



## Adding a new version

Once your new version has successfully published, you can add it to the docs.

Update the version of `hexagon-js` in `docs/package.json` to match the newly
released version, as well as the version in the `copy-hexagon:version` script
and then run:

```
cd docs
npm install
```

This will install all the required dependencies, run the postinstall script and
place a copy of Hexagon in the docs resources, ready to be used.

Add the new version to the bottom of `docs/content/templates/versions.um` to
tell the documentatiton to build that version. The documentation can then be
started using:
```
cd docs
npm start
```

This will use [QuantumJS](https://ocadotechnology.github.io/quantumjs/) to build
the documentation and watch for changes.

This will be served at `http://localhost:9000`



## Deploying the documentation

The documentation is deployed by `travis` for every push to `master` to `GitHub
Pages`
