// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser')
// // const fs = require('fs');
// const fsPromises = require('fs').promises;
// const Category = require('../Data/Category.json');
// const categoryClass = require('../classes/Category')

// const categoryInstance = new categoryClass();
// const mongoose = require('mongoose');
// const { Int32, ListCollectionsCursor } = require('mongodb');


// mongoose.connect('mongodb://localhost:27017/Company', {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true
//     serverSelectionTimeoutMS: 5000, 
//     socketTimeoutMS: 45000,
// });

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', function () {
//     console.log('Connected to MongoDB');
// });

// const categorySchema = new mongoose.Schema({
//     ID: Number,
//     Descreption: String,
//     List: Array
// });

// const CategoryModel = mongoose.model('Category', categorySchema);

// router.get('/Category', async (req, res) => {
//     try {
//         const categories = await CategoryModel.find();
//         res.status(200).send(categories);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error retrieving categories');
//     }
// });


// router.post('/Category', async (req, res) => {
//     let data = req.body;
//         // await saveToFile(data);
//         try {
//             console.log(data)
//             const newCategory = new CategoryModel(data);
//             await newCategory.save();
//             res.send('Data saved successfully');
//         } catch (err) {
//             console.error(err);
//         }
//         res.send('Category added successfully.');
//     });


const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Company', {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

const categorySchema = new mongoose.Schema({
    ID: Number,
    Description: String,
    List: [{
        name: String
    }]
});

const CategoryModel = mongoose.model('Category', categorySchema);

router.get('/Category', async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.status(200).send(categories);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving categories');
    }
});

router.post('/Category', async (req, res) => {
    let data = req.body;
    try {
        const newCategory = new CategoryModel(data);
        await newCategory.save();
        res.send('Data saved successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving category');
    }
});














router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

// router.get('/Category', (req, res) => {

//   const sortedCategories = Category.sort((a, b) => a.Descreption.localeCompare(b.Descreption));
//   res.json(sortedCategories)
//   // res.status(200).send(Category.sort());
// });

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

// router.post('/Category', async (req, res) => {
//   let data = req.body;
//   try {
//     await saveToFile(data);
//     res.send('Data saved successfully');
//   } catch (err) {
//     console.error(err);
//   }
//   res.send('Category added successfully.');
// });


router.delete('/Category/:id', (req, res) => {
    const { id } = req.params;
    for (let i = 0; i < Category.length; i++) {
        if (Category[i].ID == id) {
            Category.splice(i, 1)
        }
    }
    categoryInstance.save(Category);
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
        categoryInstance.save(Category);
    } catch (err) {
        console.error(err);
    }
};


async function saveToFile2(data) {
    for (let i = 0; i < Category.length; i++) {
        if (Category[i].ID == data.ID) {
            Category[i].Descreption = data.Descreption;
        }
    }
    categoryInstance.save(Category);
};

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser');
// const Category = require('../classes/Category');
// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://ayala66610:<Z398dzJ3vjdm35bQ>@cluster0.1okfblo.mongodb.net/Second hand products', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   // Other options if needed
// });

// // mongoose.connect('mongodb+srv://ayala66610:<Z398dzJ3vjdm35bQ>@cluster0.1okfblo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: false }));

// router.get('/Category', async (req, res) => {
//     try {
//         const sortedCategories = await Category.find().sort({ Description: 1 });
//         res.json(sortedCategories);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error fetching categories');
//     }
// });

// router.get('/Category/:id', async (req, res) => {
//     try {
//         const category = await Category.findOne({ Id: req.params.id });
//         if (category) {
//             res.status(200).send(category);
//         } else {
//             res.status(404).send('Category not found');
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error finding category');
//     }
// });

// router.post('/Category', async (req, res) => {
//     const { Id, Description, List } = req.body;
//     const category = new Category({ Id, Description, List });
//     try {
//         await category.save();
//         res.send('Category added successfully');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error adding category');
//     }
// });

// router.delete('/Category/:id', async (req, res) => {
//     try {
//         await Category.deleteOne({ Id: req.params.id });
//         res.send('Category deleted successfully');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error deleting category');
//     }
// });

// router.put('/Category/:id', async (req, res) => {
//     const { Description, List } = req.body;
//     try {
//         await Category.findOneAndUpdate({ Id: req.params.id }, { Description, List });
//         res.send('Category updated successfully');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error updating category');
//     }
// });

// module.exports = router;








