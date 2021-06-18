require('dotenv').config()
const express = require('express');
const path = require('path');
const mainRouter = require('./routes/index')

const productRouter = require('./routes/products')
const ErrorHandler = require('./errors/ErrorHandler');

const app = express();
const port = 3005 || process.env.PORT;


//? Templeting 
app.set('view engine', 'ejs')       //TODO: set EJS Engine as view engine
app.set("views", "views");          //TODO: set views folder for ejs latter ejs find views files in this folder
// console.log(app.get('view engine'));
// console.log(app.get('views'));      //? default check fore views of ejs in views folder


//!  define middlewares
//TODO: Define Static folder  
//? every express resource request look for this folder  // use for static data rendering
app.use(express.static("public"));

// express dose't receive json data from request / client
app.use(express.json());            //? 
// app.use(express.urlencoded({extended: false}));   //? for normal form post request  not for 'ajex'

//? Routers
//TODO: 
//* set prefix of request. if prefix is matchd then go throw thise routs 
app.use("/", mainRouter);           //* define routes  

//TODO: Global middleware
//* run on every incoming request
app.use(productRouter);             


//* globle Middleware
app.use((req, res, next) => {
    return res.json({ message: "Page not found" });
});


//* Error handling Middleware 
app.use((err, req, res, next) => {

    console.error(err);

    if (err instanceof ErrorHandler) {   //? error is object of ErrorHandler class
        res.status(err.status).json({
            error: {
                message: err.message,
                status: err.status
            }
        })
    } else {
        res.status(500).json({
            error: {
                message: err.message,
                status: err.status
            }
        })
    }
    // next();
});


app.listen(port, () => console.log(`Listening on port ${port}`));