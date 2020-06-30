/*
 * Github Scraper
 * Ben Johnston (gsck)
 */


const fetch = require('node-fetch');
const { base64encode } = require('nodejs-base64');

async function getContents(sUser, sRepo, sPath, oDump, sAuth) {
    //'Basic ' + base64encode(config.username + ':' + config.password)
    let json = await fetch('https://api.github.com/repos/' + sUser + '/' + sRepo + '/contents/' + sPath, {
        method: 'GET', headers: { Authorization: sAuth }
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
                input.type = "submodule"
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
module.exports = getContents;