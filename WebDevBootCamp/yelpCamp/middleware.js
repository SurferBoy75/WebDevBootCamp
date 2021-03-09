const Campground = require('./models/campground.js');
const Review = require('./models/review.js');
const { campgroundSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
    console.log('isLoggedIn?')
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'Log in required before processing this request...');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    console.log("isAuthor?")
    const { id } = req.params;
    const currentCamp = await Campground.findById(id);
    if (!currentCamp.author.equals(req.user._id)) {
        req.flash('error', 'Permission Denied... You do not own this campground entry!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const currentReview = await Review.findById(reviewId);
    if (!currentReview.author.equals(req.user._id)) {
        req.flash('error', 'Permission Denied... You do not own this review!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}