const express = require('express');
const path = require('path');
const database = require('./simpleDB.js');
var fs = require('fs');
const app = express();

const ROUND_TIME = 8.64 * Math.pow(10,7); // in milliseconds


app.use(express.static(path.join(__dirname, '/assets')));
app.use(express.static(path.join(__dirname, '/client/build')));

var remainingTime = ROUND_TIME;

function calculateRemainingTime(timestamp) {
  const newDate = new Date();
  remainingTime = ROUND_TIME - (newDate.getTime() - timestamp);
  return remainingTime;
}

function pushNewRound() {
  console.log("pushing new round");
  var files = fs.readdirSync(path.join(__dirname, '/assets'));
  var randomFileIndex = Math.floor(Math.random() * files.length);
  const currDate = new Date();
  database.storeData(files[randomFileIndex], currDate.getTime());
}
setInterval(pushNewRound, remainingTime);

app.get('/api/getMeme', (req, res) => {
  var data = database.loadData();
  console.log(data.timestamp);
  data.timestamp = calculateRemainingTime(data.timestamp);
  console.log(data.timestamp);

  if (data.timestamp <= 0) {
    pushNewRound()
    data = database.loadData();
    data.timestamp = calculateRemainingTime(data.timestamp);
  }

  res.send(data);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`What do you meme server listening on ${port}`);
