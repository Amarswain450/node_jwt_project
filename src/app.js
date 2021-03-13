require('dotenv').config()
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
const app = express();
const PORT = process.env.PORT;

//config database
require('./db/conn');
const EmpData = require('./models/emp');

//config morgan
morgan('tiny');

//config cookieParser
app.use(cookieParser());

//config bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//config static files
const static_path = path.join(__dirname,"../public");
app.use(express.static(static_path));

//config template engine
const template_path = path.join(__dirname,'../template/views');
const partial_path = path.join(__dirname,"../template/partials");
app.set('view engine', 'hbs');
app.set('views',template_path);
hbs.registerPartials(partial_path);


//config router
const mainRouter = require('../router/mainRouter');
app.use(mainRouter);




app.listen(PORT, () => {
    console.log(`server running on port number ${PORT}`);
});