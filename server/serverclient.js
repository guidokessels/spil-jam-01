ServerClient = function(socket)
{
	var socket = socket;
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
			 this.processMessage(message);
	   	 });
		 
		 socket.on('close', function(message) {
			 playout.removeChannelListener(this);
	   	 });
	},
	
	processMessage = function(json)
	{
		log('process message',message);
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
		
		if (!method)
		{
			return console.log("no command and or data given");
		}
		
		switch (method)
		{
			case "getGames":
				log('get games');
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
		
		log = function(m)
		{
			console.log(m, name)	
		}
	}
	
	registerEvents();

}