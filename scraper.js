/*
 * Github Scraper
 * Ben Johnston (gsck)
 */
/*
async function getContents(sUser, sRepo, sPath, oDump) {
    //const { statusCode, data, headers } = await curly.get('https://api.github.com/repos/' + sUser + '/' + sRepo + '/contents/' + sPath)
    console.log('https://api.github.com/repos/' + sUser + '/' + sRepo + '/contents/' + sPath)
    curly.get('https://api.github.com/repos/' + sUser + '/' + sRepo + '/contents/' + sPath).then((statusCode, data, headers) => {
        console.log(statusCode);
        console.log(data);
        console.log(headers);
    }).catch((err) => {
        console.log(err);
    })
}

getContents("gsckoco", "Daemon", "", {});

.then(json => {
            for (const property in json) {
                let input = {}
                let content = json[property]
                input.type = content.type
                input.name = content.name
                oDump.push(input);
            }
        }).catch(err => console.error(err));



*/

const fetch = require('node-fetch');
const { base64encode } = require('nodejs-base64');

const config = require('./config.json');

async function getContents(sUser, sRepo, sPath, oDump) {

    let json = await fetch('https://api.github.com/repos/' + sUser + '/' + sRepo + '/contents/' + sPath, {
        method: 'GET', headers: { Authorization: 'Basic ' + base64encode(config.username + ':' + config.password) }
    }).then(res => res.json());
    for (const property in json) {
        let input = {};
        let content = json[property];
        input.type = content.type;
        input.name = content.name;
        input.path = content.path;
        input.download = content.download_url
        
        if (input.type == "file" ) {
            if (input.download == null) {
                /*
                 * Submodules show up as files for whatever reason. Kind of stupid.
                 * //TODO Add support for submodules. 
                 */
            } else {
                let src = await fetch(input.download).then(res => res.text());
                input.src = src
            }
        } else if (input.type == "dir") {
            getContents(sUser, sRepo, input.path, oDump);
        }

        oDump.push(input);
    }
    return oDump
}
let files = []
getContents("githubtraining", "example-dependency", "", files).then(res => {
    console.log(res);
})