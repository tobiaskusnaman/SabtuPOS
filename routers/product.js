var express = require('express')
var router = express.Router()
const models = require('../models');
const bodyParser = require('body-parser')
const Product = models.Product

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

//List Product
router.get('/:id/listProduct', (req,res)=>{
  let err
  if (req.query && req.query.hasOwnProperty('err')) {
    err = req.query.err
  }
  Product.findAll().then(data => {
      res.render('product', {
        data: data,
        err:err
      })
  })
  .catch(err=>{
    res.send(err)
  })
})
//Add product
router.post('/addProduct', (req,res)=>{
  Product.create({
    name : req.body.name,
    stock : req.body.stock,
    price : req.body.price,
    description : req.body.description,
    imgSource : req.body.imgSource,
    createdAt : new Date()
  }).then(()=>{
    res.redirect(`/product/:id/listProduct`)
  })
  .catch(err=>{
    res.redirect(`/product/:id/listProduct/?=err${err.message}`)
  })
})
//GET edit
router.get('/listProduct/edit/:id', (req,res)=>{
  Product.findById(req.params.id).then(row =>{
    res.render('product_edit', {row})
  })
  .catch(err=>{
    res.send(err)
  })
})
//POST edit
router.post('/listProduct/edit/:id', (req,res)=>{
  Product.findById(req.params.id).then(row =>{
    if (row) {
      row.updateAttributes({
        name : req.body.name,
        stock : req.body.stock,
        price : req.body.price,
        description : req.body.description,
        imgSource : req.body.imgSource
      }).then(row =>{
        res.redirect('/product/:id/listProduct')
      })
    }
  })
  .catch(err=>{
    res.send(err)
  })
})

router.get('/delete/:id/', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
      res.redirect('/product/:id/listProduct');
    })
    .catch(err=>{
      res.send(err)
    })
})


module.exports = router;
