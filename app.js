
const express = require('express')
var cors = require('cors')
const app = express()
const port = 8000
const jwt = require('jsonwebtoken');
const Users = require('./Data/Users.json')

const UserController = require('./Controllers/UserController.js');
const CategoryController = require('./Controllers/CategoryController.js');
const ItemController = require('./Controllers/ItemController.js');

app.use(cors());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Request received at ${req.url}`);
  next();
});

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    // return res.status(401).send('Access denied. Token not provided.');
    return res.status(401).send('There is no token.');
  }

  const verified = jwt.verify(token, 'config.TOKEN_SECRET');
  req.user = verified;
  console.log(verified)
  Users.forEach(e=>{
    if (e.id===verified.id)
    next();
  })
    // res.status(400).send('Invalid or expired token');
    res.status(400).send('User token does not exist');
};

app.use(UserController);

app.use(verifyToken);


app.use(CategoryController);
app.use(ItemController);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('error in the router, please try later⌛');
});

app.get("*", (req, res) => {
  res.status(404).send("PAGE NOT FOUND😤");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});