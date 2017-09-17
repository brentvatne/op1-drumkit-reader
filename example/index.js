const readDrumkitAsync = require('../');
const path = require('path');

async function main() {
  try {
    let result = await readDrumkitAsync(path.resolve(__dirname, 'BayLeaf.aif'));
    let obj = JSON.parse(result);
    console.log(obj);
  } catch (e) {
    console.log(e);
  }
}

main();