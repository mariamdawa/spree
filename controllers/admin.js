const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/add-product', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/add-product',

        });
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title, req.body.image, req.body.price, req.body.desc, req.body.info);
    product.save();
    res.redirect('/admin/products');
};

exports.getAllProducts = (req, res) => {

    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',

        });
    });
};