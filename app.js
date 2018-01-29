const express = require('express');
const app = express();
const ejs = require('ejs')
app.set('views', './views')
app.set('view engine', 'ejs')

const RouteProduct = require('./routers/product');
const RouteUser = require('./routers/user');

app.use('/product', RouteProduct);
app.use('/user', RouteUser);



app.listen(3000);
