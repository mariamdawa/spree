const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/men', shopController.getProductsMale);
router.get('/products/women', shopController.getProductsFemale);


router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/checkout', shopController.getCheckout);

///:productId that means it's a dynamic route
router.get('/products/:productId', shopController.getProductDetail);


router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/wishlist', shopController.getWishList);

<<<<<<< HEAD


=======
>>>>>>> 18775f7dfde1e8686b11fa6a2c29f53c5e28d2b6
module.exports = router;