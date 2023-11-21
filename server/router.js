const controller = require('./controllers');
const router = require('express').Router();

router.get('/products*', controller.products.get);
//TODO: Add /qa* controller
router.get('/reviews*', controller.reviews.get);

module.exports = router;