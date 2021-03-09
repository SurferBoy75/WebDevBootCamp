const User = require('../models/user');
const passport = require('passport');

module.exports.renderRegForm = (req, res) => {
    res.render('users/register');
}

module.exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const regUser = await User.register(user, password);
        req.login(regUser, err => {
            if (err) return next(err);
            req.flash('success', 'Registration successful... Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    const { username } = req.body;
    req.flash('success', `${username} successfully logged into Yelp Camp`);
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    if (req.user) {
        const { username } = req.user;
        req.logout();
        req.flash('success', `${username} logged out successfully.  By Felicia!`);
    } else {
        req.flash('error', 'You are not currently logged in!');
    }
    return res.redirect('/campgrounds');
}