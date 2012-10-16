require('./config.js');
require('./serverclient.js');
require('./game.js');
require('../library/Command.js');

function Main()
{
	var games = []; //available games
	var players = []; //all players
	
	this.notifyPlayers = function(data,sender)
	{
		for (var i =0,l = players.length; i < l; i++)
		{
			players[i].sendData({'command':'test',"data":data});
		}
		//loop over all players in game and send some command
		//with player.sendData(data);	
	};
	
	this.init =  function()
	{
		var WebSocketServer = require('ws').Server;
		this.wss = new WebSocketServer({port:config.port,host:config.host});
		
		console.log('server started. Waiting for clients');
		
		var game = new Game();
		var self = this;
		
		this.wss.on('connection', function(ws) {
			
			console.log("new client");
			
			var client = new ServerClient(self,ws);
			
			players.push(client);
		});
	};
}

var app = new Main();
app.init();