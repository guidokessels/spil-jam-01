require('../maze-growing-tree.js');

Game = function()
{
	var maze;
	var players = [];
	
	
	function init(){
		generateMaze();
	}
	
	function generateMaze()
	{
		maze = Maze.generateMaze(30,30);
	}
	
	this.addPlayer = function(c)
	{
		c.x = 100;
		c.color = "650000";
		c.y = 100;
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

	init();
}