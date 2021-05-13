//TODO: contain all the routes releted to Products.

const router  = require('express').Router();
const ErrorHandler = require('../errors/ErrorHandler');
const apiKeyMiddleware = require('../middleware/apiKey');
let products = require('../productsData')


router.get('/products', (req, res) => {
    res.render("products", {
        title: 'My Products Page'
    });
});

router.get("/api/products", (req, res) => { 
    res.send(products)
});

router.post("/api/products", apiKeyMiddleware,(req, res, next) => { 

    const {name, price}  = req.body;
    console.log(req.body);

    if(!name || !price){

        next(ErrorHandler.validationError("Name and Price filds are required"));
        // throw new Error("All fields are required")
        // return res.status(422).json({error:"All fields are required"});
        return;
    } 
    const newProduct = {
        id: new Date().getTime().toString(),
        name: name,
        price: price
    }
    products.push(newProduct);
    res.json(newProduct);
})

//* for Delete product
router.delete("/api/products/:productId", apiKeyMiddleware,(req, res) => {
    products = products.filter(product => req.params.productId !== product.id);
    res.json({status:"OK"});
})


module.exports = router;
