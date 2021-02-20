const fs = require('fs');
const path = require('path');

//to generate a unique id to each product
const { v4: uuidv4 } = require('uuid');


const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};


module.exports = class Product {
    constructor(title, image, price, desc, info) {
        this.title = title;
        this.image = image;
        this.price = price;
        this.desc = desc;
        this.info = info;
    }

    save() {

        ///console.log(this.id);
        getProductsFromFile(products => {
            //check if we have that id tha means we want to edit
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;

                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log(err);
                });
            } else {
                //add new property: id
                this.id = uuidv4();

                products.push(this);

                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log(err);
                });
            }


        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            console.log("My product");
            //console.log(product);
            cb(product);
        });

    }
};