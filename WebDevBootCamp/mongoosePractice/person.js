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

console.log("Now logging and listening in Mongoose Practice/person... ");

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

personSchema.virtual('fullName').
    get(function () {
        return `${this.first} ${this.last}`;
    }).
    set(function (v) {
        this.first = v.substr(0, v.indexOf(' '));
        this.last = v.substr(v.indexOf(' ') + 1);
    });


personSchema.pre('save', async function () {
    console.log("about to save...")
})

personSchema.post('save', async function () {
    console.log("just saved...")
})

const Person = mongoose.model('Person', personSchema);