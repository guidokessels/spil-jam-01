ServerClient = function(server,socket)
{
	var socket = socket;
	var server = server;
	var activeGame = null;
	var name = null;
	var positionSequence = 0;
	
	var init = function()
	{
		registerEvents();
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
			 console.log('process message',message);
			 processMessage(message);
	   	 });
		 
		 socket.on('close', function(message) {
			//remove from server
	   	 });
	};
	
	var processMessage = function(message)
	{
		console.log('process message',message);
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
			case "join":
				var packed = {};
				packed.command = "clientJoined";
				packed.data = {'clientId':self.cid+""};
				console.log('id',self.cid)
				server.notifyClients(packed,this);				
				break;
			case "positionUpdated":
				
				if(data.positionSequence < self.positionSequence)
				{
					return;
				}
				
				var packed = {};
				packed.command = "PositionUpdated";
				packed.data = {
								'clientId':self.cid+"",
								"position":{x:data.x,y:data.y}
							  };
				server.notifyClients(packed,this);				
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
			//TODO
			console.log('ik ben weg',e);
		}
	};
	
	registerEvents();

}