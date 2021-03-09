const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const campControl = require('../controllers/campgrounds');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(wrapAsync(campControl.index))
    .post(
        isLoggedIn,
        upload.array('image'),
        validateCampground,
        wrapAsync(campControl.createNew));

router.get('/new',
    isLoggedIn,
    campControl.renderNewForm);

router.route('/:id')
    .get(wrapAsync(campControl.show))
    .put(
        isLoggedIn,
        wrapAsync(isAuthor),
        upload.array('image'),
        validateCampground,
        wrapAsync(campControl.update))
    .delete(
        isLoggedIn,
        wrapAsync(isAuthor),
        wrapAsync(campControl.destroy));

router.get('/:id/update',
    isLoggedIn,
    wrapAsync(isAuthor),
    wrapAsync(campControl.edit));

module.exports = router;