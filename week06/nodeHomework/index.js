
var config = require('config-node')();
var http = require('http');
class App
{
	
	constructor()
	{
		this.server = new http.createServer((req,res)=> {
			for (let i=0; i<this.midleware.length; i++)
			{
				this.midleware[i](req,res);
			}
		});
		this.midleware = [];
	}

	use(method){
		this.midleware.push(method);
	}

	start(port, host, backlog){
		this.server.listen(port,host,backlog);

	}

}

let app = new App();
app.use((req, res)  => {
  console.log("url", req.url); 
  console.log("method", req.method); 
})
app.use((req, res) => {
  console.log(req.headers); 
  res.end("Hello World");
})
app.start(config.port, config.host, () => console.log("listening on" + config.port));