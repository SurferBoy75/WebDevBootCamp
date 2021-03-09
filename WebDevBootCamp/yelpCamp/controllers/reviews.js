const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createNew = async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    newReview.meta.created = Date.now();
    camp.reviews.push(newReview);
    await newReview.save();
    await camp.save();
    req.flash('success', 'Review added successfully!');
    res.redirect(`/campgrounds/${camp._id}`);
}

module.exports.destroy = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted successfully!');
    res.redirect(`/campgrounds/${id}`);
}