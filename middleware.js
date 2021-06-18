const express = require("express");
const app = express();

app.use(logger);

app.get("/", (req, res) => {
    console.log("Home Page");
    res.send("Home Page");
});

app.get("/user", auth, (req, res) => {
    console.log(`User is Admin = ${req.admin}`);
    console.log("User Page");
    res.send("User Page");
});

function logger(req, res, next) {
    console.log("Logger");
    next();
}
function auth(req, res, next) { 
    if(req.query.admin === "true"){
        // res.send("Auth"); 
        req.admin = true;
        next();
    } else {
        res.send("No Auth");
    }
}

app.listen(3000);