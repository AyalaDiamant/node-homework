
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const userRouter = require('./Routes/user.router.js');
const categoryRouter = require('./Routes/category.router.js');
const itemRouter = require('./Routes/item.router.js');
const middelware = require('./Middlewares/my-middlewar.middelware.js');

// app.use(middelware)
app.use(userRouter);
app.use(categoryRouter);
app.use(itemRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('error in the router, please try later⌛');
});

app.get('*', (req, res) => {
  res.status(404).send('PAGE NOT FOUND😤');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
