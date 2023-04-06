const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database')
const { peerProxy } = require('./peerProxy')

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.username, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});


secureApiRouter.get('/:user/friends', async (req, res) => {
  const friends = await DB.getFriends(req.params.user);
  res.send(friends);
});

secureApiRouter.post('/:user/friends', async (req, res) => {
  const newFriend = req.body.user;
  DB.addFriend(req.params.user, newFriend);
  const friends = await DB.getFriends(req.params.user);
  res.send(friends);
});

secureApiRouter.get('/:user/goals', async (req, res) => {
  const goals = await DB.getGoals(req.params.user);
  res.send(goals);
});

secureApiRouter.post('/:user/goals', async (req, res) => {
  const newGoal = req.body;
  DB.addGoal(req.params.user, newGoal[0], newGoal[1]);
  const goals = await DB.getGoals(req.params.user);
  res.send(goals); 
});

secureApiRouter.put('/:user/goals', async (req, res) => {
  const goal = req.body;
  DB.updateGoal(req.params.user, goal[0], goal[1], goal[2]);
  const goals = await DB.getGoals(req.params.user);
  res.send(goals); 
});

app.use((req, res) => {
  res.sendFile('index.html', {root: 'public'});
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);