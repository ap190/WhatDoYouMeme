const express = require('express');
const path = require('path');
const database = require('./simpleDB.js');
var fs = require('fs');
const app = express();

const ROUND_TIME = 1.8 * Math.pow(10,7); // in milliseconds


app.use(express.static(path.join(__dirname, '/assets')));
app.use(express.static(path.join(__dirname, '/client/build')));

database.storeData("meme2.png", 1556729616319);

function calculateRemainingTime(timestamp) {
  const newDate = new Date();
  return ROUND_TIME - (newDate.getTime() - timestamp);
}

function pushNewRound() {
  var files = fs.readdirSync(path.join(__dirname, '/assets'));
  var randomFileIndex = Math.floor(Math.random() * files.length);
  const currDate = new Date();
  database.storeData(files[randomFileIndex], currDate.getTime());
}
setInterval(pushNewRound, ROUND_TIME);

app.get('/api/getMeme', (req, res) => {
  console.log("Sending meme!");
  const data = database.loadData();
  data.timestamp = calculateRemainingTime(data.timestamp);
  res.send(data);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`What do you meme server listening on ${port}`);
