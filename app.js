const express = require('express');
const app = express();
const ejs = require('ejs')
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);
