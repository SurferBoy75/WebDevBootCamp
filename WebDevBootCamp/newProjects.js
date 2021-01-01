const fs = require('fs');

const empty = ''
const htmlBp =
    '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Document</title> <link rel="stylesheet" href="app.css"> </head> <body> <script src="app.js"></script> </body> </html>'

//get arg from command line.. 
const projectNames = process.argv.slice(2);

//async version...
// fs.mkdir(`${name}`, {recursive: true }, (err) => {
//     if (err) throw err;
//   });

for (let name of projectNames) {
    try {
        fs.mkdirSync(name);

        fs.writeFileSync(`${name}/index.html`, htmlBp);
        fs.writeFileSync(`${name}/app.js`, empty);
        fs.writeFileSync(`${name}/app.css`, empty);
    } catch (e) {
        console.log("Whoopsie...", e)
    }

}

