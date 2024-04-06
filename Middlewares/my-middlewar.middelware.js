const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const corsMiddelwar = (cors());

const reqMiddelware =((req, res, next) => {
  console.log(`[${new Date().toISOString()}] Request received at ${req.url}`);
  next();
});

// const verifyToken = (req, res, next) => {
//     const token = req.header('auth-token');
//     if (!token) {
//       // return res.status(401).send('Access denied. Token not provided.');
//       return res.status(401).send('There is no token.');
//     }

//     const verified = jwt.verify(token, 'config.TOKEN_SECRET');
//     req.user = verified;
//     console.log(verified)
//     Users.forEach(e=>{
//       if (e.id===verified.id)
//       next();
//     })
//       // res.status(400).send('Invalid or expired token');
//       res.status(400).send('User token does not exist.');
//   };

module.exports = {
  corsMiddelwar,
  reqMiddelware,
  // verifyToken
};
