require('./config.js');
require('./serverclient.js');
require('./game.js');
require('../library/Command.js');

function Main()
{
	var games = []; //available games
	var clients = []; //all clients
	
	var maze = null;
	
	this.cid = 1;
	
	this.notifyClients = function(data,sender)
	{
		for (var i =0,l = clients.length; i < l; i++)
		{
			clients[i].sendData({'command':data.command,"data":data.data});
		}
		//loop over all clients in game and send some command
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
			client.cid = self.cid;
			
			clients.push(client);
			
			self.cid++;
		});
	};
}

var app = new Main();
app.init();