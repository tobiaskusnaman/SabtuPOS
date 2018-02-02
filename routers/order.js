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
const getInvoice = require('../invoice.js');
const sendEmail = require('../helpers/emailFeature.js');

router.get('/',
  function(req,res,next){
    Invoice.findOrCreate({where: {status: null}})
      .spread((invoice, created) => {
        console.log(invoice.get({
        plain: true
      }))
    }).then(()=>{

      next()
    })
  }
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
            let errMsg = `${product.name} is sold out`
            res.redirect(`/order/?err=${errMsg}`)
          }
        })
      } else {
        if (invoice.Product.stock <= invoice.quantity) {
          let errMsg = 'barang sudah habis'
          res.redirect(`/order/?err=${errMsg}`)
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

router.get('/invoice/:id/delete/:item_id',(req,res)=>{
  InvoiceDetail.destroy({
    where : {
      ProductId : req.params.item_id,
      InvoiceId : req.params.id
    }
  }).then(()=>{
    res.redirect('/order')
  })


})


router.post('/invoice/:id', (req,res)=>{
  Product.findEmptyStock().then(emptyStocks => {
    Invoice.findById(req.params.id,{
      include :[Product]
    }).then(invoice=>{
      res.render('invoice',{invoice,emptyStocks})
    })
    .catch(err=>{res.send(err)})
  })
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
         if (user.email) {
           Invoice.findProduct(user.id).then(result =>{
             getInvoice.getInvoice(user,result)
             res.render('sendEmail',{
               id : req.params.id,
               user})

           })
         } else {
           res.redirect('/order')
         }
       })
     })
  })
})

  router.post('/receipt/:id/sendInvoice/:id_user', (req,res)=>{
    User.findById(req.params.id_user)
    .then(user => {
      if (req.body.isSend == 'true') {
        sendEmail(user.email,'receipt.pdf')
        res.redirect('/order')
      } else {
        res.redirect('/order')
      }
    })
  })


module.exports = router;
