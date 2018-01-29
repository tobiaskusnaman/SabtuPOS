var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const models = require('../models');
const User = models.User
const Product = models.Product
const Invoice = models.Invoice

router.get('/', (req,res)=>{
  Product.findAll().then((data)=>{
    Invoice.findAll({
      limit:1,
      order: [['createdAt', 'ASC']],
      where : {
        status : null
      }
    }).then((invoice)=>{
      if (invoice[0] == undefined) {
        Invoice.create().then((invoice)=>{
          Invoice.findAll({
            limit : 1,
            order: [['createdAt', 'ASC']],
            where : {
              status : null
            }
          }).then((invoice)=>{
            res.render('order',{data,invoice})
          })
        })
        .catch(err=>{
          res.send(err)
        })
      } else {
        res.render('order',{data, invoice})
      }
    })
    .catch(err=>{
      res.send(err)
    })
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/:id/invoices/:idInvoice', (req,res)=>{
  Invoice.findById(req.params.idInvoice).then((invoice)=>{
    res.send(invoice)
  })
  .catch(err=>{
    res.send(err)
  })
  // res.send(req.params.idInvoice)
  // res.send(req.body)
})
module.exports = router;
