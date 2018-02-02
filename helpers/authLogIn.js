function checkLogIn(req,res,next) {
  let isLoggedIn = req.session.isLogIn
  if (isLoggedIn) {
    next()
  } else {
    let err = 'You need to log in to access this site!'
    res.render('home',{err})
  }
}

module.exports = {checkLogIn};
