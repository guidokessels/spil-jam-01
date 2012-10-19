require('./config.js');
require('./serverclient.js');
require('./game.js');
require('../library/Command.js'); 

function Main()
{
	var clients = []; //all clients
	this.cid = 1;
	
	this.notifyClients = function(data,sender)
	{
		for (var i =0,l = clients.length; i < l; i++)
		{
			clients[i].sendData({'command':data.command,"data":data.data});
		}
	};
		
	this.init =  function()
	{
		console.log('server starting..')
		
		var WebSocketServer = require('ws').Server;
		this.wss = new WebSocketServer({port:config.port,host:config.host});
	
		//create game
		var game = new Game();
		game.generateMaze();
		var self = this;
		
		this.wss.on('connection', function(ws) {
			
			console.log("client connected");
			
			var client = new ServerClient(self,ws);
			client.game = game;
			client.cid = self.cid;
			
			clients.push(client);
			
			self.cid++;
		});
		
		console.log('server started. Waiting for clients..');
	};
}

var app = new Main();
app.init();