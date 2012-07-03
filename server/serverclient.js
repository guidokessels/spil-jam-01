ServerClient = function(socket)
{
	var socket = socket;
	
	init = function()
	{
		registerEvents();
	}
	
	registerEvents = function()
	{
		 socket.on('ping', function(message) {
			 console.log('ping');
		 });
		 
		 socket.on('pong', function(message) {
			 console.log('pong');
		 });
	
		 socket.on('message', function(message) {
			 this.processMessage(message);
	   	 });
		 
		 socket.on('close', function(message) {
			 playout.removeChannelListener(this);
	   	 });
	},
	
	processCommand = function(json)
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
		
		if (!method)
		{
			return console.log("no command and or data given");
		}
		
		switch (method)
		{
			case "getGames":
				
			break;
		
			case "createGame":		
				//this.sendData(//some ok message);		
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
	
	registerEvents();

}