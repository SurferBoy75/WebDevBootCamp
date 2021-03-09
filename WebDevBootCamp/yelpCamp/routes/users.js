const express = require('express');
const passport = require('passport');
const { isLoggedIn } = require('../middleware');
const wrapAsync = require('../utils/wrapAsync');
const userControl = require('../controllers/users');

const router = express.Router();

router.route('/register')
    .get(
        isLoggedIn,
        userControl.renderRegForm)
    .post(
        isLoggedIn,
        wrapAsync(userControl.register))

router.route('/login')
    .get(userControl.renderLoginForm)
    .post(passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/login'
    }), userControl.login);

router.get('/logout', userControl.logout);

module.exports = router;
