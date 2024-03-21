const express = require('express');
const router = express.Router();
const CategoryModel = require('../Models/Category.model')

router.get('/Category', async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        console.log(CategoryModel);
        res.status(200).send(categories);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving categories');
    }
});

router.get('/Category/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const category = await CategoryModel.findById(id);
        if(!category)
        {
            res.status(404).send('Category not found');
            return;
        };
        res.send(category);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving categories');
    }
});

router.post('/Category', async (req, res) => {
    let data = req.body;
    console.log(data);
    try {
        const newCategory = new CategoryModel({
            Description: data.Description,
            List: data.List
        })
        await newCategory.save();
        res.send('Data saved successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving category');
    }
});


router.delete('/Category/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const category = await CategoryModel.findByIdAndDelete(id);
        if (!category) {
            res.status(404).send('Category not found');
            return;
        }
        // await Category.deleteOne({ Id: req.params.id });
        res.send('Category deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting category');
    }
});

router.put('/Category/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { Description, List } = req.body;

        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            id,
            { Description, List },
            { new: true }
        );

        if (!updatedCategory) {
            res.status(404).send('Category not found');
            return;
        }
        res.status(200).send(updatedCategory);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating category');
    }
});

module.exports = router;
