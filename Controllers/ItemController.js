const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const fs = require('fs');
// const fsPromises = require('fs').promises;
const category = require('../Data/Category.json');
const ItemClass = require('../classes/Item')

const itemInstance = new ItemClass();

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))


router.get('/categoryItem/:descreption', (req, res) => {
  const descreption = req.params.descreption;
  category.forEach(e => {
    if (e.Descreption == descreption)
      res.send(e.List.sort((a,b) => a.name.localeCompare(b.name)));
  })
});


router.post('/category/:name', (req, res) => {
  const newdetails = req.body;
  console.log(newdetails);
  const params = req.params.name;
  category.forEach(e => { console.log(e.Descreption); if (e.Descreption === params) { e.List.push(newdetails); console.log('hii') } })

  itemInstance.save(category) ;

  res.send(newdetails);
});


router.delete('/category/:descreption/:name', (req, res) => {
  const descreption = req.params.descreption;
  const name = req.params.name;
  console.log(descreption + " " + name);
  for (let i = 0; i < category.length; i++) {
    if (category[i].Descreption == descreption) {
      for (let j = 0; j < category[i].List.length; j++) {
        if (category[i].List[j].name === name) {
          category[i].List.splice(j, 1);
        }
      }
    }
  }
  itemInstance.save(category) ;
  res.send(`the Item deleted successfully.`)
});


router.put('/category/:descreption/:name', async (req, res) => {
  const descreption = req.params.descreption;
  const name = req.params.name;
  console.log(descreption + " " + name);
  let data = req.body;
  for (let i = 0; i < category.length; i++) {
    if (category[i].Descreption === descreption) {
      for (let j = 0; j < category[i].List.length; j++) {
        if (category[i].List[j].name == name) {
          category[i].List[j] = data;
        }
      }
    }
  }
  itemInstance.save(category) ;
  res.send(`the Item update successfully.`)
});

module.exports = router;

