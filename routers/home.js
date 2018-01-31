var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const models = require('../models');
const User = models.User

router.get('/',(req,res)=>{
  res.render('home', {
    err : null
  })
})

router.post('/', (req,res)=>{
  User.findOne({
    where : {
      email : req.body.email,
      password : req.body.password
    }
  }).then(dataUser=>{
    if (dataUser) {
      req.session.isLogIn = true
      req.session.name = `${dataUser.firstName} ${dataUser.lastName}`
      req.session.type = dataUser.type
      if (dataUser.type == 'Admin') {
        res.redirect(`/user/${dataUser.id}`)
      } else {
        res.redirect(`/order`)
      }
    } else {
      res.render('home', {
        err:'email atau password yang anda masukan salah'
      })
    }
  })
  // res.send(req.body)
})

router.get('/signOut', (req,res)=>{
  req.session.destroy(err=>{
    if (!err) {
      let err = 'You have logged out'
      res.render('home',{err})
    } else {
      res.send(err)
    }
  })
})


module.exports = router;
