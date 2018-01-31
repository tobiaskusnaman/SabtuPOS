const express = require('express');
const app = express();
const ejs = require('ejs')
app.set('views', './views')
app.set('view engine', 'ejs')

const RouteProduct = require('./routers/product');
const RouteHome = require('./routers/home');
const RouteOrder = require('./routers/order');
const RouteUser = require('./routers/user');
const session = require('express-session')

const authCheckLogin = require('./helpers/authLogIn');
const authAdmin = require('./helpers/authLogInAdmin');
app.use(session({
  secret: 'keyboard cat'
}))

app.use('/product',RouteProduct);
app.use('/user',authAdmin.authAdmin,RouteUser);
app.use('/', RouteHome);
app.use('/order',authCheckLogin.checkLogIn, RouteOrder)
app.use('/product', RouteProduct);



app.listen(3000);
