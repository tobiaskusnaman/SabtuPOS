var express = require('express')
var router = express.Router()
const Models = require('../models');

router.get('/',function (req,res){
    Models.Product.findAll().then(data => {
      res.send(data)
  })
})


module.exports = router;
