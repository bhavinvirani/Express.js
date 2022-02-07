//TODO: contain all the routes
const path = require("path")
const router  = require('express').Router();
const apiKeyMiddleware = require('../middleware/apiKey')

router.get('/', (req, res) => {
    // res.send("<h1>Hello from Express</h1>");
    // res.sendFile(path.resolve(__dirname) + '/index.html');
    res.render('index', {
        title: "My home page"
    });
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: "My about page"
    });
})

router.get('/download', (req, res) => {
    res.download(path.resolve(__dirname) + '/products.js');   //? send this file whene this request accure
})

//*? apiKeyMiddleware runs first whene request come to this route. 
// router.get('/api/products', apiKeyMiddleware, (req, res) => {
//     res.json([
//         {
//             id:"123",
//             product_name: "google"
//         },
//         {
//             id:"124",
//             product_name: "brave"
//         }
//     ])
// })


module.exports = router;
