
const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.DB_CONNECTION_STRING, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

const categorySchema = new mongoose.Schema({
  Description: String,
  List: Array,
}, {versionKey: false});


const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
