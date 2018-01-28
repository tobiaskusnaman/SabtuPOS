var express = require('express')
var router = express.Router()
const Models = require('../models');
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/', (req,res)=>{
  Models.Product.findAll().then(data => {
      res.render('product', {data})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/', (req,res)=>{
  Models.Product.create({
    name : req.body.name,
    stock : req.body.stock,
    price : req.body.price,
    description : req.body.description,
    imgSource : req.body.imgSource,
    createdAt : new Date()
  }).then(()=>{
    res.redirect('/product')
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/edit/:id', (req,res)=>{
  Models.Product.findById(req.params.id).then(row =>{
    res.render('product_edit', {row})
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/edit/:id', (req,res)=>{
  Models.Product.findById(req.params.id).then(row =>{
    if (row) {
      row.updateAttributes({
        name : req.body.name,
        stock : req.body.stock,
        price : req.body.price,
        description : req.body.description,
        imgSource : req.body.imgSource
      }).then(row =>{
        res.redirect('/product')
      })
    }
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/delete/:id', (req,res)=>{
  Models.Product.destroy({
    where : {
      id : req.params.id
    }
  }).then(()=>{
    res.redirect('/product')
  })
})


module.exports = router;
