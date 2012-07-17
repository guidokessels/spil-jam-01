require('../maze-growing-tree.js');

Game = function()
{
	var maze;
	
	function init(){
		generateMaze();
	}
	
	function generateMaze()
	{
		maze = Maze.generateMaze(30,30);
	}

	init();
}