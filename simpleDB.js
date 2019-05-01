const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'simpleStore.txt');

function storeData(imageName, timestamp) {
  try {
    const toSave = JSON.stringify({image: imageName, timestamp: timestamp});
    fs.writeFileSync(dataPath, toSave);
  } catch (err) {
    console.error(err)
  }
}

function loadData() {
  try {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch (err) {
    console.error(err)
    return {}
  }
}

exports.storeData = storeData;
exports.loadData = loadData;
