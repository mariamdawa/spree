const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/edit-product', {
            prods: products,
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing: false

        });
    });
};

exports.postAddProduct = (req, res, next) => {

    const product = new Product(null, req.body.title, req.body.image, req.body.price, req.body.desc, req.body.info);
    product.save();
    res.redirect('/admin/products');
};


exports.getEditProduct = (req, res, next) => {
    //?edit=true, query params
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {

        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });

    });


};


exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedProduct = new Product(prodId, req.body.title, req.body.image, req.body.price, req.body.desc, req.body.info);
    //console.log("POST edit product");
    //console.log(updatedProduct);
    updatedProduct.save();
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


exports.postDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    console.log(prodId);
    Product.deleteById(prodId);

    res.redirect('/admin/products');
};