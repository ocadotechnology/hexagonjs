Working on the library
----------------------

### Install Dependencies

Firstly you need to have nodejs and npm installed: Go here for that [https://nodejs.org](https://nodejs.org)

Next you should install the dependencies needed with

    npm install


### Running the demo site

The project contains a demo site for testing out changes, and developing new themes. This command will run the demo site:

    npm start

This will start a webserver on port 9009, and will watch for changes made to the library.


### Running the tests

    npm test

This command will run all the tests for the build process and the library itself.

To test just the build process:

    npm run test-build

To test just the library process:

    npm run test-library

To test a single module:

    npm run test-library <name-of-module>
