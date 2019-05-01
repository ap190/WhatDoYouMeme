const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/assets')));
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('/api/getMeme', (req, res) => {
  console.log("Sending meme!");
  res.send({image: "meme2.png", timestamp: 1556729616319});
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`What do you meme server listening on ${port}`);
