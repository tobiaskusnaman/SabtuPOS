'use strict';

module.exports = (app, db) => {

  // LOGIN
  app.get('/', (req, res) => {
    db.users.findAll()
      .then(users => {
        res.json(users);
      });
  });

  // GET user by id
  app.get('/admin/:id', (req, res) => {
    const id = req.params.id;
    db.users.find({
      where: { id: id}
    })
      .then(users => {
        res.json(users);
      });
  });

  // ADD user
  app.post('/admin/user', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const type = req.body.type;
    const isMember = req.body.type;
    db.users.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      type: type,
      isMember: isMember
    })
      .then(users => {
        res.json(users);
      })
  });

  // UPDATE user
  app.patch('/admin/user/edit/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body.updates;
    db.users.find({
      where: { id: id }
    })
      .then(users => {
        return users.updateAttributes(updates)
      })
      .then(updatedUser => {
        res.json(updatedUser);
      });
  });

  // DELETE User
  app.delete('/admin/user/delete/:id', (req, res) => {
    const id = req.params.id;
    db.users.destroy({
      where: { id: id }
    })
      .then(deletedUser => {
        res.json(deletedUser);
      });
  });
};