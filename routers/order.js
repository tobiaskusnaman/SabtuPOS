var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const models = require('../models');
const Product = models.Product



router.get('/', (req,res)=>{
  Product.findAll().then((data)=>{
    res.render('order',{data})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/:id', (req,res)=>{
  res.send(req.body.itemId)
})
module.exports = router;
