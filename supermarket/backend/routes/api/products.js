
const router = require('express').Router();
const Product = require("../../models/Product");
const Files = require("../../models/File");
const multer = require('multer');
const mongoose  = require("mongoose");
const File = mongoose.model("file");

const storage = multer.diskStorage({
    destination: "./public/",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
 });

const fileFilter = (req,file,cb) => {
    if(file.mimetype === "image/jpg"  || 
       file.mimetype ==="image/jpeg"  || 
       file.mimetype ===  "image/png"){
            cb(null,true);
       }else{
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false); 
       }
}

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 }).single("myfile");

const obj = (req,res) => {
    upload(req,res,() => {
        console.log("file",req.file);
        const file = new File();
        file.meta_data = req.file;
        file.save().then(()=> {
            res.send({message:"uploaded successfully"})
        })
    
    });
}
router.route('/').get((req,res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: '+err));
});

router.post("/upload", obj);

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
   const shopname = req.body.shopname;
    const images = req.files; 
    const newProduct = new Product({
        name,
        description,
        price,
        shopname,
        images
        
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