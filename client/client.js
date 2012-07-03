WEB_SOCKET_SWF_LOCATION = "websocket/WebSocketMain.swf";
WEB_SOCKET_DEBUG = true;

config = {'host':"ws://barmania.mine.nu",
	 	  'port':8081
		 }

client = function()
{	
	var socket = null;
	var callbackcue = [];
	var url = config.host+":"+config.port;
	var messageId = 1; ///every message send to server is attached to an id to identify the belonging callback. 
						///sending messages to the server is not parallelerized and thus we need an identification
	
	init = function()
	{
		messageId = 1;
	}
	
	/**
	 * sends a command to the websocket server
	 * the callback
	 */
	send =  function(command, params)
	{
		socket.send(JSON.stringify({'callbackid':messageId,'command':command,'data':params}));
		messageId++;
	}
	
	open = function()
	{
		 socket = new WebSocket(this.url);
	    
		 socket.onmessage = this.getProxy(function(e) {
				 
			 try{
				 var json = JSON.parse(e.data);
			 }
			 catch(e)
			 {
				return console.log('invalid data received ',e);
			 }
			 
			 //look for callback in cue
			 if (json.callbackid && callbackcue['|'+json.callbackid])
			 {
				var cb = callbackcue['|'+json.callbackid];
				delete callbackcue['|'+json.callbackid];
				cb();
			 }
			 
			 
			 if (json.command)
			 {
				switch (json.command)
				{
					case  'bladiebla':
						//do something
					break;
				}
			 } 
			 
	     });
	},
	
	close = function()
	{
		//TODO
	}
}