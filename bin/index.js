#!/usr/bin/env node

const readDrumkitAsync = require('../');
const path = require('path');

const filename = process.argv[2];

async function logJson() {
  try {
    let filepath = path.resolve(process.cwd(), filename);
    let result = await readDrumkitAsync(filepath);
    let obj = JSON.parse(result);
    console.log(obj);
  } catch (e) {
    console.log(e);
  }
}

if (filename) {
  logJson();
} else {
  console.error('You should provide a path to the aif(f) file as an argument');
}
