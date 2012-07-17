require('./config.js');
require('./serverclient.js');

function main()
{
	var games = []; //available games
	var players = []; //all players
	
	init =  function()
	{
		var WebSocketServer = require('ws').Server;
		this.wss = new WebSocketServer({port:config.port,host:config.host});
		
		console.log('server started. Waiting for clients');
		
		this.wss.on('connection', function(ws) {
			
			console.log("new client");
			
			var client = new ServerClient(this,ws);
			
			players.push(client);
		});
	},
	
	notifyGamePlayers = function()
	{
		//loop over all players in game and send some command
		//with player.sendData(data);	
	}
	
	init();
}

main();