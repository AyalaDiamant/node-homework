const express = require('express');
const category = require('../Controllers/category.controller');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('/Category', category.getAllCategory);
router.get('/Category/:id', category.getCategoryById);
router.post('/Category', category.addCategory);
router.put('/Category/:id', category.updatedCategory);
router.delete('/Category/:id', category.deleteCategory);

module.exports = router;
