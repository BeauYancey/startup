const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const friendsCollection = client.db('startup').collection('friends');
const goalsCollection = client.db('startup').collection('goals');
const userCollection = client.db('startup').collection('users');

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  const goals = {
    username: username,
    'daily': [],
    'weekly': [],
    'monthly': [],
    'lastSevenDays': []
  }
  await goalsCollection.insertOne(goals);

  const friends = {
    username: username,
    friends: []
  }
  await friendsCollection.insertOne(friends);

  return user;
}


function addFriend(self, newFriend) {
  const query = {username: self};
  friendsCollection.updateOne(query, {$push:{friends:newFriend}});
}

async function getFriends(self) {
  const cursor = friendsCollection.find({username: self});
  return cursor.toArray();
}

function addGoal(self, section, newGoal) {
  const cursor = goalsCollection.find({username: self});
  obj = cursor.toArray();
  goalsSection = obj[section];
  goalsSection.push(newGoal);
}

function getGoals(self) {
  const cursor = goalsCollection.find({username: self});
  return cursor.toArray();
}

module.exports = {addFriend, getFriends, addGoal, getGoals, getUser, getUserByToken, createUser};