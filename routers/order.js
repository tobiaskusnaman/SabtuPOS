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
            InvoiceId : invoice[0].id
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
  InvoiceDetail.findOne({
    where : {
      ProductId : req.params.id,
      InvoiceId : req.params.idInvoice
    }
  }).then(data=>{
    if (data) {
      data.update({
        quantity : data.quantity+1
      }).then(()=>{
        res.redirect('/order')
      })
      .catch(err=>{
        res.send(err)
      })
    } else {
      let obj = {
        ProductId : req.params.id,
        quantity : 1,
        InvoiceId : req.params.idInvoice
      }

      InvoiceDetail.create(obj).then(()=>{
        res.redirect('/order')
      })
      .catch(err=>{
        res.send(err)
      })
    }
  })
})

router.post('/invoice/:id',(req,res)=>{
  Invoice.findById(req.params.id,{
    include :[Product]
  }).then(invoice=>{
    res.render('invoice',{invoice})
  })
  .catch(err=>{res.send(err)})
})

router.post('/receipt/:id', (req,res)=>{
  //kurangin quantity di Product


  //record data Customer di User
    User.create({
      email : req.body.email,
      type : req.body.type,
      isMember : req.body.memberType
    }).then((user)=>{
      Invoice.findById(req.params.id)
      .then(invoice => { //update status di INVOICES jadi TRUE
        invoice.update({
          customerId : user.id,
          status : 'TRUE',
          totalPrice : req.body.totalPrice,
          paymentMethod : req.body.paymentMethod
        }).then(invoice =>{

          res.send(invoice)
        })
      })
    })
})



module.exports = router;
