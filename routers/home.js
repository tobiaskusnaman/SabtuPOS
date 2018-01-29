var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const models = require('../models');
const User = models.User

router.get('/',(req,res)=>{
  res.render('home')
})

router.post('/', (req,res)=>{
  res.send(req.body)
})

router.post('/register',(req,res)=>{
  // console.log(req.body);
  res.send(req.body)
})

module.exports = router;
