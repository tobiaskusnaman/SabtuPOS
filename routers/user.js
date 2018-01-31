var express = require('express')
var router = express.Router()
const models = require('../models');
const bodyParser = require('body-parser')
const User = models.User
const authHelper = require('../helpers/authLogInAdmin');

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

  // LOGIN
  router.get('/:id/listUser', authHelper.authAdmin, (req, res) => {
    User.findAll().then(data => {
        res.render('user',{data: data});
      })
      .catch(err =>{
        res.send(err)
      })
  });
  // User home Page
  router.get('/:id', authHelper.authAdmin, (req,res)=>{
    User.findById(req.params.id).then(row =>{
      res.render('userHome', {row})
    })
    .catch(err=>{
      res.send(err)
    })
  });

  // ADD user
  router.post('/:id/listUser', authHelper.authAdmin, (req, res) => {
    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      type: req.body.typeUser,
      isMember: req.body.memberType
    })
      .then(() => {
        res.redirect('/user/:id/listUser');
      })
      .catch(err=>{
        res.send(err)
      })
  });

// GET user by id
  router.get('/:id/listUser/edit/:id', authHelper.authAdmin, (req,res)=>{
    User.findById(req.params.id).then(row =>{
      res.render('user_edit', {row})
    })
    .catch(err=>{
      res.send(err)
    })
  });

  // UPDATE user
  router.post('/:id/listUser/edit/:id', authHelper.authAdmin, (req,res)=>{
    User.findById(req.params.id).then(row =>{
      if (row) {
        row.update({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          type: req.body.typeUser,
          isMember: req.body.memberType
        }).then(() =>{
          res.redirect('/user/:id/listUser')
        })
      }
    })
    .catch(err=>{
      res.send(err)
    })
  })

  // DELETE User
  router.get('/:id/listUser/delete/:id', authHelper.authAdmin, (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => {
        res.redirect('/user/:id/listUser');
      })
      .catch(err=>{
        res.send(err)
      })
  })

module.exports = router;
