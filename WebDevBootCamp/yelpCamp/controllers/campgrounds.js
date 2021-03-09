const Campground = require('../models/campground');
const { cloudinary } = require('../cloudinary');

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

//temporary locig helpers -----------------------------------------------------------
const cities = require('../seeds/cities');
//-----------------------------------------------------------------------------------

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new')
};

module.exports.createNew = async (req, res) => {
    const newCamp = new Campground(req.body.campground);

    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 3
    }).send()
    console.log(geoData.body.features);

    newCamp.geometry = geoData.body.features[0].geometry;
    newCamp.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    newCamp.author = req.user._id;
    newCamp.meta.created = Date.now();

    await newCamp.save();

    console.log(newCamp);

    req.flash('success', 'Campground added successfully!');
    res.redirect(`/campgrounds/${newCamp._id}`);
}

module.exports.show = async (req, res) => {
    const camp = await Campground.findById(req.params.id)
        .populate({
            path: 'reviews',
            populate: {
                path: 'author'
            }
        })
        .populate('author');
    if (!camp) {
        req.flash('error', 'Campground not found!');
        return res.redirect('/campgrounds');
    }

    res.render('campgrounds/show', { camp });
}

module.exports.edit = async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    if (!camp) {
        req.flash('error', 'Campground not found!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { camp });
}

module.exports.update = async (req, res) => {
    const { id } = req.params;
    console.log(req.body.campground);
    const updatedCamp = await Campground.findByIdAndUpdate(id, { ...req.body.campground });

    console.log(updatedCamp);

    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 3
    }).send()
   
    updatedCamp.geometry = geoData.body.features[0].geometry;

    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    updatedCamp.images.push(...imgs);
    await updatedCamp.save();

    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        const resp = await updatedCamp.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }

    req.flash('success', 'Campground updated successfully!');
    res.redirect(`/campgrounds/${updatedCamp._id}`);
}

module.exports.destroy = async (req, res) => {
    const trash = await Campground.findByIdAndDelete(req.params.id);
    req.flash('success', 'Campground deleted successfully!');
    res.redirect('/campgrounds');
}