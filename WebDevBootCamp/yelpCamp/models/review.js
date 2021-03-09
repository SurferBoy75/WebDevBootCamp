const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    meta: { created: Date },
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

reviewSchema.virtual('when').
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

module.exports = mongoose.model('Review', reviewSchema);
