const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const CategoryModel = require('../Models/Category.model')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/CategoryItem/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id)
  console.log(CategoryModel);
  const category = await CategoryModel.findById(id);
  if (!category) {
    res.status(404).send('Category not found');
    return;
  }
  res.send(category);
});

router.post('/CategoryItem/:id', async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const newItem = data;
  console.log(newItem);
  const category = await CategoryModel.findById(id);
  category.List.push(newItem)
  category.save();
  res.send(newItem);
});

router.delete('/CategoryItem/:id/:name', async (req, res) => {
  const id = req.params.id;
  const name = req.params.name;
  const category = await CategoryModel.findById(id);
  const list = category.List;
  for (let j = 0; j < list.length; j++) {
    if (list[j].name === name) {
      list.splice(j, 1);
    }
  }
  category.save();
  res.send(`the Item deleted successfully!`)
});

router.put('/CategoryItem/:id/:name', async (req, res) => {
  console.log(CategoryModel);
  const id = req.params.id;
  const name = req.params.name;
  let data = req.body;
  const category = await CategoryModel.findById(id);
  const list = category.List;
  for (let j = 0; j < list.length; j++) {
    if (list[j].name === name) {
      list[j] = data;
    }
  }
  category.save();
  res.send(`the Item update successfully!`)
});

module.exports = router;

