var App = require('./app');
var config = require('config-node')();

const first = require('./middlewares/test1.js');
const second = require('./middlewares/test2.js');
const third = require('./middlewares/test3.js');

let app = new App();

app.use(first);
app.use(second);
app.use(third);

// app.use((req, res)  => {
//   console.log("url", req.url); 
//   console.log("method", req.method); 
// })
// app.use((req, res) => {
//   console.log(req.headers); 
//   res.end("Hello World");
// })
app.start(config.port, config.host, () => console.log("listening on" + config.port));