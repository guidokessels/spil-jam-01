require('./mazeGenerator.js');

Game = function()
{
	var maze;
	var players = [];

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