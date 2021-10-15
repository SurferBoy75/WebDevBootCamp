const bcrypt = require('bcrypt');

const login = async (loginAttempt, pw) => {
    // const salt = await bcrypt.genSalt(12);
    // const hash = await bcrypt.hash(pw, salt);
    //            - OR -

    const hash = await bcrypt.hash(pw, 12);

    const result = await bcrypt.compare(loginAttempt, hash);
    if (result) {
        console.log("YOU HAVE SUCCESSFULLY LOGGED IN!");
    } else {
        console.log("provided creditials were INCORRECT!  Recurssive data removal initiated!");
    }
}

const pwdToStore = 'monkey';
const password = process.argv[2];
login(password, pwdToStore);
