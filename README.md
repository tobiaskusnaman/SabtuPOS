# SabtuPOS

router.get('/', (req,res)=>{
  Product.findAll().then((data)=>{
    InvoiceDetail.findAll({
      limit:1,
      order: [['createdAt', 'ASC']],
      where : {
        status : null
      }
    }).then((InvoiceDetail)=>{
      if (InvoiceDetail[0] == undefined) {
        console.log('**********************');
        InvoiceDetail.create().then((invoiceDetail)=>{
          console.log('QQQQQQQQQQQQQQ',InvoiceDetail);
          InvoiceDetail.findAll({
            limit : 1,
            order: [['createdAt', 'ASC']],
            where : {
              status : null
            }
          }).then((invoice)=>{
            console.log('+++++++++++++++++++++');
            res.render('order',{data,invoiceDetail})
          })
        })
        .catch(err=>{
          console.log('KEDEPAK');
          res.send(err)
        })
      } else {
        console.log('KEDEPAK 2');
        res.render('order',{data, invoiceDetail})
      }
    })
    .catch(err=>{
      console.log('KEDEPAK 3');
      res.send(err)
    })
  })
  .catch(err=>{
    res.send(err)
  })
})
