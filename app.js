
const express = require('express')
const app = express()
const port = 8000
const router = require ('./Routes/category.router.js')
const middelware = require('./Middlewares/my-middlewar.middelware.js')

// const Users = require('./Data/Users.json')

// const UserController = require('./Controllers/user.controller.js');
// const CategoryController = require('./Controllers/category.controller.js');
// const ItemController = require('./Controllers/item.controller.js');

// app.use(UserController);
// app.use(ItemController);

app.use(middelware)
app.use(router);

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