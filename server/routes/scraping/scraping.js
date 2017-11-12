let unfurl = require("unfurl.js");

module.exports=(request,response) =>{
	(async function () {
		let result = await unfurl(request.body.url)
		response.json(result);
		
	})().catch(console.error)

}