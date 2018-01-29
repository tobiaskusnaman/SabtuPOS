const express = require('express');
const app = express();
const ejs = require('ejs')
app.set('views', './views')
app.set('view engine', 'ejs')

const RouteProduct = require('./routers/product');
const RouteHome = require('./routers/home');
const RouteOrder = require('./routers/order');

app.use('/', RouteHome)
app.use('/order', RouteOrder)
app.use('/product', RouteProduct);

app.listen(3000);
