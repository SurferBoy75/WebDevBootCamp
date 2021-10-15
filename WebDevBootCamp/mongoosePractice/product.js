const mongoose = require('mongoose');

const uri = "mongodb+srv://root:groot@kantordesign.ybqhf.mongodb.net/shopApp?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongoDB connection open!");
    })
    .catch(err => {
        console.error("mongoDB connection failure:");
        console.log(err);
    })

console.log("Now logging and listening in Mongoose Practise/product... ")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price can not be a negative number']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: {
        type: [String],
        default: ['cycling']
    },
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
})

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    console.log(this.name, "has been updated!")
    return this.save();
}

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}

productSchema.statics.fireSale = function () {
    return this.updateMany({}, { onSale: true, price: 0 });
}

const Product = mongoose.model('Product', productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Mountain Bike' });
    await foundProduct.toggleOnSale();
    await foundProduct.addCategory('mechanical');
    console.log(foundProduct);
}

Product.fireSale().then(res => console.log(res))

// findProduct();

// const bike = new Product({ name: 'Cycling Jersey', price: 89.99, categories: ['cycling', 'safety'], size: 'L' })
// bike.save()
//     .then(data => {
//         console.log("product saved successfully");
//         console.log(data);
//     })
//     .catch(err => {
//         console.error("product save failure");
//         console.log(err);
//     })

// Product.findOneAndUpdate({ name: 'Bike Helmet' }, { size: 'M' }, { new: true, runValidators: true })
//     .then(data => {
//         console.log("product saved successfully");
//         console.log(data);
//     })
//     .catch(err => {
//         console.error("product save failure");
//         console.log(err);
//     })