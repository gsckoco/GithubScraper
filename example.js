let getContents = require('./scraper.js');

getContents('gsckoco', 'GithubScraper', '/', [], 'token OAUTH-TOKEN').then(dump => {
	console.log(dump);
})