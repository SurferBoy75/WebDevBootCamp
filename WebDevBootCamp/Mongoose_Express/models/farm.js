const mongoose = require('mongoose');
const Product = require('./product');
const { Schema } = mongoose;

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide the name of the Farm']
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address']
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

farmSchema.post('findOneAndDelete', async function (farm) {
    if (farm.products.length) {
        const resp = await Product.deleteMany({ _id: { $in: farm.products } })
        console.log(resp);
    }
})

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;





