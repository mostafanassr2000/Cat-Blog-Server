const loggedIn = (req, res, next) => {
    if (req.session.isAuth) {
        res.redirect('/')
    }else {
        next()
    }
}

module.exports = loggedIn