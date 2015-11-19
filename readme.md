hexagon-site
============

This project contains the content for the hexagon docs site.

Deploying
=========
This can be improved, but the current procedure is:

    npm start (then kill it when it starts watching)
    cd target
    gcloud preview app deploy app.yaml --project causal-galaxy-939 --version <revision-number> --promote