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

app.use(session({
  secret: 'keyboard cat'
}))

app.use('/product',RouteProduct);
app.use('/user',RouteUser);
app.use('/', RouteHome)
app.use('/order', RouteOrder)
app.use('/product', RouteProduct);

app.get('/signOut', (req,res)=>{
  req.session.destroy(err=>{
    if (!err) {
      res.redirect('/')
    } else {
      res.send(err)
    }
  })
  res.send('logout men')
})


app.listen(3000);
