Hexagon.js
==========

About
-----

Hexagon.js is a collection of components, styles and JavaScript utilities. It has been designed from the ground up to support custom theming and extension and exposes a simple api for doing so.

This readme includes no details about how to use the library itself as there is extensive documentation for the library available here: [https://www.hexagonjs.io](https://www.hexagonjs.io).

This repository contains the code for the library itself which can be found in the modules folder, and some code for building the library - found in the build folder. This repository is also a node module, which makes it possible to create custom builds of hexagon, allowing inclusion of just the modules you need. The node module also exposes a way to create custom themes for hexagon and share themes in a way that allows them to be extended. See [this page](https://www.hexagonjs.io/guide/build-custom-theme) for more details.


Install Dependencies
--------------------

Firstly you need to have nodejs and npm installed: Go here for that [https://nodejs.org](https://nodejs.org)

Next you should install the dependencies needed with

    npm install


Running the demo site
---------------------

The project contains a demo site for testing out changes, and developing new themes. This command will run the demo site:

    npm run demo

This will start a webserver on port 9009, and will watch for changes made to the library.


Publishing a release (TODO)
--------------------

To release a version of the library run this command:

    npm run release

This will automatically merge changes from dev into master (first checking that it has pulled the latest changes from dev and master), it will then publish the library to npm, create a git tag, push the changes to git, switch back to the dev branch and bump the version in the package.json and finally push the changes to dev.


Running the tests
-----------------

    npm test

This command will run all the tests for the build process and the library itself.

To test just the build process:

    npm run test-build

To test just the library process:

    npm run test-library

To test a single module: (TODO)

    npm run test-module <name-of-module>


Cleaning the project (TODO)
--------------------

    npm run clean

This will remove the target folder - which is where all compiled/generated content is written.
