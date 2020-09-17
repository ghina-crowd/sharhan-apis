var express = require("express");
var bodyparser = require('body-parser');
var morgan = require('morgan');
var companyRouter = require('./controller/Company');
var PartnerRouter = require('./controller/Partner');
var ContactRouter = require('./controller/Contact');

var defaultMiddleware = require('./middleware/defaultMiddleware.js');
var config = require('./constant/config.js');
var UploadRouter = require('./controller/upload');
var { expressSharp, FsAdapter } = require('express-sharp')


//need to remove this maybe just for testing in local host.

var cors = require('cors')
var app = express();

//for images & Documents only

app.use('/images', expressSharp({ imageAdapter: new FsAdapter(__dirname + "/images"), }))
app.use(express.static(__dirname, { dotfiles: 'allow' }));
app.use("/Documents", express.static(__dirname + "/Documents", { fallthrough: false }));


var i18n = require("i18n");

i18n.configure({
    locales: ['en', 'ar'],
    directory: __dirname + '/constant'
});



//for making image folder
app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(morgan(config.PROFILE));


app.use(function (req, res, next) {
    if (req.headers.language || req.headers["accept-language"]) {
        if (req.headers.language) { exports.acceptedLanguage = req.headers.language; i18n.setLocale(req.headers.language); } else { exports.acceptedLanguage = req.headers["accept-language"]; i18n.setLocale(req.headers["accept-language"]); }
    } else {
        exports.acceptedLanguage = 'en'
        i18n.setLocale('en');
    }

    defaultMiddleware(req, res);
    next();
});

app.get("/", function (req, res) {
    res.send("Sharhan");
});

//Register routers
app.use('/upload', UploadRouter);
app.use('/company', companyRouter);
app.use('/partner', PartnerRouter);
app.use('/contact', ContactRouter);



module.exports = app;