#!/bin/bash

# Required
moduleName=$1
# Optional
niceModuleName=$2
moduleDescription=$3

newPath="content/docs/$moduleName"

mkdir -p $newPath

cp -r _ignore/module/ $newPath

find $newPath -type f -exec sed -i '' "s^{{moduleName}}^$moduleName^g" {} \;

if [ "$niceModuleName" ]; then
  find $newPath -type f -exec sed -i '' "s^{{NiceModuleName}}^$niceModuleName^g" {} \;
fi;

if [ "$moduleDescription" ]; then
  find $newPath -type f -exec sed -i '' "s^{{moduleDescription}}^$moduleDescription^g" {} \;
fi;
