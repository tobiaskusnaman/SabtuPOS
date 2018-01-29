var express = require('express')
var router = express.Router()
const models = require('../models');
const bodyParser = require('body-parser')
const User = models.User

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

  // LOGIN
  router.get('/', (req, res) => {
    User.findAll().then(data => {
        res.render('user',{data});
      })
      .catch(err =>{
        res.send(err)
      })
  });
  // ADD user
  router.post('/user', (req, res) => {
    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      type: req.body.type,
      isMember: req.body.isMember
    })
      .then(() => {
        res.redirect('/admin');
      })
      .catch(err=>{
        res.send(err)
      })
  });

// GET user by id
  router.get('/user/edit/:id', (req,res)=>{
    User.findById(req.params.id).then(row =>{
      res.render('user_edit', {row})
    })
    .catch(err=>{
      res.send(err)
    })
  });

  // UPDATE user
  router.post('/user/edit/:id', (req,res)=>{
    User.findById(req.params.id).then(row =>{
      if (row) {
        row.update({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          type: req.body.type,
          isMember: true
        }).then(() =>{
          res.redirect('/admin')
        })
      }
    })
    .catch(err=>{
      res.send(err)
    })
  })

  // DELETE User
  router.get('/user/delete/:id', (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => {
        res.redirect('/admin');
      })
      .catch(err=>{
        res.send(err)
      })
  })

module.exports = router;
