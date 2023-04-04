const {MongoClient} = require('mongodb');

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
const usersCollection = client.db('startup').collection('users');

function addFriend(self, newFriend) {
  const cursor = friendsCollection.find({username: self});
  obj = cursor.toArray();
  obj.friends.push(newFriend);
  friendsCollection.deleteOne({username: self});
  friendsCollection.insertOne(obj);
}

function getFriends(self) {
  const cursor = friendsCollection.find({username: self});
  friendsList = cursor.toArray().friends;
  return friendsList;
}

function addGoal(self, section, newGoal) {
  const cursor = goalsCollection.find({username: self});
  obj = cursor.toArray();
  goalsSection = obj[section];
  goalsSection.push(newGoal);
}

function getGoals(self) {
  const cursor = goalsCollection.find({username: self});
  goalsObj = cursor.toArray();
  return goalsObj; 
}

module.exports = {addFriend, getFriends, addGoal, getGoals};