const franc = require('franc');
const langs = require('langs');
const colors = require('colors');

const inputText = process.argv[2] || 'WHAT THE FUCK... YOU DID NOT ENTER ANYTHING!';

try {
    const langCode = franc(inputText);
    console.log(inputText);
    const language = langs.where("3", langCode);
    if (!language) {
        console.log("could not interpret language code".yellow.underline);
    } else console.log(`Our best guess is... ${language.name}`);
} catch (err) {
    console.log("Well shit... I bet you didn't give a big enough sample:".red.underline);
    console.log(err);
}