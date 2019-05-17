HexagonJS Documentation
=======================

This project contains the HexagonJS documentation site https://hexagonjs.io

Running locally
---------------

    npm start


Building once
-------------
To build the site and not watch it run:

   npm run build


To add a new hexagon release
----------------------------
Update the version of hexagon in package.json, then run `npm install`, and commit
and new versions of hexagon that have been added to the content directory.

This should be done each time hexagon is released.

Deploying
---------

To publish the site (and make it live) use the following

    npm run release

This will deploy to appengine.
