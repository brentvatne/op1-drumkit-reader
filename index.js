const fs = require('fs');

async function readDrumkitAsync(filename) {
  return new Promise((resolve, reject) => {
    let buffer = fs.readFileSync(filename);

    // Read FORM chunk
    let formChunk = readChunkHeader(buffer, 0);
    if (formChunk.name !== 'FORM') {
      reject('Invalid AIF/AIFF file: FORM header not present');
    }

    // Add FORM header chunk length to get total bytes
    let totalBytes = formChunk.length + 8;

    // Validate the format
    let format = readString(buffer, 8, 4);
    if (format !== 'AIFF') {
      reject('Invalid AIF/AIFF file: FORM header formType is not AIFF');
    }

    // Start after FORM header
    let offset = 12;
    while (offset < totalBytes) {
      // Read the chunk
      const chunk = readChunkHeader(buffer, offset);

      // Add the chunk header length to offset
      offset += 8;

      if (chunk.name === 'APPL') {
        let drumKitJSON = readString(buffer, offset, chunk.length);
        if (!drumKitJSON.startsWith('op-1')) {
          reject(`Invalid JSON encoded in APPL data: ${drumKitJSON}`);
        } else {
          resolve(drumKitJSON.replace(/^op-1/, ''));
        }
        break;
      }

      offset += chunk.length;
    }
  });
}

function readChunkHeader(buffer, offset) {
  // Chunk headers are 4 bytes
  let name = readString(buffer, offset, 4);

  // Chunk length are 32bit big endian (long), offset by 4 for chunk name
  let length = buffer.readUInt32BE(offset + 4);

  return {
    name,
    length,
  };
}

function readString(buffer, start, length) {
  return buffer.slice(start, start + length).toString('ascii');
}

module.exports = readDrumkitAsync;