const CategoryModel = require('../Models/category.model');


const getAllItem = ('', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  console.log(CategoryModel);
  const category = await CategoryModel.findById(id);
  if (!category) {
    res.status(404).send('Category not found');
    return;
  }
  res.send(category);
});

const addItem = ('', async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  const newItem = data;
  console.log(newItem);
  const category = await CategoryModel.findById(id);
  category.List.push(newItem);
  category.save();
  res.send(newItem);
});

const deleteItem = ('', async (req, res) => {
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
  res.send('the Item deleted successfully!');
});


const updateItem = ('', async (req, res) => {
  console.log(CategoryModel);
  const id = req.params.id;
  const name = req.params.name;
  const data = req.body;
  const category = await CategoryModel.findById(id);
  const list = category.List;
  for (let j = 0; j < list.length; j++) {
    if (list[j].name === name) {
      list[j] = data;
    }
  }
  category.save();
  res.send('the Item update successfully!');
});

module.exports = {
  getAllItem,
  addItem,
  deleteItem,
  updateItem,
};

