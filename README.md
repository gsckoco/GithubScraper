# GithubScraper
Github scraper recursively grabs every file in a Github repository and returns it as a JSON object with sources. 

## Usage
```js
getContents(sUser, sRepo, sPath, oDump, sAuth) => Array
```
`getContents` is a recursive function, meaning that it will go through every directory and grab the source.
`sUser` is the owner of the repository e.g. `gsckoco`
`sRepo` is the repository name e.g. `GithubScraper`
`sPath` is the current path to look though, leave this blank if you want to get the source for every file from root downwards.
`sAuth` is the authentication header you will send to Github. Without this you will be rate limited see [this](https://developer.github.com/v3/#rate-limiting). It is recommended that you use an OAuth token authentication over basic authentication as Github plan on removing Basic authentication soon.

## Example
```js
getContents('gsckoco', 'GithubScraper', '/', [], 'token OAUTH-TOKEN').then(dump  => {
	console.log(dump);
})
```