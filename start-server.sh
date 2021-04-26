#!/bin/bash
npm i
npm install -g concurrently
concurrently "npm:start-*"
