# op1-drumkit-reader

Extract the JSON drumkit metadata from OP1 drumkit AIF(F) files. Requires Node.js >= 7.6.0 due to use of `async` functions.

### Use it as a CLI tool

```
npm i -g op1-drumkit-reader
print-drumkit-json Example.aiff > Example.json
```

### Use it programmatically

You can clone this repository and run `node example/index.js`. It contains roughly
the following code:

```javascript
const readDrumkitAsync = require('op1-drumkit-reader');
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
```

#### Thanks to the following resources

- http://www.muratnkonar.com/aiff/
- https://github.com/oampo/audiofile.js/
- https://github.com/operator1/op1/wiki/Op-1-Application-Chunk-format

Also, be sure to check out the [OP-1 Drum Utility](http://now.teenageengineering.com/post/47348903156/op-1-drum-utility).


