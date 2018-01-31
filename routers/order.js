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

router.get('/',
  function(req,res,next){
    //CEK masi ada invoice yang statusnya masi blm TRUE atau gk
    Invoice.findAll({
      limit : 1,
      order : [['createdAt', 'ASC']],
      where : {
        status : null
      }
    }).then((invoice)=>{
      if(invoice[0] == undefined){
        Invoice.create().then((invoice)=>{
          Invoice.findAll({
            limit : 1,
            order: [['createdAt', 'ASC']],
            where : {
              status : null
            }
          }).then((invoice)=>{
            let err
            res.redirect('/order')
          })
        })
        .catch(err=>{
          res.send(err)
        })
      }
    })
    next()
  }
  //--------------------- selesai cek -------------------------
  ,(req,res)=>{
  Product.findAll().then((data)=>{
    Invoice.findAll({
      limit:1,
      order: [['createdAt', 'ASC']],
      where : {
        status : null
      }
    }).then((invoice)=>{
        InvoiceDetail.findAll({
          include : [Product],
          where : {
            InvoiceId : invoice[0].id
          }
        }).then((details)=>{
          let err
          if (req.query && req.query.hasOwnProperty('err')){
             err = req.query.err
           }
          res.render('order',{data, invoice, details, err})
        })
        .catch(err=>{
          res.send(err)
        })
    })
    .catch(err=>{
      res.send(err)
    })
  })
  .catch(err=>{
    res.send(err)
  })
})

router.post('/:id/invoices/:idInvoice',
  function(req,res,next){

    //CEK kira2 klo abis nambah barang, stock nya masi ada atau gak
    InvoiceDetail.findOne({
      include : [Product],
      where : {
        ProductId : req.params.id,
        InvoiceId : req.params.idInvoice
      }
    }).then(invoice=>{
      if(invoice == null){
        Product.findById(req.params.id).then((product)=>{
          if (product.stock>0) {
            next()
          } else {
            // res.redirect(`/order/?err=${err.message}`)
            res.redirect(`/order/?err=sudahhabis`)
          }
        })
      } else {
        if (invoice.Product.stock <= invoice.quantity) {
          res.redirect(`/order/?err=sudahhabis`)
        } else {
          next()
        }
      }

    }).catch(err=>res.send(err))
  }

  ,(req,res)=>{
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

router.post('/invoice/:id', (req,res)=>{
  Invoice.findById(req.params.id,{
    include :[Product]
  }).then(invoice=>{
    res.render('invoice',{invoice})
  })
  .catch(err=>{res.send(err)})
})

router.post('/receipt/:id', (req,res)=>{
  let promise = []
  InvoiceDetail.findAll({
    include : [Product],
    where : {
      InvoiceId : req.params.id
    }
  }).then(details =>{
    details.forEach(detail => {
      promise.push(Product.update({
        stock : (detail.Product.stock - detail.quantity)
      }, {
        where : {
          id : detail.ProductId
        }
      }))
    })
  })

  Promise.all(promise).then(()=>{
    User.create({
       email : req.body.email,
       type : req.body.type,
       isMember : req.body.memberType
     }).then((user)=>{
       Invoice.update({
         customerId : user.id,
         status : 'TRUE',
         totalPrice : req.body.totalPrice,
         paymentMethod : req.body.paymentMethod
       }, {
         where : {
           id : req.params.id
         }
       }).then(()=>{
         res.redirect('/order')
       })
     })
  })


})



module.exports = router;
