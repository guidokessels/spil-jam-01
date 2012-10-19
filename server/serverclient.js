ServerClient = function(server,socket)
{
	var socket = socket;
	var server = server;
	var game = null;
	var name = null;
	var id = null;
	var positionSequence = 0;
	
	var init = function()
	{
		registerEvents();
		
		//TODO create timeout loop to detect broken connections
		//if client doesnt reply on interval ping, server should remove client and notify other clients 
	}
	
	var self = this;
	
	var registerEvents = function()
	{
		 socket.on('ping', function(message) {
			 log('ping');
		 });
		 
		 socket.on('pong', function(message) {
			 log('pong');
		 });
	
		 socket.on('message', function(message) {
			 console.log(self.cid,'processing incoming message',message);
			 processMessage(message);
	   	 });
		 
		 socket.on('close', function(message) {
			//remove from server
	   	 });
	};
	
	var processMessage = function(message)
	{
		//console.log('process message',message);
		try
		{
			var json = JSON.parse(message);
		}
		catch(e)
		{
			return console.log("error parsing message. invalid json");
		}
		
		var command = json.command;
		var data = json.data
		
		if (!command)
		{
			return console.log("no command and or data given");
		}
		
		switch (command)
		{
			case "ping":
				var packed = {};
				packed.command = "pong";
				packed.data = {'date':data.d};
				
				self.sendData(packed);			
			break;
			case "join":
				
				var player = {};
				player.cid = self.cid;
				player.name = "test2";
							
				self.game.addPlayer(player);
				
				//send data to yourself
				var packed = {};
				packed.command = "selfJoined";
				packed.data = {'player':player,"maze":self.game.getMaze()};
				
				self.sendData(packed);
				
				var packed = {};
				packed.command = "receivePlayers";
				packed.data = {'players':self.game.getPlayers(),'update':true
				};
				
				server.notifyClients(packed,this);
				
				
				break;
			case "playerPositionUpdate":
				
				self.game.updatePlayer(data.player);
				break;
			case "test":
				var packed = {};
				packed.command = "test";
				packed.data = data;
				server.notifyClients(packed,this);
				
			break;
			case "mazeCreated":
				
				var packed = {};
				packed.command = "mazeCreated";
				packed.data = data;
				server.notifyClients(packed,this);
				
			break;
			case "getGames":
				
				//this.sendData({'command':'receiveGames',"data":{'games':['a game','another game']}});
				
			break;
		
			case "createGame":		
			
			break;
			
			case "joinGame":
			
			break;
			
			case "gameEnds":
			
			break;
			
			case "quitGame":
			
			break;
			
			case "move":
				
			break;
			
			case "winGame":
			
			break;
			
		}
	};
	
	var log = function(m)
	{
		console.log(m, name)	
	};
	
	this.sendData = function(data)
	{
		try
		{
			console.log('send data ',data);
			socket.send(JSON.stringify(data));
		}
		catch(e)
		{
			server.removeClient
		}
	};
	
	registerEvents();

}