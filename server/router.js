const controller = require('./controllers');
const router = require('express').Router();
//catch all for products
router.get('/products*', controller.products.get);

module.exports = router;