require('./config.js');
require('./serverclient.js');

function main()
{
	init =  function()
	{
		var WebSocketServer = require('ws').Server;
		this.wss = new WebSocketServer({port:config.port,host:config.host});
		
		console.log('server started. Waiting for clients');
		
		this.wss.on('connection', function(ws) {
			
			console.log("new client");
			var a = new ServerClient();
			
		});
	}
	
	init();
}


main();