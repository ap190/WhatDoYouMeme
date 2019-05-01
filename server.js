const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/assets')));
app.get('/api/getMeme', (req, res) => {
  console.log("Sending meme!");
  res.send("meme2.png");
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`What do you meme server listening on ${port}`);
