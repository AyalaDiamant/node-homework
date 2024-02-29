const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
// const fs = require('fs');
const fsPromises = require('fs').promises;
const Category = require('../Data/Category.json');
const categoryClass = require('../classes/Category')

const categoryInstance = new categoryClass();


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/Category', (req, res) => {

  const sortedCategories = Category.sort((a, b) => a.Descreption.localeCompare(b.Descreption));
  res.json(sortedCategories)
  // res.status(200).send(Category.sort());
});

router.get('/Category/:id', (req, res) => {
  req.params;
  const find = Category.find(e => e.ID == req.params.id)
  if (find) {
    res.status(200).send(find);
  }
  else {
    res.status(404).send('Category not found😒');
  }
});

router.post('/Category', async (req, res) => {
  let data = req.body;
  try {
    await saveToFile(data);
    res.send('Data saved successfully');
  } catch (err) {
    console.error(err);
  }
  res.send('Category added successfully.');
});


router.delete('/Category/:id', (req, res) => {
  const { id } = req.params;
  for(let i=0;i<Category.length;i++)
  {
    if(Category[i].ID==id)
    {
      Category.splice(i,1)
    }
  }  
  categoryInstance.save(Category) ;
  res.send('Category deleted successfully.');
});


router.put('/Category/:id', async (req, res) => {
  let data = req.body;
  try {
    await saveToFile2(data);
    res.send('Data saved successfully');
  } catch (err) {
    console.error(err);
  }
});


async function saveToFile(data) {
  Category.push(data);
  try {
    await fsPromises.writeFile(
      './Data/Category.json', JSON.stringify(Category), {
      encoding: "utf8",
      flag: "w",
      mode: 0o666
    });
    categoryInstance.save(Category) ;
  } catch (err) {
    console.error(err);
  }
};


async function saveToFile2(data) {
  for(let i=0;i<Category.length;i++)
  {
    if(Category[i].ID==data.ID)
    {
      Category[i].Descreption=data.Descreption;
    }
  }  
  categoryInstance.save(Category) ;
};

module.exports = router;









