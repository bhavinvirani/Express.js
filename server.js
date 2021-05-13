require('dotenv').config()
const express = require('express');
const path = require('path');
const mainRouter = require('./routes/index')
const productRouter = require('./routes/products')
const ErrorHandler = require('./errors/ErrorHandler');

const app = express();
const port = 3000 || process.env.PORT;  

app.set('view engine', 'ejs')       //* set EJS Engine

//!  define middlewares
app.use(express.static("public"));  //* Define Static folder
app.use(express.json());            
// app.use(express.urlencoded({extended: false}));   

//* Routes
app.use("/", mainRouter);           //* define routes
app.use(productRouter);             //* define product routes

//* globle Middleware
app.use((req, res, next) => {
    return res.json({message: "Page not found"});
});


//* Error handling Middleware 
app.use((err, req, res, next) => {

    console.error(err);

    if(err instanceof ErrorHandler){
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
    next();
});


app.listen(port, () => console.log(`Listening on port ${port}`));