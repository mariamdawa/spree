exports.getLoginPage = (req, res) => {
    res.render('login', {
        path: '/login',
        pageTitle: 'Login'

    });
}

exports.postLogin = (req, res) => {
    res.redirect('/shop/product-list');
}

exports.getSignUp = (req, res) => {
    res.render('signup', {
        path: '/signup',
        pageTitle: 'Sign Up'

    });
}