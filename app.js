const express = require('express');
const app = express();
const ejs = require('ejs')
app.set('views', './views')
app.set('view engine', 'ejs')

const RouteProduct = require('./routes/product');

app.use('/product', RouteProduct);

app.listen(3000);
