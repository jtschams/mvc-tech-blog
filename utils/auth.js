module.exports = {
  checkAuth: function(req, res, next) {
    if (!req.session.loggedIn) {
      return res.redirect('/login');
    } else {
      next();
    }
  }
}