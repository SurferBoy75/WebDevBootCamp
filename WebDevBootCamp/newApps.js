const fs = require('fs');

const empty = ''

//get arg from command line.. 
const projectNames = process.argv.slice(2);

//async version...
// fs.mkdir(`${name}`, {recursive: true }, (err) => {
//     if (err) throw err;
//   });

for (let name of projectNames) {
    try {
        fs.mkdirSync(name);
        fs.mkdirSync(`${name}/models`);
        fs.mkdirSync(`${name}/views`);
        fs.mkdirSync(`${name}/public`);
        fs.mkdirSync(`${name}/public/css`);
        fs.mkdirSync(`${name}/public/js`);

        let app = `app.listen(3000, () => {console.info("${name} now serving on port 3000")});`
        let htmlBp =
            `<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>${name}</title> <link rel="stylesheet" href="/css/app.css"> </head> <body> <script src="/js/app.js"></script> </body> </html>`

        fs.writeFileSync(`${name}/app.js`, app);
        fs.writeFileSync(`${name}/views/home.ejs`, htmlBp);
        fs.writeFileSync(`${name}/public/js/app.js`, empty);
        fs.writeFileSync(`${name}/public/css/app.css`, empty);
    } catch (e) {
        console.log("Whoopsie...", e)
    }

}

