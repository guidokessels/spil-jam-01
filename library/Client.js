/**
 * Frontend Client class does the communication with the backend.
 */
function Client(host, port)
{	
	var socket = null;
        
	var url = host+":" + port;
        
        var executeCommand = function(command, data) {
            
            switch (command)
            {
                case  COMMAND.SERVER.LOBBY.LIST_TO_CLIENT:
                    console.log('games received ', json);
                break;
                case  COMMAND.SERVER.GAME.JOIN_CLIENT:
                    //when succesfully joined game 
                break;
                case  COMMAND.SERVER.GAME.SEND.STATUS:
                    //all player movement updates here
                break;
                case  COMMAND.SERVER.GAME.END:
                    //when game ends
                break;
            }
        }
        
        var messageHandler = function(e) {
				 
            try
            {
                var json = JSON.parse(e.data);
            }
            catch(e)
            {
                console.log('invalid data received ',e);
                
                return;
            }

            if (json.command)
            {
                executeCommand(json.command, json.data);
            } 
        };
		
	this.send =  function(command, params)
	{
            var packed = JSON.stringify({
                "command" : command,
                "data"    : params
            });

            console.log('send ',packed);
            socket.send(packed);
            
            return this;
	}
	
	this.getSocket = function()
	{
            return socket;
	}
	
	this.openSocket = function()
	{
            socket = new WebSocket(url);
	    socket.onmessage = messageHandler;
            
            return this;
	},
	
	this.close = function()
	{
		//TODO
	}
}