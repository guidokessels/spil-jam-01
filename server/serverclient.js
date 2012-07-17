ServerClient = function(server,socket)
{
	var socket = socket;
	var server = server;
	var activeGame = null;
	var name = null;
	
	init = function()
	{
		registerEvents();
	}
	
	registerEvents = function()
	{
		 socket.on('ping', function(message) {
			 log('ping');
		 });
		 
		 socket.on('pong', function(message) {
			 log('pong');
		 });
	
		 socket.on('message', function(message) {
			 processMessage(message);
	   	 });
		 
		 socket.on('close', function(message) {
			//remove from server
	   	 });
	},
	
	processMessage = function(message)
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
			case "getGames":
				log('get games');
				
				this.sendData({'command':'receiveGames',"data":{'games':['a game','another game']}});
				
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
	}
	
	log = function(m)
	{
		console.log(m, name)	
	}
	
	sendData = function(data)
	{
		console.log('send data ',data);
		socket.send(JSON.stringify(data));
	}
	
	registerEvents();

}