const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.get('/goals', (req, res) => {
  res.send(goals);
});

apiRouter.post('/goals/:section', (req, res) => {
  goals = addGoal(section, goals, req.body);
  res.send(goals);
});

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

let goals = {daily: [], weekly: [], monthly: [], lastSevenDays: []};
function addGoal(section, goals, newGoal) {
  switch (section) {
    case 'daily':
      goals.daily.push(newGoal);
    case 'weekly':
      goals.weekly.push(newGoal);
    case 'monthly':
      goals.monthly.push(newGoal);
  }
}

let friends = [];
function addFriend(friends, newFriend) {
  for (fr of friends) {
    if (newFriend.username === fr.username) {
      return;
    }
  }
  friends.push(newFriend);
  return friends;
}