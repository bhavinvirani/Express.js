const { json } = require("express");
const ErrorHandler = require("../errors/ErrorHandler");

const apiKey = (req, res, next) => {
    const api_Key = process.env.API_KEY;
    const userApiKey = req.query.api_key;
    if(userApiKey && (userApiKey === api_Key)) {
        next()
    } else {
        next(ErrorHandler.forbidden("API key is not valid!!!"));
    }
}

module.exports = apiKey;