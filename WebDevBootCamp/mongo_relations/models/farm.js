const mongoose = require('mongoose');
const { Schema } = mongoose;

const uri = "mongodb+srv://root:groot@kantordesign.ybqhf.mongodb.net/relationshipDemo?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongoDB connection open!");
    })
    .catch(err => {
        console.error("mongoDB connection failure:");
        console.log(err);
    })

const productSchema = new Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
});
const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//     { name: 'Goddess Melow', price: 4.99, season: 'Summer' },
//     { name: 'Sugar Baby Watermelon', price: 4.99, season: 'Summer' },
//     { name: 'Asparagus', price: 2.99, season: 'Spring' }
// ])

// const makeFarm = async () => {
//     const farm = new Farm({ name: 'Ful Belly Farms', city: 'Guinda, CA' });
//     const melon = await Product.findOne({ name: 'Goddess Melow' });
//     farm.products.push(melon);
//     farm.save();
//     console.log(farm);
// }

// makeFarm();

const addProduct = async () => {
    const farm = await Farm.findOne({ name: 'Ful Belly Farms' })
    console.log(farm);
    const watermelon = await Product.findOne({ name: 'Sugar Baby Watermelon' });
    console.log(watermelon);
    farm.products.push(watermelon);
    farm.save();
}

Farm.findOne({ name: 'Ful Belly Farms' })
    .populate('products')
    .then(farm => console.log(farm));




