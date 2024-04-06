const express = require('express');
const item = require('../Controllers/item.controller');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('/CategoryItem/:id', item.getAllItem);
router.post('/CategoryItem/:id', item.addItem);
router.put('/CategoryItem/:id/:name', item.updateItem);
router.delete('/CategoryItem/:id/:name', item.deleteItem);

module.exports = router;
