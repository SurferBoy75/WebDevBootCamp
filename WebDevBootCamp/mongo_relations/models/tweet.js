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

const userSchema = new Schema({
    userName: String,
    age: Number
});

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

const makeTweets = async () => {
    // const user = new User({ userName: '3rdjoker', age: 46 });
    const user = await User.findOne({ userName: '3rdjoker' });
    const tweet1 = new Tweet({ text: 'This is getting out of hand!', likes: 1231 });
    tweet1.user = user;
    user.save();
    tweet1.save();
}

const findTweet = async () => {
    const t = await Tweet.findOne({})
        .populate('user', 'userName')
    console.log(t);
}

findTweet();