const router = require('express').Router();
const Product = require("../../models/Product");
const multer = require('multer');

router.route('/').get((req,res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
   const shopname = req.body.shopname;

    const newProduct = new Product({
        name,
        description,
        price,
        shopname
        
    });

    newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/:id').get((req,res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req,res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product deleted.'))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/update/:id').post((req,res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.name = req.body.name;
            product.description = req.body.description;
            product.price = req.body.price;
            product.shopname = req.body.shopname;

            product.save()
                .then(() => res.json('Product updated!'))
                .catch(err => res.status(400).json('Error: '+err));
        })
        .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;