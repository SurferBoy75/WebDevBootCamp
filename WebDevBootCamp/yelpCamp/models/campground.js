const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;
const { cloudinary } = require('../cloudinary');

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail')
    .get(function () {
        return this.url.replace('/upload', '/upload/w_200,h_150')
    })

const opts = {toJSON: {virtuals: true}};

const campgroundSchema = new Schema({
    meta: { created: Date },
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    campedHere: {
        type: Boolean,
        default: true,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

campgroundSchema.virtual('properties.popUpMarkup').
    get(function () {
        if (this.campedHere) {
            return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>`
        } else {
            return `<strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
            <p>Not Yet Camped!</p>`
        }
        
    })

campgroundSchema.virtual('when').
    get(function () {
        const createDate = this.meta.created;
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const miliSecondsInADay = 1000 * 60 * 60 * 24;
        const miliSecondsInAnHour = 1000 * 60 * 60;
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const daysSince = Math.floor((currentDate - createDate) / miliSecondsInADay);
        const hoursSince = Math.floor((currentDate - createDate) / miliSecondsInAnHour);
        // console.log(`days: ${daysSince}, hours: ${hoursSince}, current hour: ${currentHour}`)
        const displayDate = `${months[createDate.getMonth()]} ${createDate.getDate()}, ${createDate.getFullYear()}`;
        if (daysSince <= 32) {
            if (daysSince <= 7) {
                if (daysSince <= 3) {
                    if (daysSince <= 1) {
                        if (daysSince < 1) {
                            if (hoursSince <= 7) {
                                if (hoursSince < 3) {
                                    if (hoursSince < 1) {
                                        return 'moments ago';
                                    }
                                    return 'a couple hours ago';
                                }
                                return 'a few hours ago';
                            }
                            if (hoursSince <= currentHour) {
                                return 'today';
                            }
                        }
                        return 'yesterday';
                    }
                    return 'a few days ago';
                }
                return 'in the last week,';
            };
            return 'in the last month,';
        } else { return `on ${displayDate},` };
    });

    campgroundSchema.post('findOneAndDelete', async function (camp) {
        if (camp) {
            const reviewResp = await Review.deleteMany({
                _id: {
                    $in: camp.reviews
                }
            })

            if (camp.images) {
                for (let image of camp.images) {
                    console.log(image)
                    await cloudinary.uploader.destroy(image.filename);
                }
            }
            console.log(`CAMP DELETED!  Camp: ${camp.title} with id ${camp._id} was deleted on ${Date()}`);
            console.log(camp);
        }
    })
  

module.exports = mongoose.model('Campground', campgroundSchema);
