WEB_SOCKET_SWF_LOCATION = "websocket/WebSocketMain.swf";
WEB_SOCKET_DEBUG = true;


//Simple wrapper for websocket behaviour
// use open() to start a connection
// 
//
function Client(host, port)
{	
	var socket = null;
        
	var callbackcue = [];
        
	var url = host+":" + port;
	var messageId = 1;
		
	this.send =  function(command, params)
	{
		var packed = JSON.stringify({'callbackid':messageId,'command':command,'data':params});
		console.log('send ',packed);
		socket.send(packed);
		messageId++;
	}
	
	this.getSocket = function()
	{
		return socket;
	}
	
	this.openSocket = function()
	{
		 socket = new WebSocket(url);
	    
		 socket.onmessage = function(e){
				 
			 try
			 {
				 var json = JSON.parse(e.data);
			 }
			 catch(e)
			 {
				return console.log('invalid data received ',e);
			 }

			 if (json.command)
			 {
				switch (json.command)
				{
					case  'pong':
						ev.pub('socket.pong',json.data);
					break;
					case 'mazeCreated':
				    MazeGenerator.maze = json.data.maze;
				    MazeGenerator.render('#container');
				    break;
					case  'receiveGames':
						console.log('games received ',json);
					break;
					case 'receivePlayers':
						ev.pub('socket.onReceivePlayers',json.data);
					break;
					case 'selfJoined':
						ev.pub('socket.onSelfJoined',json.data);
					break;
					case  'playerUpdates':
						  ///all player movement updates here
					break;
					case  'gameEnds':
						  ///when game ends
					break;
					case 'test':
						document.getElementById('output').innerHTML = e.data;
						console.log('yessssss we have something');
					break;
				}
			 } 
	     };
	},
	
	this.close = function()
	{
		//TODO
	}
}