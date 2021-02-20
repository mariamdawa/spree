const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',

        });
    });
};

exports.getIndex = (req, res) => {
    Product.fetchAll(products => {

        res.render('shop/index', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',

        });
    });
};

exports.getCart = (req, res) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'

    });
}

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    });
    console.log("postCart");
    console.log(prodId);
    res.redirect('/cart');
};


exports.getCheckout = (req, res) => {
        res.render('shop/checkout', {
            path: '/checkout',
            pageTitle: 'Checkout'
        });
    }
    //console.log(products[0].title);
exports.getProductDetail = (req, res) => {
    const prodId = req.params.productId;
    // console.log(prodId);
    Product.findById(prodId, product => {
        // console.log(product);
        // console.log(prodId);
        res.render('shop/product-detail', {
            product: product,
            pageTitle: 'Product Detail',
            path: '/products',

        });
    });


}