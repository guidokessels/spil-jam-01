require('./mazeGenerator.js');

Game = function(serv)
{
	var server = serv;
	var maze;
	var players = [];
	var self = this;
	var markUpdateDirty = false; //when true update broadcast is executed
	
	this.start = function()
	{
		gameloop();
	}
	
	var now = new Date().getTime();
	
	var gameloop = function()
	{	
		if (new Date().getTime() - now > 40)
		{	
			now = +new Date();
			
			//send player updates
			broadcastPlayerUpdate();
		}
				
		setTimeout(function(){
			gameloop();			
		},40);
	}
	
	var broadcastPlayerUpdate = function(){
		
		if (!markUpdateDirty) return;
		
		console.log('broadcast player update');
		var packed = {};
		packed.command = "receivePlayers";
		packed.data = {'players':players,'update':true
		};
	
		server.notifyClients(packed,this);
		
		markUpdateDirty = false;
	}
	
	this.generateMaze = function()
	{
		maze = Maze.generate( 20,20 );
		console.log('maze generated')
		return maze;
	}
	
	this.getMaze = function(){
		return maze;
	}
	 
	this.addPlayer = function(c)
	{
		c.x = 10;
		c.color = "650000";
		c.y = 10;
		players.push(c);
	}
	
	this.updatePlayer = function(p)
	{
		console.log('update player ',p.cid)
		for (var i=0,len=players.length;i <len;i++)
		{
			if (players[i].cid == p.cid)
			{
				console.log('player updated',p.cid)
				markUpdateDirty = true;
				players[i] = p;
				break;
			}
		}
	}
	
	this.removePlayer = function(c)
	{
		//TODO
	}
	
	this.getPlayers = function()
	{
		return players;
	
	
	}
}