HexagonJS
=========

About
-----

<a href="https://www.hexagonjs.io"><img src="https://raw.github.com/ocadotechnology/hexagonjs/blob/master/assets/hexagon-logo.svg" align="left" hspace="10" vspace="6"></a>

Hexagon.js is a collection of components, styles and JavaScript utilities. It has been designed from the ground up to support custom theming and extension and exposes a simple api for doing so.

This readme includes no details about how to use the library itself as there is extensive documentation for the library available here: [https://www.hexagonjs.io](https://www.hexagonjs.io).

This repository contains the code for the library itself which can be found in the modules folder, and some code for building the library - found in the build folder. This repository is also a node module, which makes it possible to create custom builds of hexagon, allowing inclusion of just the modules you need. The node module also exposes a way to create custom themes for hexagon and share themes in a way that allows them to be extended.


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


Running the tests
-----------------

    npm test

This command will run all the tests for the build process and the library itself.

To test just the build process:

    npm run test-build

To test just the library process:

    npm run test-library

To test a single module:

    npm run test-library <name-of-module>
