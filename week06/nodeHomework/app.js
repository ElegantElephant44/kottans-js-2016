var http = require('http');

module.exports = class App
{	
	constructor()
	{
		this.middlewares = [];
		this.server = new http.createServer((req,res)=> {
			this.middlewares.forEach(middleware => middleware(req, res));			
		});
		
	}
	use(method){
		this.middlewares.push(method);
	}
	start(port, host, backlog){
		this.server.listen(port,host,backlog);
	}
}