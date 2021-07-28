var express = require('express');
var router = express.Router();

const ctrlMain = require('../controllers/frontend/main');
const ctrlShop  = require('../controllers/frontend/shop');

/* GET home page. */
router.get('/', ctrlMain.index);

/* GET shop page. */
router.get('/shop', ctrlShop.shop);

module.exports = router;
