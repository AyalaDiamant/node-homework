const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    ID: Number, 
    Description: String,
    List: [String] 
});

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
