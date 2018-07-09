Working on the library
----------------------

### Install Dependencies

Firstly you need to have nodejs and npm installed: Go here for that [https://nodejs.org](https://nodejs.org)

Next you should install the dependencies needed with

    npm install

### Running the demo site

The project contains a demo site for testing out changes, and developing new themes. This command will run the demo site:

    npm start

This will start a webserver on port 10001, and will watch for changes made to the library.

The tests can be accessed via http://localhost:10001/test
The coverage can be accessed via http://localhost:10001/coverage (only accessible
once the tests have been run by visiting http://localhost:10001/test)

### Running the tests from the command line

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

### Style guide

Take a read of the javascript style guide. The code style followed is standard,
with some preferences on language features added on top.

For coffeescript, any style you want goes at the moment as it is being phased out
in preference of javascript.

Any new modules should be written in javascript.
