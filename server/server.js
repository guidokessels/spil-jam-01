require('./config.js');
require('./serverclient.js');
require('./game.js');
require('../library/Command.js'); 

function Main()
{
	var clients = []; //all clients
	this.cid = 1;
	
	this.notifyClients = function(data,sender,ignoreList)
	{
		for (var i =0,l = clients.length; i < l; i++){
			
			if (ignoreList){
				var ignore = false;
				
				for (var j=0,jlen=ignoreList.length;j<jlen;j++){
					if (clients.indexOf(ignoreList[j])){
						ignore = true;
					}
				}
				
			}
			
			if (ignore){
				continue;
			}
			
			clients[i].sendData({'command':data.command,"data":data.data});
		}
	};
	
	this.removeClient = function(client)
	{
		ci = clients.indexOf(ci);
		if (ci != -1)
		{
			clients.splice(ci,1);
		}
	}
		
	this.init =  function()
	{
		console.log('server starting..')
		
		var WebSocketServer = require('ws').Server;
		this.wss = new WebSocketServer({port:config.port,host:config.host});
	
		console.log('starting game');
		var game = new Game(this);
		game.generateMaze();
		game.start();
		console.log('game started');
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