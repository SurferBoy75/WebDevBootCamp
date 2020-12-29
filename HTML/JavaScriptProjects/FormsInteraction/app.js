const tweetForm = document.querySelector('#tweetForm');
const tweetBox = document.querySelector('#tweets');

const lis = document.querySelectorAll('li');
for (let li of lis) {
    li.addEventListener('click', function () {
        li.remove();
    })
}


tweetForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // const userNameInput = document.querySelectorAll('input')[0];
    const userNameInput = tweetForm.elements.username;
    // const tweetInput = document.querySelectorAll('input')[1];
    const tweetInput = tweetForm.elements.tweet;

    addTweet(userNameInput.value, tweetInput.value);

    userNameInput.value = '';
    tweetInput.value = '';
})

const addTweet = (userName, tweet) => {
    const newTweet = document.createElement('li');
    const bTag = document.createElement('b');

    bTag.append(userName);
    newTweet.append(bTag);
    newTweet.append(` - ${tweet}`);
    tweetBox.append(newTweet);
}

tweetBox.addEventListener('click', function (e) {
    //short hand for if (left side is true, than do right side -- of the &&)
    e.target.nodeName === 'LI' && e.target.remove();
})