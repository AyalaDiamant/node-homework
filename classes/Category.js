const fs = require('fs');
const fsPromises = require('fs').promises;
const CategoryJson = require('../Data/Category.json');


class Category {
  constructor(Id, Descreption, List) {
    this.Id = Id;
    this.Descreption = Descreption;
    this.List = List;
  }
  save(data) {
    fs.writeFileSync('./Data/Category.json', JSON.stringify(data));
  }
}

module.exports = Category;


// const fs = require('fs');
// const fsPromises = require('fs').promises;
// const mongoose = require('mongoose');

// const categorySchema = new mongoose.Schema({
//     Id: Number,
//     Description: String,
//     List: Array
// });

// const Category = mongoose.model('Category', categorySchema);

// module.exports = Category;
