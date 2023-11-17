const controller = require('./controllers');
const router = require('express').Router();

router.get('/products*', controller.products.get);
//TODO: Add /qa* controller
//TODO: Add /reviews* controller

module.exports = router;