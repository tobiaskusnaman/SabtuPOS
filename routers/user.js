var express = require('express')
var router = express.Router()
const models = require('../models');
const bodyParser = require('body-parser')
const User = models.User

router.use(bodyParser.urlencoded({
  extended: false
}))
router.use(bodyParser.json())


// User home Page
router.get('/:id', (req, res) => {
  User.findById(req.params.id).then(row => {
      res.render('userHome', {
        row
      })
    })
    .catch(err => {
      res.send(err)
    })
});

// List user page
router.get('/:id/listUser', (req, res) => {
  let err
  if (req.query && req.query.hasOwnProperty('err')) {
    err = req.query.err
  }
  User.findAll().then(data => {
      res.render('user', {
        data: data,
        err: err
      });
    })
    .catch(err => {
      res.send(err)
    })
});

// ADD user
router.post('/:id/listUser', (req, res) => {
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
    .catch(err => {
      res.redirect(`/user/:id/listUser/?err=${err.message}`);
    })
});

// GET user by id
router.get('/listUser/edit/:id', (req, res) => {
  let err
  if (req.query && req.query.hasOwnProperty('err')) {
    err = req.query.err
  }
  User.findById(req.params.id).then(row => {
      res.render('user_edit', {
        row:row,
        err:err
      })
    })
    .catch(err => {
      res.send(err)
    })
});

  // UPDATE user
  router.post('/:id/listUser/edit/:id',(req,res)=>{
    User.findById(req.params.id).then(row =>{
      if (row) {
        row.update({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          type: req.body.typeUser,
          isMember: req.body.memberType
        }).then(() => {
          res.redirect('/user/:id/listUser')
        })
        .catch(err=>{
          res.redirect(`/listUser/edit/${req.params.id}/?err=${err.message}`);
        })
      }
    })
    .catch(err => {
      res.redirect(`/listUser/edit/:id/?err=${err.message}`);
    })
})

// DELETE User
router.get('/:id/listUser/delete/:id', (req, res) => {
  User.destroy({
      where: {
        id: req.params.id
      }
    }).then(() => {
      res.redirect('/user/:id/listUser');
    })
    .catch(err => {
      res.send(err)
    })
})

module.exports = router;
