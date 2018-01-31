function authAdmin (req,res,next) {
  let isLoggedIn = req.session.isLogIn
  if (isLoggedIn && req.session.type == 'Admin') {
    next()
  } else {
    let err = 'Restricted Area! Login as admin to access this site'
    res.render('home', {err})
  }
}

module.exports = {authAdmin};
