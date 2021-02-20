const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {

    static addProduct(id, productPrice) {

        //Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            //First we check if we have this product before we want to increase quantity
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                //here we want to increase quantity
                updatedProduct = {...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                //replace the old product with a new in cart object=> cart.products[]
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                //that means we have a new product 
                updatedProduct = { id: id, qty: 1 };
                //add the new product(updated product ) to a cart object =>cart.products[]
                cart.products = [...cart.products, updatedProduct];

            }

            //we want to update cart price:
            cart.totalPrice = cart.totalPrice + +productPrice; //adding + to convert productPrice to int

            //save in a file:
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });

    }
}