var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const models = require('../models');
const User = models.User
const Product = models.Product
const Invoice = models.Invoice
const InvoiceDetail = models.InvoiceDetail

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
        InvoiceDetail.findAll({
          include : [Product],
          where : {
            InvoiceId : String(invoice[0].id)
          }

        }).then((details)=>{
          res.render('order',{data, invoice, details})
        })
        .catch(err=>{
          res.send(err)
        })
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
  InvoiceDetail.create({
    productId : req.params.id,
    quantity : 1,
    InvoiceId : req.params.idInvoice
  }).then(()=>{
    res.redirect('/order')
  })
  .catch(err=>{
    res.send(err)
  })
  // Invoice.findById(req.params.idInvoice).then((invoice)=>{
  //   res.send(invoice)
  // })
  // .catch(err=>{
  //   res.send(err)
  // })
})
module.exports = router;
