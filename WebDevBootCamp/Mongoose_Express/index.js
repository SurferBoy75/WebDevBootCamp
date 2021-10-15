const express = require('express');
const app = express();
const path = require('path');
const AppError = require('./AppError');
const flash = require('connect-flash');
const morgan = require('morgan');
const session = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const Product = require('./models/product');
const Farm = require('./models/farm');

const uri = "mongodb+srv://root:groot@kantordesign.ybqhf.mongodb.net/farmStand?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongoDB connection open!");
    })
    .catch(err => {
        console.error("mongoDB connection failure:");
        console.log(err);
    })

const secret = 'thisisaterriblesecret';
const sessionOptions = {
    secret: secret,
    resave: false,
    saveUninitialized: false
};

app.use(session(sessionOptions));
app.use(morgan('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(flash());

const categories = ['fruit', 'vegetable', 'dairy', 'fuck-titties'];

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e));
    }
}

const handleValidationErr = err => {
    return new AppError(`Mongoose Validation failure: ${err.message}`, 400);
}

app.use((req, res, next) => {
    res.locals.messages = req.flash('success');
    next();
})

app.get('/', (req, res) => {
    console.log('did I make it here?')
    res.render('home');
})

//Farm Routes

app.get('/farms', wrapAsync(async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', { farms });
}))

app.get('/farms/new', (req, res) => {
    res.render('farms/new')
})

app.post('/farms', wrapAsync(async (req, res) => {
    const newFarm = new Farm(req.body);
    await newFarm.save();
    console.log(newFarm);
    req.flash('success', 'Farm created successfully!')
    res.redirect('/farms');
}))

app.get('/farms/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id).populate('products');
    if (!farm) {
        throw new AppError('Farm Not Found', 404);
    } else {
        res.render('farms/show', { farm });
    }
}))

app.get('/farms/:id/products/new', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render('products/new', { categories, farm })
}))

app.post('/farms/:id/products', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category });
    farm.products.push(product);
    product.farm = farm;
    await product.save();
    await farm.save();
    res.redirect(`/farms/${farm._id}`)
}))

app.get('/farms/:id/edit', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    if (!farm) {
        return next(new AppError('Farm Not Found', 404));
    }
    res.render('farms/edit', { farm });
}))

app.put('/farms/:id', wrapAsync(async (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    const updatedFarm = await Farm.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/farms/${updatedFarm._id}`);
}))

app.delete('/farms/:id', wrapAsync(async (req, res) => {
    const trash = await Farm.findByIdAndDelete(req.params.id);
    res.redirect('/farms');
}))


//Product Routes

app.get('/products', wrapAsync(async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render('products/index', { products, category });
    } else {
        const products = await Product.find({});
        res.render('products/index', { products, category: 'All' });
    }
}))

// app.get('/products/new', (req, res) => {
//     res.render('products/new', { categories });
// })

// app.post('/products', wrapAsync(async (req, res, next) => {
//     const newProduct = new Product(req.body);
//     await newProduct.save();
//     console.log(newProduct);
//     res.redirect(`/products/${newProduct._id}`);
// }))

app.get('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('farm', 'name');
    console.log(product);
    if (!product) {
        throw new AppError('Product Not Found', 404);
    } else {
        res.render('products/show', { product });
    }
}))

app.get('/products/:id/edit', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return next(new AppError('Product Not Found', 404));
    }
    res.render('products/edit', { product, categories });
}))

app.put('/products/:id', wrapAsync(async (req, res, next) => {
    console.log(req.body);
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${updatedProduct._id}`);
}))

app.delete('/products/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const trash = await Product.findByIdAndDelete(id);
    res.redirect('/products');
}))

app.use((err, req, res, next) => {
    console.log(err.name);
    if (err.name === 'ValidationError') err = handleValidationErr(err);
    next(err);
})

app.use((err, req, res, next) => {
    const { status = 500, message = 'YOU FUCKED UP!' } = err;
    res.status(status).send(message);
})

app.listen(3000, () => {
    console.info('index.js is now serving farmStand on port 3000');
})
