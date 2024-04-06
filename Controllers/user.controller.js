const Users = require('../Data/Users.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const login = ('', (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  Users.forEach((user) => {
    if (user.userName === userName && bcrypt.compare(password, user.password)) {
      const token = jwt.sign({
        id: user.id,
        userName: user.userName,
        email: user.email,
        password: user.password,
      },
      'config.TOKEN_SECRET');
      res.header('auth-token', token).send({'token': token});
    } else {
      res.status(400).send('User does not exist.');
    }
  });
});

const signup = ('', (req, res) => {
  const user = req.body;
  Users.push(user);
  fs.writeFileSync('./Data/Users.json', JSON.stringify(Users));
});

const getUser = ('', (req, res) => {
  res.send(Users);
});

module.exports = {
  login,
  signup,
  getUser,
};
