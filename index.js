const express = require('express');
const app = express();
const DB = require('./database')

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.get('/friends', (req, res) => {
  res.send(friends);
});

apiRouter.post('/friends', (req, res) => {
  friends = addFriend(friends, req.body);
  res.send(friends);
});

app.use((req, res) => {
  res.sendFile('index.html', {root: 'public'});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let friends = {};
function addFriend(self, newFriend) {
  for (fr of friends[self]) {
    if (newFriend.username === fr.username) {
      return;
    }
  }
  friends[self].push(newFriend);
  return friends;
}