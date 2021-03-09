const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync');
const reviewControl = require('../controllers/reviews');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware');

router.post('/',
    isLoggedIn,
    validateReview,
    wrapAsync(reviewControl.createNew));

router.delete('/:reviewId',
    isLoggedIn,
    wrapAsync(isReviewAuthor),
    wrapAsync(reviewControl.destroy));

module.exports = router;